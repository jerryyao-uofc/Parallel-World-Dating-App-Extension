const phone = document.querySelector(".phone");
const screen = document.querySelector(".screen");
const logo = document.querySelector(".assist-logo");

let audioCtx = null;
let analyser = null;
let stream = null;
let raf = 0;
let level = 0;
let lastTick = 0;
let session = 0;

let leaving = false;

logo.addEventListener("click", () => {
  if (screen.classList.contains("is-listening") || leaving) return;
  start();
});

function currentAvatarClip() {
  return document.querySelector(".pw-transition-stage .avatar-clip, .swipe-card.top .avatar-clip, .detail-view .avatar-clip");
}

function jumpToPractice() {
  if (leaving) return;
  leaving = true;
  const partner = window.emberPracticePartner?.() || null;
  const params = new URLSearchParams();
  if (partner?.name) {
    const set = (key, value) => {
      if (value == null || value === "") return;
      params.set(key, String(value));
    };
    set("partner", partner.name);
    set("age", partner.age);
    set("gender", partner.gender);
    set("job", partner.job);
    set("city", partner.city);
    set("about", partner.about);
    set("prompt", partner.cardText || partner.surprise || "");
    set("promptKicker", partner.cardKicker || partner.surpriseKicker || "");
    set("looking", partner.lookingFor);
    if (partner.distance && partner.distance !== "Your profile") set("distance", partner.distance);
    set("education", partner.education);
    set("height", partner.height);
    set("zodiac", partner.zodiac);
    set("family", partner.family);
    set("weekends", partner.weekends);
    set("saturday", partner.saturday);
    set("sunday", partner.sunday);
    set("surprise", partner.surprise);
    set("voice", partner.voice);
    if (Array.isArray(partner.interests) && partner.interests.length) {
      set("interests", partner.interests.map((item) => item.label).filter(Boolean).join(", "));
    }
    if (partner.photo) {
      const path = new URL(partner.photo, window.location.href).pathname;
      if (path.startsWith("/photos/")) set("photo", path);
    }
  }
  const target = new URL("/practice/", window.location.origin);
  if (window.location.port === "8891") target.port = "5173";
  target.search = params.toString();
  try {
    const snap = window.emberSnapshot?.();
    if (snap) sessionStorage.setItem("tindr-return", JSON.stringify(snap));
  } catch { /* the date still opens if the browser blocks storage */ }
  stop();
  window.location.assign(target.href);
}

function primeClip(clip) {
  clip.playsInline = true;
  clip.setAttribute("playsinline", "");
  clip.setAttribute("webkit-playsinline", "");
  clip.muted = false;
  clip.volume = 1;
  clip.classList.add("is-playing");
}

function playAvatar() {
  const clip = currentAvatarClip();
  if (!clip) {
    jumpToPractice();
    return;
  }
  primeClip(clip);
  const stage = document.querySelector(".pw-transition-stage");
  if (stage && clip.parentElement !== stage) stage.appendChild(clip);
  clip.preload = "auto";
  if (!clip.dataset.bound) {
    clip.dataset.bound = "1";
    clip.addEventListener("playing", () => clip.classList.add("is-playing"));
    clip.addEventListener("ended", () => jumpToPractice());
    clip.addEventListener("error", () => { if (clip.error) jumpToPractice(); });
  }
  if (clip.readyState > 0) {
    try { clip.currentTime = 0; } catch { /* metadata may still be loading */ }
  }
  const attempt = clip.play();
  if (attempt) attempt.catch(() => { if (!clip.ended) clip.play().catch(() => {}); });
}

function resumeAvatar(id) {
  const clip = currentAvatarClip();
  if (id !== session || !clip || clip.ended || leaving) return;
  if (clip.paused) clip.play().catch(() => {});
}

function stopAvatar() {
  document.querySelectorAll(".avatar-clip").forEach((clip) => {
    clip.pause();
    clip.classList.remove("is-playing");
    try { clip.currentTime = 0; } catch { /* ignore */ }
  });
}

window.emberSyncAvatar = () => {
  if (!screen.classList.contains("is-listening")) return;
  const clip = currentAvatarClip();
  if (!clip || clip.classList.contains("is-playing") || clip.ended) return;
  playAvatar();
};

document.querySelector(".practice-jump").addEventListener("click", (event) => {
  event.preventDefault();
  jumpToPractice();
});

function start() {
  const id = ++session;
  screen.classList.add("is-listening");
  playAvatar();
  logo.classList.add("is-on");
  logo.setAttribute("aria-pressed", "true");
  logo.setAttribute("aria-label", "Parallel Worlds is introducing this date");
  // Ask for the microphone now, while this tap still counts, then let the video keep the speaker.
  // The live date on the next page can turn the mic on without another tap.
  const permit = navigator.mediaDevices?.getUserMedia?.({
    audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
  });
  if (!permit) return;
  permit.then((mic) => {
    mic.getTracks().forEach((track) => track.stop());
    resumeAvatar(id);
  }).catch(() => resumeAvatar(id));
}

function meter() {
  const data = new Uint8Array(analyser.frequencyBinCount);
  const binHz = audioCtx.sampleRate / analyser.fftSize;
  const from = Math.max(1, Math.floor(180 / binHz));
  const to = Math.min(data.length - 1, Math.ceil(3400 / binHz));

  const tick = () => {
    if (!screen.classList.contains("is-listening") || !analyser) return;
    analyser.getByteFrequencyData(data);
    let sum = 0;
    for (let i = from; i <= to; i++) sum += data[i];
    const energy = sum / ((to - from + 1) * 255);
    const target = Math.min(1, Math.max(0, (energy - 0.035) / 0.2));
    const now = performance.now();
    const dt = lastTick ? Math.min(0.05, (now - lastTick) / 1000) : 0.016;
    lastTick = now;
    const tau = target > level ? 0.42 : 0.85;
    level += (target - level) * (1 - Math.exp(-dt / tau));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const flutter = reduce ? 0 : Math.sin(now / 320) * level * 0.4;
    const flutter2 = reduce ? 0 : Math.sin(now / 460 + 0.8) * level * 0.4;
    phone.style.setProperty("--voice", level.toFixed(3));
    phone.style.setProperty("--flutter", flutter.toFixed(3));
    phone.style.setProperty("--flutter2", flutter2.toFixed(3));
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
}

function stop() {
  session += 1;
  stopAvatar();
  cancelAnimationFrame(raf);
  raf = 0;
  level = 0;
  lastTick = 0;
  screen.classList.remove("is-listening");
  logo.classList.remove("is-on");
  logo.setAttribute("aria-pressed", "false");
  logo.setAttribute("aria-label", "Parallel Worlds, practice this date");
  phone.style.setProperty("--voice", "0");
  phone.style.setProperty("--flutter", "0");
  phone.style.setProperty("--flutter2", "0");
  stream?.getTracks().forEach((track) => track.stop());
  stream = null;
  analyser = null;
  audioCtx?.close();
  audioCtx = null;
}

window.emberStopIntro = stop;
window.addEventListener("pageshow", (event) => {
  if (event.persisted) stop();
});
