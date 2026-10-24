import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Conversation, ProtocolEvent, SessionBootstrap, Turn } from '../shared/domain';
import { EMBER_DATE, scenarioFromPartner, type PartnerBrief } from '../shared/partner';
import { emptyConversation, orderedTurns, reduceTranscript } from '../shared/transcript';
import { HiggsClient, type Activity, type ConnectionState } from './realtime/HiggsClient';
import { api, SessionRecorder } from './recording';

const EMBER_HOME = '/';

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

function IconX({ className = 'glass-icon' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function IconMic() {
  return (
    <svg className="glass-icon glass-icon-lg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

function IconBranch() {
  return (
    <svg className="glass-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="8" r="2.2" />
      <path d="M6 8v8M8 7.2c2.4.6 4.2 2.2 5.2 4.2" />
    </svg>
  );
}

function IconRewind() {
  return (
    <svg className="glass-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12a8 8 0 1 0 2.3-5.6L4 8" />
      <path d="M4 4v4.5h4.5" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg className="glass-icon glass-icon-sm" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l1.4 5.2L18 10l-4.6 1.8L12 17l-1.4-5.2L6 10l4.6-1.8L12 3z" />
      <path d="M18 14l.6 2 2 .6-2 .6-.6 2-.6-2-2-.6 2-.6.6-2z" />
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
  const [treeOpen, setTreeOpen] = useState(false);
  const [focus, setFocus] = useState<number | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const client = useRef<HiggsClient | null>(null);
  const armMic = useRef(false);
  const state = useRef<Conversation>(emptyConversation());
  const recorder = useRef<SessionRecorder | null>(null);
  const recorders = useRef<SessionRecorder[]>([]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    const previous = meta?.getAttribute('content');
    meta?.setAttribute('content', '#0B0E14');
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
  const previous = shownIndex > 0 ? rows[shownIndex - 1] : undefined;
  const idleCopy = connection === 'ready'
    ? (mic ? `${name} can hear you. Say hello.` : 'The mic is off. Tap it to talk.')
    : `A first date with ${name}. Tap the mic to begin.`;
  const caption = (shown?.ai || shown?.user || idleCopy).replace(/\s+/g, ' ').trim();
  const words = caption.split(' ').filter(Boolean);
  const karaoke = activity === 'speaking' && focusIndex === null && Boolean(shown?.ai);
  const speaking = activity === 'speaking' || (mic && level > 0.05);
  const liveLabel = connection === 'ready' ? 'Live' : connection === 'connecting' || connection === 'closing' ? 'Wait' : 'Off';
  const mood = activity === 'speaking' ? 'Talk' : activity === 'thinking' ? 'Wait' : mic ? 'Mic' : 'Date';
  const bars = [0.08, 0.16, 0.28, 0.42].map((step) => level >= step || (activity === 'speaking' && step < 0.3));

  useEffect(() => { setWordIndex(0); }, [caption]);

  useEffect(() => {
    if (!karaoke || words.length < 2) return;
    const timer = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1 >= words.length ? words.length - 1 : prev + 1));
    }, 420);
    return () => window.clearInterval(timer);
  }, [karaoke, words.length, caption]);

  useEffect(() => {
    if (activity === 'speaking') setFocus(null);
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

  function rewindTo(index: number) {
    setFocus(index >= rows.length - 1 ? null : index);
    setTreeOpen(false);
  }

  function rewindOne() {
    const current = focusIndex ?? Math.max(0, rows.length - 1);
    if (current <= 0) return;
    setFocus(current - 1);
  }

  const micLabel = connection === 'connecting'
    ? 'Cancel connection'
    : connection === 'ready'
      ? (mic ? 'Turn microphone off' : 'Turn microphone on')
      : `Talk with ${name}`;

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
          <div className="glass-app">
            <header className="glass-top glass">
              <button type="button" className="glass-leave" onClick={() => { void leave(); }}>
                <IconX />
                <span>Leave</span>
              </button>
              <div className={`glass-live ${connection === 'ready' ? 'is-on' : ''}`} aria-live="polite">
                <i />
                <span>{liveLabel}</span>
              </div>
              <div className="glass-mood">
                <IconSpark />
                <span className="glass-bars" aria-hidden="true">
                  {bars.map((on, index) => <i key={index} className={on ? 'on' : ''} />)}
                </span>
                <span>{mood}</span>
              </div>
            </header>

            <main className="glass-stage">
              <div className={`glass-aura ${speaking ? 'is-speaking' : ''}`} style={{ '--voice': String(Math.min(1, level * 3)) } as CSSProperties}>
                <span className="glass-glow" />
                <span className="glass-ring" />
                <div className="glass-portrait">
                  {photo
                    ? <img src={photo} alt="" />
                    : <div className="glass-fallback">{name[0]}</div>}
                </div>
              </div>

              <div className="glass-caption glass">
                <p className="sr-only">{caption}</p>
                <p aria-hidden="true">
                  {words.map((word, index) => (
                    <span key={`${word}-${index}`} className={!karaoke || index === wordIndex ? 'on' : 'off'}>
                      {word}{' '}
                    </span>
                  ))}
                </p>
              </div>

              {previous && (previous.ai || previous.user) && (
                <button type="button" className="glass-ghost" onClick={rewindOne}>
                  <span>
                    <small>Previous turn</small>
                    <em>“{previous.ai || previous.user}”</em>
                  </span>
                  <span className="glass-ghost-action">
                    <IconRewind />
                    Rewind
                  </span>
                </button>
              )}
            </main>

            {(configured === false || error) && (
              <p className={`glass-note ${error ? 'warn' : ''}`} role={error ? 'alert' : undefined}>
                {error || 'Live voice turns on after the local Boson key is set.'}
              </p>
            )}

            <footer className="glass-footer">
              <div className="glass-dock glass">
                <button type="button" className="glass-dock-btn" onClick={() => setTreeOpen(true)}>
                  <IconBranch />
                  <span>Tree</span>
                </button>
                <button
                  type="button"
                  className={`glass-mic ${mic || speaking ? 'on' : ''}`}
                  aria-label={micLabel}
                  aria-pressed={mic}
                  disabled={connection === 'closing' || micBusy}
                  onClick={() => { void onMic(); }}
                >
                  <IconMic />
                </button>
                <button
                  type="button"
                  className="glass-dock-btn"
                  onClick={focusIndex === null ? rewindOne : () => setFocus(null)}
                  disabled={focusIndex === null && rows.length < 2}
                >
                  <IconRewind />
                  <span>{focusIndex === null ? 'Undo' : 'Now'}</span>
                </button>
              </div>
            </footer>
          </div>
          <div className="ember-home" aria-hidden="true" />

          {treeOpen && (
            <div className="glass-sheet-root" role="presentation">
              <button type="button" className="glass-scrim" aria-label="Close parallel realities" onClick={() => setTreeOpen(false)} />
              <div className="glass-sheet glass" role="dialog" aria-modal="true" aria-labelledby="glass-tree-title">
                <div className="glass-grabber" />
                <div className="glass-sheet-head">
                  <div>
                    <h2 id="glass-tree-title">Parallel Realities</h2>
                    <p>Rewind to an earlier line from this date.</p>
                  </div>
                  <button type="button" className="glass-close" aria-label="Close" onClick={() => setTreeOpen(false)}>
                    <IconX />
                  </button>
                </div>
                <div className="glass-tree">
                  {!rows.length && <p className="glass-tree-empty">No turns yet. Start the date and this path will fill in.</p>}
                  {rows.map((row, index) => (
                    <article key={row.id} className={index === shownIndex ? 'is-current' : ''}>
                      <div>
                        <small>Turn {index + 1}</small>
                        <p>You: “{row.user || '…'}”</p>
                        <p>{name}: “{row.ai || '…'}”</p>
                      </div>
                      <button type="button" onClick={() => rewindTo(index)}>
                        <IconRewind />
                        Rewind
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
