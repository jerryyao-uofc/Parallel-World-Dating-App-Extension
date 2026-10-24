import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Conversation, ProtocolEvent, SessionBootstrap, Turn } from '../shared/domain';
import { EMBER_DATE, scenarioFromPartner, type PartnerBrief } from '../shared/partner';
import { emptyConversation, orderedTurns, reduceTranscript } from '../shared/transcript';
import { HiggsClient, type Activity, type ConnectionState } from './realtime/HiggsClient';
import { api, SessionRecorder } from './recording';

const EMBER_HOME = '/';
const MILESTONES = 4;
const MILESTONE_AT = [0.1, 0.367, 0.633, 0.9];

interface Exchange {
  id: string;
  user: string;
  ai: string;
}

function safePhoto(url?: string) {
  if (!url) return '';
  try {
    const parsed = new URL(url, window.location.origin);
    if (!parsed.pathname.startsWith('/photos/')) return '';
    const local = parsed.hostname === '127.0.0.1' || parsed.hostname === 'localhost';
    if (parsed.origin !== window.location.origin && !local) return '';
    return parsed.origin === window.location.origin ? parsed.pathname : parsed.href;
  } catch {
    return '';
  }
}

function exchanges(turns: Turn[]): Exchange[] {
  const rows: Exchange[] = [];
  let user = '';
  let userId = '';
  for (const turn of turns) {
    const text = (turn.text || '').trim();
    if (turn.role === 'user') {
      if (user) rows.push({ id: userId, user, ai: '' });
      user = text || '…';
      userId = turn.itemId;
    } else {
      rows.push({ id: turn.itemId, user: user || '…', ai: text });
      user = '';
      userId = '';
    }
  }
  if (user) rows.push({ id: userId, user, ai: '' });
  return rows;
}

function IconMic() {
  return (
    <svg className="glass-icon glass-icon-lg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

export function PhoneDate({ brief }: { brief: PartnerBrief }) {
  const scenario = scenarioFromPartner(brief);
  const photo = safePhoto(brief.photo);
  const [connection, setConnection] = useState<ConnectionState>('idle');
  const [activity, setActivity] = useState<Activity>('idle');
  const [mic, setMic] = useState(false);
  const [level, setLevel] = useState(0);
  const [micBusy, setMicBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [conversation, setConversation] = useState(emptyConversation);
  const [focus, setFocus] = useState<number | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [evaluate, setEvaluate] = useState(false);
  const [milestone, setMilestone] = useState(MILESTONES - 1);
  const client = useRef<HiggsClient | null>(null);
  const armMic = useRef(false);
  const state = useRef<Conversation>(emptyConversation());
  const recorder = useRef<SessionRecorder | null>(null);
  const recorders = useRef<SessionRecorder[]>([]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    const previous = meta?.getAttribute('content');
    meta?.setAttribute('content', '#0c1016');
    return () => { if (previous) meta?.setAttribute('content', previous); };
  }, []);

  useEffect(() => {
    let mounted = true;
    void api<{ credentialsConfigured: boolean }>('/api/health')
      .then((health) => { if (mounted) setConfigured(health.credentialsConfigured); })
      .catch(() => { if (mounted) setError('The date lab is not running. Start Parallel Worlds, then jump again.'); });
    const c = new HiggsClient({
      bootstrap: (signal) => api<SessionBootstrap>('/api/sessions', {
        method: 'POST',
        signal,
        body: JSON.stringify({ scenarioId: EMBER_DATE, partner: brief }),
      }),
      onBootstrap: (data) => {
        state.current = emptyConversation();
        setConversation(state.current);
        setFocus(null);
        const next = new SessionRecorder(data.session.id, () => {});
        recorder.current = next;
        recorders.current.push(next);
      },
      onState: (next) => {
        if (!mounted) return;
        setConnection(next);
        if (next === 'closed' || next === 'closing') { armMic.current = false; setMicBusy(false); }
        if (next === 'ready' && armMic.current) {
          armMic.current = false;
          setMicBusy(true);
          void client.current?.toggleMic().finally(() => { if (mounted) setMicBusy(false); });
        }
      },
      onActivity: (next) => { if (mounted) setActivity(next); },
      onError: (message) => { if (mounted) { armMic.current = false; setError(message); } },
      onMic: (active) => { if (mounted) setMic(active); },
      onLevel: (value) => { if (mounted) setLevel(value); },
      onEvent: (event: ProtocolEvent) => {
        if (event.type === 'session.created' || event.type === 'session.updated') {
          const created = event.session as { id?: string } | undefined;
          recorder.current?.status('active', created?.id);
        }
        if (event.type === 'client.session_end' && mounted) setError(String(event.message));
        state.current = reduceTranscript(state.current, event, Date.now());
        if (mounted) setConversation(state.current);
        if (event.type.endsWith('.completed') || event.type.endsWith('.failed') || event.type.endsWith('.done') ||
          ['client.interrupted', 'client.closed', 'input_audio_buffer.committed'].includes(event.type))
          recorder.current?.snapshot(orderedTurns(state.current));
        if (event.type === 'client.closed') recorder.current?.status('closed');
      },
    });
    client.current = c;
    armMic.current = true;
    void c.connect();
    return () => {
      mounted = false;
      void c.disconnect();
      recorders.current.forEach((item) => item.dispose());
    };
  }, [brief]);

  const name = scenario?.character.name ?? 'your date';
  const rows = exchanges(orderedTurns(conversation));
  const focusIndex = focus != null && focus >= 0 && focus < rows.length ? focus : null;
  const liveRow = [...rows].reverse().find((row) => row.ai) ?? rows[rows.length - 1];
  const shownIndex = focusIndex ?? (liveRow ? rows.indexOf(liveRow) : -1);
  const shown = shownIndex >= 0 ? rows[shownIndex] : undefined;
  const idleCopy = connection === 'ready'
    ? (mic ? `${name} can hear you. Say hello.` : 'The microphone is off. Tap it to turn it back on.')
    : connection === 'connecting'
      ? `Joining the live date with ${name}.`
      : `A first date with ${name}.`;
  const spoken = (text?: string) => {
    const value = (text || '').replace(/\s+/g, ' ').trim();
    return value && value !== '…' ? value : '';
  };
  const theirLine = spoken(shown?.ai);
  const yourLine = spoken(shown?.user);
  const caption = theirLine || yourLine || idleCopy;
  const words = caption.split(' ').filter(Boolean);
  const karaoke = activity === 'speaking' && focusIndex === null && Boolean(shown?.ai);
  const speaking = activity === 'speaking' || (mic && level > 0.05);

  useEffect(() => { setWordIndex(0); }, [caption]);

  useEffect(() => {
    if (!karaoke || words.length < 2) return;
    const timer = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1 >= words.length ? words.length - 1 : prev + 1));
    }, 420);
    return () => window.clearInterval(timer);
  }, [karaoke, words.length, caption]);

  useEffect(() => {
    if (activity === 'speaking') {
      setFocus(null);
      setMilestone(MILESTONES - 1);
    }
  }, [activity]);

  if (!scenario) return null;

  async function onMic() {
    setFocus(null);
    if (connection === 'closing') return;
    if (connection === 'connecting') {
      armMic.current = false;
      await client.current?.disconnect();
      return;
    }
    if (connection !== 'ready') {
      setError(null);
      armMic.current = true;
      await client.current?.connect();
      return;
    }
    setMicBusy(true);
    await client.current?.toggleMic();
    setMicBusy(false);
  }

  async function leave() {
    armMic.current = false;
    await client.current?.disconnect();
    window.location.assign(EMBER_HOME);
  }

  function goToMilestone(index: number) {
    const next = Math.min(MILESTONES - 1, Math.max(0, Math.round(index)));
    setMilestone(next);
    if (rows.length < 2) return;
    const row = Math.round((next / (MILESTONES - 1)) * (rows.length - 1));
    setFocus(row >= rows.length - 1 ? null : row);
  }

  function rewindOne() {
    if (milestone <= 0) return;
    goToMilestone(milestone - 1);
  }

  const liveNow = connection === 'ready' && mic;
  const micLabel = connection === 'connecting' || connection === 'closing'
    ? 'Joining the live date'
    : connection === 'ready'
      ? (mic ? 'Live conversation, microphone on' : 'Live conversation, microphone off')
      : `Talk with ${name}`;
  const atLive = focusIndex === null;
  const scrubIndex = shownIndex >= 0 ? shownIndex : Math.max(rows.length - 1, 0);
  const scrubMax = Math.max(rows.length - 1, 0);
  const liveSlice = atLive
    ? (words.length > 1 ? wordIndex / (words.length - 1) : (speaking ? 0.65 : 0.22))
    : 0;
  const head = rows.length === 0
    ? 0.06
    : atLive
      ? (Math.max(rows.length - 1, 0) + liveSlice) / rows.length
      : (scrubIndex + 1) / rows.length;

  function scrubFromPointer(current: HTMLDivElement, clientX: number) {
    const rect = current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    goToMilestone(ratio * (MILESTONES - 1));
  }

  return (
    <div className="ember-stage">
      <div className="ember-phone">
        <span className="ember-btn ember-silent" aria-hidden="true" />
        <span className="ember-btn ember-vol" aria-hidden="true" />
        <span className="ember-btn ember-power" aria-hidden="true" />
        <div className="ember-screen glass-screen">
          <div className="ember-status" aria-hidden="true">
            <span>9:41</span>
            <span className="ember-status-icons">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="0.6"/><rect x="4.5" y="5" width="3" height="7" rx="0.6"/><rect x="9" y="2.5" width="3" height="9.5" rx="0.6"/><rect x="13.5" y="0" width="3" height="12" rx="0.6"/></svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M1.5 4.2C3.8 2 6.6 1 8 1s4.2 1 6.5 3.2"/><path d="M3.6 6.4C5 5.1 6.6 4.4 8 4.4s3 .7 4.4 2"/></svg>
              <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.6" y="0.6" width="21" height="10.8" rx="2.4" stroke="currentColor" fill="none" strokeWidth="1.2"/><rect x="2" y="2" width="16" height="8" rx="1.2" fill="currentColor"/></svg>
            </span>
          </div>
          <div className="ember-island" aria-hidden="true" />
          <div className={`glass-app pw-call ${evaluate ? 'is-eval' : ''}`} style={{ '--voice': String(Math.min(1, level * 3)), '--head': String(head) } as CSSProperties}>
            {!evaluate && <div className="pw-photo" style={photo ? { backgroundImage: `url("${photo}")` } : undefined} />}
            {!evaluate && <div className="pw-veil" />}
            <header className="pw-call-top">
              <button type="button" className="pw-icon" aria-label={evaluate ? 'Back to the live date' : 'Leave date'} onClick={() => { if (evaluate) setEvaluate(false); else void leave(); }}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5L8 12l7 7" /></svg>
              </button>
              <div className="pw-call-brand">
                <img src="/brand/parallel-worlds.png?v=neon" alt="" />
                <span>Parallel Worlds</span>
              </div>
              <button type="button" className="pw-icon" aria-label="More" aria-expanded={menu} onClick={() => setMenu((open) => !open)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="1.3" /><circle cx="12" cy="12" r="1.3" /><circle cx="18" cy="12" r="1.3" /></svg>
              </button>
              {menu && <button type="button" className="pw-leave" onClick={() => { void leave(); }}>Leave date</button>}
            </header>
            <div className="pw-pill">
              {photo ? <img src={photo} alt="" /> : <span>{name[0]}</span>}
              <strong>{name}</strong>
              <i className={connection === 'ready' ? 'on' : ''} />
            </div>

            {evaluate ? (
              <section className="pw-eval">
                <h1>One decision. Two trajectories.</h1>
                <div className="pw-fork" aria-hidden="true">
                  <svg viewBox="0 0 340 200">
                    <text x="4" y="78" className="fork-muted">Shared past</text>
                    <line x1="8" y1="96" x2="108" y2="96" />
                    <circle className="fork-node" cx="118" cy="96" r="13" />
                    <text x="92" y="132" className="fork-muted">Rewind</text>
                    <path className="fork-original" d="M118 90 C 148 72, 168 50, 182 40" />
                    <circle className="fork-original-dot" cx="188" cy="38" r="7" />
                    <text x="108" y="26" className="fork-original-label">Original</text>
                    <path className="fork-alt" d="M118 102 C 148 118, 168 142, 184 156" />
                    <circle className="fork-alt-dot" cx="190" cy="158" r="7" />
                    <text x="96" y="146" className="fork-alt-label">Alternative</text>
                  </svg>
                  <div className="pw-score original"><b>78</b><span>Overall<br />communication</span></div>
                  <div className="pw-score alt"><b>92</b><span>Overall<br />communication</span></div>
                </div>
                <article className="pw-insight">
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3 11c.4.4.7.9.8 1.4h4.4c.1-.5.4-1 .8-1.4A6 6 0 0 0 12 3z" /></svg>
                  </span>
                  <p>In the alternative, you asked a follow-up question, which led to a more open and engaging conversation.</p>
                </article>
              </section>
            ) : (
              <>
                <div className="pw-call-stage">
                  <div
                    className={`pw-track ${atLive ? 'is-live' : ''}`}
                    onPointerDown={(event) => {
                      if ((event.target as HTMLElement).closest('button')) return;
                      scrubFromPointer(event.currentTarget, event.clientX);
                      try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* the drag still tracks the pointer */ }
                    }}
                    onPointerMove={(event) => {
                      if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
                      scrubFromPointer(event.currentTarget, event.clientX);
                    }}
                  >
                    <span className="pw-track-line" />
                    {MILESTONE_AT.map((at, index) => {
                      if (index === milestone || index === milestone - 1) return null;
                      const passed = index < milestone;
                      return (
                        <button
                          key={index}
                          type="button"
                          className={`pw-checkpoint ${passed ? 'passed' : 'ahead'}`}
                          style={{ left: `${at * 100}%` }}
                          aria-label={passed ? `Checkpoint ${index + 1}, already passed` : `Checkpoint ${index + 1}`}
                          onPointerDown={(event) => event.stopPropagation()}
                          onClick={(event) => { event.stopPropagation(); goToMilestone(index); }}
                        />
                      );
                    })}
                    {milestone > 0 && (
                      <button type="button" className="pw-rewind" style={{ left: `${MILESTONE_AT[milestone - 1] * 100}%` }} aria-label={`Rewind to checkpoint ${milestone}`} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); rewindOne(); }}>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 7L6 12l5 5" /><path d="M17 7l-5 5 5 5" /></svg>
                      </button>
                    )}
                    <span className="pw-live-thumb" style={{ left: `${MILESTONE_AT[milestone] * 100}%` }} />
                    <input
                      type="range"
                      min={0}
                      max={MILESTONES - 1}
                      value={milestone}
                      aria-label="Move between checkpoints"
                      onChange={(event) => goToMilestone(Number(event.target.value))}
                    />
                  </div>
                  <p className="sr-only">{caption}</p>
                </div>
                {(configured === false || error) && (
                  <p className={`pw-note ${error ? 'warn' : ''}`} role={error ? 'alert' : undefined}>
                    {error || 'Live voice turns on after the local Boson key is set.'}
                  </p>
                )}
                <footer className="pw-call-dock">
                  <button type="button" className="pw-round" onClick={rewindOne} disabled={milestone <= 0}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.3-5.6L4 8" /><path d="M4 4v4.5h4.5" /></svg>
                    <span>Undo</span>
                  </button>
                  <button
                    type="button"
                    className={`pw-orb ${liveNow ? 'live' : ''} ${speaking ? 'talking' : ''}`}
                    aria-label={micLabel}
                    aria-pressed={mic}
                    disabled={connection === 'closing' || micBusy}
                    onClick={() => { void onMic(); }}
                  >
                    <IconMic />
                  </button>
                  <button type="button" className="pw-round" onClick={() => { setMenu(false); setEvaluate(true); }}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V10M12 19V5M19 19v-7" /></svg>
                    <span>Evaluate</span>
                  </button>
                </footer>
              </>
            )}
          </div>
          <div className="ember-home" aria-hidden="true" />
          <div className="pw-breath" aria-hidden="true">
            <span className="b-top" />
            <span className="b-right" />
            <span className="b-bottom" />
            <span className="b-left" />
            <span className="b-frame" />
          </div>
        </div>
      </div>
    </div>
  );
}
