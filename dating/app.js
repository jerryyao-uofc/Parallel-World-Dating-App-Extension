const me = {
  id: "alex",
  name: "Alex",
  age: 26,
  gender: "man",
  job: "Grad student",
  city: "Toronto",
  photo: "photos/alex.jpg",
  verified: true,
  distance: "Your profile",
  lookingFor: "Long-term partner",
  about: "I host dinners that start on time and end when the record does.",
  surpriseKicker: "A surprising thing about me...",
  surprise: "I will plan the whole night and still pretend we just ended up there.",
  weekends: "Cooking",
  saturday: "A long table and one record on repeat",
  sunday: "A slow morning, then the city",
  zodiac: "Taurus",
  education: "Masters",
  height: "5'11\"",
  family: "Open to it",
  interests: [
    { label: "Cooking", hot: true },
    { label: "Records", hot: true },
    { label: "Cities", hot: false },
    { label: "Tennis", hot: false },
  ],
};

const profiles = [
  {
    id: "zendaya",
    name: "Zendaya",
    age: 27,
    gender: "woman",
    verified: true,
    distance: "Los Angeles",
    job: "Fashion & producing",
    photo: "photos/zendaya.jpg",
    voice: "eleanor",
    mutual: true,
    lookingFor: "Long-term partner",
    cardKicker: "Be honest...",
    cardText: "Do you actually finish a three-hour art-house movie, or are you out twenty minutes in?",
    about: "Probably thinking about my next outfit, or how to reorganize the record collection. I like people who can sit with a long movie and still have a sharp take after.",
    surpriseKicker: "A surprising thing about me...",
    surprise: "I will rebuild a closet before I rebuild a plan. The records have to make sense too.",
    weekends: "Vintage shops",
    saturday: "A rail of old jackets, then a late screening",
    sunday: "Poetry, coffee, and one record on repeat",
    zodiac: "Virgo",
    education: "Performing arts",
    height: "5'10\"",
    family: "Open to it",
    interests: [
      { label: "Vintage", hot: true },
      { label: "Film history", hot: true },
      { label: "Poetry", hot: false },
      { label: "Records", hot: true },
      { label: "Fashion", hot: false },
    ],
  },
  {
    id: "sydney",
    name: "Sydney",
    age: 26,
    gender: "woman",
    verified: true,
    distance: "Los Angeles",
    job: "Actor & car restorer",
    photo: "photos/sydney.jpg",
    voice: "chloe",
    mutual: false,
    lookingFor: "Not sure yet",
    cardKicker: "Quick question...",
    cardText: "If you rebuilt a '69 from scratch, what color would you paint it?",
    about: "Half my camera roll is scenic views. The other half is grease under my fingernails. I restore old cars, climb when I can, and I will talk you into a lake weekend.",
    surpriseKicker: "A surprising thing about me...",
    surprise: "I can name a torque spec and still lose the car keys in my own bag.",
    weekends: "The garage",
    saturday: "A climb, then the lake if the light holds",
    sunday: "Sanding a fender and a very early coffee",
    zodiac: "Virgo",
    education: "On set",
    height: "5'3\"",
    family: "Open to it",
    interests: [
      { label: "Vintage cars", hot: true },
      { label: "Climbing", hot: true },
      { label: "Camping", hot: false },
      { label: "Lakes", hot: true },
      { label: "Road trips", hot: false },
    ],
  },
  {
    id: "margot",
    name: "Margot",
    age: 32,
    gender: "woman",
    verified: true,
    distance: "Los Angeles",
    job: "Producer",
    photo: "photos/margot.jpg",
    voice: "chloe",
    mutual: false,
    lookingFor: "Long-term partner",
    cardKicker: "I need a debate...",
    cardText: "Tell me your most controversial food opinion. I came ready.",
    about: "I will argue board-game rules and then drag you to karaoke. Surfing in the morning, a hidden cocktail bar at night, and I do not lose a debate on purpose.",
    surpriseKicker: "A surprising thing about me...",
    surprise: "I keep a ranked list of bars that are not on the map, and I will not text it to you.",
    weekends: "The water",
    saturday: "A surf, then a board game I will win",
    sunday: "Karaoke if you can handle it",
    zodiac: "Cancer",
    education: "Drama",
    height: "5'6\"",
    family: "Want someday",
    interests: [
      { label: "Surfing", hot: true },
      { label: "Board games", hot: true },
      { label: "Karaoke", hot: false },
      { label: "Cocktail bars", hot: true },
      { label: "Banter", hot: false },
    ],
  },
  {
    id: "rose",
    name: "Rosé",
    age: 26,
    gender: "woman",
    verified: true,
    distance: "Seoul",
    job: "Musician",
    photo: "photos/rose.jpg",
    voice: "nora",
    mutual: false,
    lookingFor: "Long-term partner",
    cardKicker: "One album...",
    cardText: "If you could keep only one album for life, what are you picking?",
    about: "Studio rat by night, coffee hunter by day. I play guitar, collect vinyl, and I will judge your Spotify Wrapped. Gently. Mostly. My dog gets a vote too.",
    surpriseKicker: "A surprising thing about me...",
    surprise: "I can find a bakery in a city I have never been to. The first pastry is research.",
    weekends: "The studio",
    saturday: "A new bakery, then vinyl until late",
    sunday: "A long walk with the dog and one quiet record",
    zodiac: "Aquarius",
    education: "Music",
    height: "5'6\"",
    family: "Open to it",
    interests: [
      { label: "Guitar", hot: true },
      { label: "Vinyl", hot: true },
      { label: "Bakeries", hot: false },
      { label: "Coffee", hot: true },
      { label: "Dogs", hot: true },
    ],
  },
  {
    id: "chris",
    name: "Chris",
    age: 39,
    gender: "man",
    verified: true,
    distance: "Byron Bay",
    job: "Explorer",
    photo: "photos/chris.jpg",
    voice: "jake",
    mutual: false,
    lookingFor: "Long-term partner",
    cardKicker: "Morning test...",
    cardText: "Sunrise surf, or sleep until noon? I will still like you.",
    about: "Professional ocean enthusiast. I lift, I cook outside, and I will probably invite you into freezing water at 6 AM. You can say no. I might ask again.",
    surpriseKicker: "A surprising thing about me...",
    surprise: "The cold water is the easy part. I get sentimental about a good breakfast after.",
    weekends: "The ocean",
    saturday: "A dawn surf, then something on the grill",
    sunday: "Weights, a long swim, and an early night",
    zodiac: "Leo",
    education: "Acting",
    height: "6'3\"",
    family: "Want someday",
    interests: [
      { label: "Surfing", hot: true },
      { label: "Lifting", hot: true },
      { label: "Outdoor cooking", hot: false },
      { label: "The ocean", hot: true },
      { label: "Early mornings", hot: false },
    ],
  },
  {
    id: "timothee",
    name: "Timothée",
    age: 27,
    gender: "man",
    verified: true,
    distance: "New York",
    job: "Actor",
    photo: "photos/timothee.jpg",
    voice: "oliver",
    mutual: false,
    lookingFor: "Not sure yet",
    cardKicker: "Coffee order...",
    cardText: "Black drip, or the ridiculous iced vanilla oat latte? I will only judge a little.",
    about: "Probably listening to an album you have never heard of. I sketch, I hunt weird little roasters, and I would like to wander a modern art museum until one of us gets lost.",
    surpriseKicker: "A surprising thing about me...",
    surprise: "I will order the complicated drink and then pretend I meant to get a drip.",
    weekends: "Wandering",
    saturday: "A gallery, then a coffee I cannot pronounce",
    sunday: "Sketching and a record nobody requested",
    zodiac: "Capricorn",
    education: "LaGuardia",
    height: "5'10\"",
    family: "Not sure yet",
    interests: [
      { label: "Indie music", hot: true },
      { label: "Sketching", hot: true },
      { label: "Coffee", hot: false },
      { label: "Museums", hot: true },
      { label: "Records", hot: false },
    ],
  },
  {
    id: "michael",
    name: "Michael",
    age: 35,
    gender: "man",
    verified: true,
    distance: "Los Angeles",
    job: "Director",
    photo: "photos/michael.jpg",
    voice: "marcus",
    mutual: false,
    lookingFor: "Long-term partner",
    cardKicker: "Lazy Sunday...",
    cardText: "Anime marathon, or a new restaurant downtown? I am good either way.",
    about: "Equally comfortable talking business or arguing an anime plot. I box, I game, and I keep a running list of steakhouses worth the trip.",
    surpriseKicker: "A surprising thing about me...",
    surprise: "I will pause a match to explain a plot twist, then get back in the ring.",
    weekends: "Off the clock",
    saturday: "A long session, then a steak I have been saving",
    sunday: "Anime on the couch, or a table downtown",
    zodiac: "Aquarius",
    education: "Film",
    height: "6'0\"",
    family: "Want someday",
    interests: [
      { label: "Boxing", hot: true },
      { label: "Anime", hot: true },
      { label: "Gaming", hot: false },
      { label: "Steakhouses", hot: true },
      { label: "Directing", hot: false },
    ],
  },
  {
    id: "marques",
    name: "Marques",
    age: 29,
    gender: "man",
    verified: true,
    distance: "New Jersey",
    job: "Tech creator",
    photo: "photos/marques.jpg",
    voice: "oliver",
    mutual: false,
    lookingFor: "Long-term partner",
    cardKicker: "Be honest...",
    cardText: "Do you care about refresh rates, or do you just buy the pretty phone?",
    about: "Always testing a gadget or cutting a video. Ask me about camera specs or sports numbers and I will not stop. I also play ultimate, fly a drone, and take gaming nights seriously.",
    surpriseKicker: "A surprising thing about me...",
    surprise: "I can explain a sensor for ten minutes and still lose the remote in the couch.",
    weekends: "Testing things",
    saturday: "Ultimate, then whatever device showed up this week",
    sunday: "A drone flight and one game I refuse to pause",
    zodiac: "Sagittarius",
    education: "Stevens",
    height: "6'3\"",
    family: "Open to it",
    interests: [
      { label: "Ultimate", hot: true },
      { label: "Cameras", hot: true },
      { label: "Drones", hot: false },
      { label: "Gadgets", hot: true },
      { label: "Gaming", hot: false },
    ],
  },
];

const DECK_IDS = ["zendaya", "sydney", "margot", "rose", "chris", "timothee", "michael", "marques"];
const INITIAL_LIKES = ["margot", "timothee"];
const byId = Object.fromEntries(profiles.map((p) => [p.id, p]));

const state = {
  tab: "discover",
  overlay: null,
  deck: [...DECK_IDS],
  history: [],
  likesIn: [...INITIAL_LIKES],
  likesOut: [],
  passes: [],
  blocked: [],
  matches: ["rose"],
  messages: {
    rose: [
      { from: "them", text: "One album for the rest of your life. I am waiting.", time: "3h" },
      { from: "me", text: "Something I can play in a kitchen. I will not survive a three-hour opera.", time: "2h" },
      { from: "them", text: "Gentle judgment. The dog liked that answer more than I did.", time: "1h" },
    ],
  },
  unread: { rose: 1 },
  pendingMatch: null,
  detailId: null,
  chatId: null,
  sheet: null,
  sheetId: null,
  bell: false,
  looking: "all",
  showShieldHint: true,
  toast: null,
  animating: false,
};

let toastToken = 0;
let toastTimer = null;
let gesture = null;
let suppressClick = false;

function person(id) {
  return id === me.id ? me : byId[id];
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

const icon = {
  flame: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.1 1.8c.3 3.2-1.6 4.8-2.8 6.6-1.2 1.8-1.8 3.1-1.8 5 0 1.2.4 2.2 1.1 2.9-1.3-.8-2.1-2.1-2.1-3.6 0-2.2 1.2-3.9 2.4-5.6.8-1.1 1.5-2.1 1.6-3.6.1-.8-.4-1.4-.7-1.8.7.4 1.6 1.5 2.3.1zM12 22c3.8 0 6.6-2.6 6.6-6.2 0-2.8-1.6-4.8-3-6.6-.5-.6-1.5.1-1.1.8.8 1.5.5 2.6-.5 3.7-.7.8-1.7 1.2-1.5-.9.2-1.8-.8-3.4-1.8-4.7-.4-.5-1.2 0-.9.6.7 1.7.3 3.3-.8 4.6-1.2 1.4-1.8 2.8-1.8 4.3C7.2 19.4 9.2 22 12 22z"/></svg>',
  back: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5L8 12l7 7"/></svg>',
  bell: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6.2 2 6.2H4S6 14 6 9"/><path d="M10 18.5a2 2 0 0 0 4 0"/></svg>',
  shield: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.4-2.8 7.3-7 9-4.2-1.7-7-4.6-7-9V6l7-3z"/></svg>',
  chev: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 14l6-6 6 6"/></svg>',
  rewind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2-5.1"/><path d="M4 4.5V9h4.5"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3.2l2.4 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16.2 7 18.6l1.1-5.6L3.9 9.1l5.7-.7L12 3.2z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-14h-7l0-6z"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M5 6.5h14v8.2H8.2L5 17.5V6.5z"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  gem: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 3l3 5 5 .4-4 4.2 1.2 5.4L12 15.8 6.8 18l1.2-5.4L4 8.4 9 8l3-5z"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5z"/><path d="M5 5.5A2.5 2.5 0 0 1 7.5 8H19"/></svg>',
  ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M4 15l11-11 5 5L9 20H4v-5z"/><path d="M9 8l2 2M12 5l2 2M6 11l2 2"/></svg>',
  people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="9" r="3"/><circle cx="16" cy="10" r="2.2"/><path d="M4.5 19c.6-2.6 2.4-4 4.5-4s3.9 1.4 4.5 4M14 15.2c1.3-.4 2.6-.2 3.6.8 1 .9 1.5 2 1.6 3"/></svg>',
};

const verifyBadge = '<svg class="verify" viewBox="0 0 24 24" width="18" height="18" aria-label="Verified"><circle cx="12" cy="12" r="10" fill="#3b9cff"/><path d="M7.4 12.2l3 3.1 6.2-6.4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function roundBtn(action, label, glyph, cls, extra = "") {
  return `<button type="button" class="round ${cls}" data-action="${action}" aria-label="${label}" ${extra}>${glyph}</button>`;
}

function showToast(message) {
  state.toast = message;
  const root = document.querySelector(".root");
  if (!root) return;
  let el = root.querySelector(".toast");
  if (!el) {
    root.insertAdjacentHTML("beforeend", '<div class="toast" role="status"></div>');
    el = root.querySelector(".toast");
  }
  el.textContent = message;
  const token = ++toastToken;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    if (token !== toastToken) return;
    state.toast = null;
    document.querySelector(".toast")?.remove();
  }, 1700);
}

function unreadCount() {
  return Object.values(state.unread).reduce((sum, n) => sum + (n || 0), 0);
}

function tabbar() {
  const likes = state.likesIn.length;
  const chats = unreadCount();
  const item = (tab, glyph, label, badge) => `
    <button type="button" class="tab ${state.tab === tab ? "on" : ""}" data-action="tab" data-tab="${tab}" aria-label="${label}">
      ${glyph}
      ${badge ? `<span class="badge">${badge}</span>` : ""}
    </button>`;
  return `<nav class="tabbar">
    ${item("discover", icon.flame, "Discover")}
    ${item("explore", icon.grid, "Explore")}
    ${item("likes", icon.heart, "Likes", likes || "")}
    ${item("messages", icon.chat, "Messages", chats || "")}
    <button type="button" class="tab ${state.tab === "profile" ? "on" : ""}" data-action="tab" data-tab="profile" aria-label="Profile">
      <img class="tab-avatar" src="${me.photo}" alt="" />
    </button>
  </nav>`;
}

function avatarClip(p, eager) {
  if (p.id === me.id) return "";
  return `<video class="avatar-clip" playsinline webkit-playsinline preload="${eager ? "auto" : "none"}" src="videos/${p.id}.mp4"></video>`;
}

function cardHtml(p, cls) {
  return `<article class="swipe-card ${cls}" data-id="${p.id}">
    <img class="card-photo" src="${p.photo}" alt="${esc(p.name)}" draggable="false" />
    ${avatarClip(p, cls === "top")}
    <div class="bars"><span class="on"></span></div>
    <div class="card-shade"></div>
    <div class="stamp like">LIKE</div>
    <div class="stamp nope">NOPE</div>
    <div class="stamp super">SUPER</div>
    <div class="card-info">
      <div class="card-row">
        <h1 class="card-name name-line">${esc(p.name)} <span class="age">${p.age}</span>${p.verified ? verifyBadge : ""}</h1>
        <span class="chev">${icon.chev}</span>
      </div>
      <div class="prompt">
        <div class="kicker">“ ${esc(p.cardKicker)}</div>
        <div class="prompt-text">${esc(p.cardText)}</div>
      </div>
    </div>
  </article>`;
}

function discoverView() {
  const [front, next] = state.deck;
  const empty = !front;
  const stack = empty
    ? `<div class="empty">
        <h2>You've seen everyone nearby</h2>
        <p>Rewind a pass, or look through them again.</p>
        <button type="button" class="solid" data-action="recycle">Review again</button>
      </div>`
    : `${next ? cardHtml(person(next), "next") : ""}${cardHtml(person(front), "top")}`;
  const off = empty ? "disabled" : "";
  return `<div class="deck-view">
    <header class="topbar">
      <div class="brand">${icon.flame}<span class="word">Tindr</span></div>
      <button type="button" class="icon-hit bell" data-action="toggle-bell" aria-label="Alerts">
        ${icon.bell}
        ${state.likesIn.length ? '<span class="dot"></span>' : ""}
      </button>
    </header>
    <div class="stack">${stack}</div>
    <div class="actions">
      ${roundBtn("rewind", "Rewind", icon.rewind, "sm rewind", state.history.length ? "" : "disabled")}
      ${roundBtn("nope", "Pass", icon.x, "lg nope", off)}
      ${roundBtn("super", "Super like", icon.star, "sm super", off)}
      ${roundBtn("like", "Like", icon.heart, "lg like", off)}
      ${roundBtn("boost", "Boost", icon.bolt, "sm boost")}
    </div>
  </div>`;
}

function tileTag(id) {
  if (state.matches.includes(id)) return { text: "Matched", hot: true };
  if (state.likesIn.includes(id)) return { text: "Liked you", hot: true };
  if (state.likesOut.includes(id)) return { text: "Liked", hot: false };
  return null;
}

function exploreView() {
  const filters = [
    ["all", "Everyone"],
    ["Long-term partner", "Long-term"],
    ["New friends", "Friends"],
    ["Not sure yet", "Not sure"],
  ];
  const list = profiles.filter((p) => {
    if (state.blocked.includes(p.id)) return false;
    if (state.looking === "all") return true;
    return p.lookingFor === state.looking;
  });
  const tiles = list.map((p) => {
    const tag = tileTag(p.id);
    return `<button type="button" class="tile" data-action="open-detail" data-id="${p.id}">
      <img src="${p.photo}" alt="" />
      ${tag ? `<span class="tile-tag ${tag.hot ? "hot" : ""}">${tag.text}</span>` : ""}
      <span class="tile-meta">${esc(p.name)}, ${p.age}</span>
    </button>`;
  }).join("");
  return `<div class="scroll-view">
    <header class="topbar center"><h1 class="page-title">Explore</h1></header>
    <div class="chips">
      ${filters.map(([value, label]) => `<button type="button" class="chip ${state.looking === value ? "on" : ""}" data-action="filter" data-value="${value}">${label}</button>`).join("")}
    </div>
    <div class="grid">${tiles || '<div class="empty"><p>No one in this lane yet.</p></div>'}</div>
  </div>`;
}

function likesView() {
  const people = state.likesIn.map(person).filter(Boolean);
  const body = people.length
    ? `<p class="subhead">${people.length} ${people.length === 1 ? "person" : "people"} already said yes</p>
      <div class="grid">${people.map((p) => `
        <button type="button" class="tile" data-action="open-detail" data-id="${p.id}">
          <img src="${p.photo}" alt="" />
          <span class="tile-tag hot">Liked you</span>
          <span class="tile-meta">${esc(p.name)}, ${p.age}</span>
        </button>`).join("")}</div>`
    : `<div class="empty"><h2>No likes yet</h2><p>When someone likes you, they'll show up here.</p></div>`;
  return `<div class="scroll-view">
    <header class="topbar center"><h1 class="page-title">Likes</h1></header>
    ${body}
  </div>`;
}

function preview(id) {
  const msgs = state.messages[id] || [];
  if (!msgs.length) return "You matched. Say hi.";
  const last = msgs[msgs.length - 1];
  return (last.from === "me" ? "You: " : "") + last.text;
}

function threadTime(id) {
  const msgs = state.messages[id] || [];
  if (!msgs.length) return "Now";
  return msgs[msgs.length - 1].time || "Now";
}

function messagesView() {
  const rows = state.matches.filter((id) => person(id) && !state.blocked.includes(id));
  const body = rows.length
    ? rows.map((id) => {
      const p = person(id);
      const unread = state.unread[id];
      return `<button type="button" class="thread-row ${unread ? "unread" : ""}" data-action="open-chat" data-id="${id}">
        <span class="avatar-wrap">
          <img src="${p.photo}" alt="" />
          ${unread ? '<span class="unread-dot"></span>' : ""}
        </span>
        <span class="thread-copy">
          <strong>${esc(p.name)}</strong>
          <em>${esc(preview(id))}</em>
        </span>
        <span class="when">${esc(threadTime(id))}</span>
      </button>`;
    }).join("")
    : `<div class="empty"><h2>No matches yet</h2><p>Like someone back and the chat will land here.</p></div>`;
  return `<div class="scroll-view">
    <header class="topbar center"><h1 class="page-title">Messages</h1></header>
    ${body}
  </div>`;
}

function profileView() {
  return `<div class="scroll-view">
    <div class="me-hero">
      <img src="${me.photo}" alt="${esc(me.name)}" />
      <div class="me-id">
        <h1 class="name-line">${esc(me.name)} <span class="age">${me.age}</span>${verifyBadge}</h1>
        <p>${esc(me.job)} · ${esc(me.city)}</p>
        <button type="button" class="ghost" data-action="open-detail" data-id="alex">Preview profile</button>
      </div>
    </div>
    <div class="me-pad">
      <div class="section-label">About me</div>
      <p class="about">${esc(me.about)}</p>
      <div class="section-label">I'm looking for</div>
      <div class="look-card"><span class="gem">${icon.gem}</span>${esc(me.lookingFor)}</div>
      <div class="section-label">Interests</div>
      <div class="pills">${me.interests.map((item) => `<span class="pill ${item.hot ? "hot" : ""}">${esc(item.label)}</span>`).join("")}</div>
    </div>
  </div>`;
}

function basics(p) {
  const rows = [
    [icon.spark, "Zodiac", p.zodiac],
    [icon.book, "Education", p.education],
    [icon.ruler, "Height", p.height],
    [icon.people, "Family plans", p.family],
  ];
  return rows.map(([glyph, kicker, value]) => `
    <div class="info-row basic">${glyph}<div class="info-value">${esc(value)}</div><div class="info-kicker">${kicker}</div></div>`).join("");
}

function detailView(p) {
  const self = p.id === me.id;
  const matched = state.matches.includes(p.id);
  const actions = self || state.sheet
    ? ""
    : matched
      ? `<div class="detail-actions"><button type="button" class="message-cta" data-action="open-chat" data-id="${p.id}">Message ${esc(p.name)}</button></div>`
      : `<div class="detail-actions">
          ${roundBtn("nope", "Pass", icon.x, "lg nope", `data-id="${p.id}"`)}
          ${roundBtn("super", "Super like", icon.star, "sm super", `data-id="${p.id}"`)}
          ${roundBtn("like", "Like", icon.heart, "lg like", `data-id="${p.id}"`)}
        </div>`;
  const hint = !self && state.showShieldHint
    ? `<div class="shield-hint">Share, block and report here <button type="button" data-action="dismiss-hint" aria-label="Dismiss">${icon.close}</button></div>`
    : "";
  return `<div class="detail-view">
    <header class="detail-nav">
      <button type="button" class="icon-hit" data-action="back" aria-label="Back">${icon.back}</button>
      <h1 class="name-line">${esc(p.name)} <span class="age">${p.age}</span>${p.verified ? verifyBadge : ""}</h1>
      ${self ? "<span></span>" : `<button type="button" class="icon-hit" data-action="open-sheet" aria-label="More">${icon.shield}</button>`}
      ${hint}
    </header>
    <div class="detail-scroll">
      <div class="hero-frame">
        <img class="hero" src="${p.photo}" alt="${esc(p.name)}" />
        ${avatarClip(p, true)}
      </div>
      <div class="pad ${self ? "" : "with-actions"}">
        <p class="distance">${esc(p.distance)}${p.job ? ` · ${esc(p.job)}` : ""}</p>
        <div class="section-label">About me</div>
        <p class="about">${esc(p.about)}</p>
        <div class="section-label">Interests</div>
        <div class="pills">${p.interests.map((item) => `<span class="pill ${item.hot ? "hot" : ""}">${esc(item.label)}</span>`).join("")}</div>
        <div class="section-label">Looking for</div>
        <div class="look-card"><span class="gem">${icon.gem}</span>${esc(p.lookingFor)}</div>
        <div class="section-label">${esc(p.surpriseKicker)}</div>
        <p class="about">${esc(p.surprise)}</p>
        <div class="section-label">My weekends</div>
        <div class="info-card">
          <div class="info-row"><div class="info-kicker">Weekends are for...</div><div class="info-value">${esc(p.weekends)}</div></div>
          <div class="info-row"><div class="info-kicker">Saturday night looks like...</div><div class="info-value">${esc(p.saturday)}</div></div>
          <div class="info-row"><div class="info-kicker">A typical Sunday looks like...</div><div class="info-value">${esc(p.sunday)}</div></div>
        </div>
        <div class="section-label">Basics</div>
        <div class="info-card">${basics(p)}</div>
      </div>
    </div>
    ${actions}
  </div>`;
}

function chatView() {
  const p = person(state.chatId);
  const msgs = state.messages[p.id] || [];
  return `<div class="chat-view">
    <header class="detail-nav">
      <button type="button" class="icon-hit" data-action="back" aria-label="Back">${icon.back}</button>
      <div class="nav-person">
        <img class="chat-ava" src="${p.photo}" alt="" />
        <strong>${esc(p.name)}</strong>
      </div>
      <button type="button" class="icon-hit" data-action="open-sheet" aria-label="More">${icon.shield}</button>
    </header>
    <div class="thread">
      ${msgs.map((m) => `<div class="bubble ${m.from === "me" ? "me" : "them"}">${esc(m.text)}</div>`).join("")}
    </div>
    <form class="composer" data-action="send-chat">
      <input name="text" maxlength="200" placeholder="Type a message" autocomplete="off" />
      <button type="submit" aria-label="Send">${icon.send}</button>
    </form>
  </div>`;
}

function matchView() {
  const p = person(state.pendingMatch);
  return `<div class="match-view">
    <div class="match-photos">
      <img class="tilt-l" src="${me.photo}" alt="" />
      <span class="heart-badge">${icon.heart}</span>
      <img class="tilt-r" src="${p.photo}" alt="" />
    </div>
    <h2 class="match-title">It's a Match</h2>
    <p class="match-sub">You and ${esc(p.name)} liked each other.</p>
    <form class="match-form" data-action="send-match">
      <input class="match-input" name="text" maxlength="140" placeholder="Say something nice…" autocomplete="off" />
      <button type="submit" class="send-wide">Send</button>
    </form>
    <button type="button" class="linkish" data-action="keep-swiping">Keep Swiping</button>
  </div>`;
}

function sheetHtml() {
  if (!state.sheet) return "";
  if (state.sheet === "report") {
    const reasons = ["Fake profile", "Inappropriate photos", "Harassment", "Spam", "Something else"];
    return `<div class="sheet-backdrop" data-action="close-sheet">
      <div class="sheet" data-sheet>
        ${reasons.map((reason) => `<button type="button" data-action="submit-report">${esc(reason)}</button>`).join("")}
      </div>
      <div class="sheet"><button type="button" class="cancel" data-action="close-sheet">Cancel</button></div>
    </div>`;
  }
  return `<div class="sheet-backdrop" data-action="close-sheet">
    <div class="sheet" data-sheet>
      <button type="button" data-action="share">Share</button>
      <button type="button" class="danger" data-action="block">Block</button>
      <button type="button" class="danger" data-action="report">Report</button>
    </div>
    <div class="sheet"><button type="button" class="cancel" data-action="close-sheet">Cancel</button></div>
  </div>`;
}

function popoverHtml() {
  if (!state.bell) return "";
  const items = state.likesIn.map((id) => {
    const p = person(id);
    return `<button type="button" class="pop-item" data-action="open-detail" data-id="${id}">
      <img src="${p.photo}" alt="" />
      <span>${esc(p.name)} liked you</span>
    </button>`;
  }).join("");
  return `<div class="popover">${items || '<div class="pop-empty">You\'re all caught up.</div>'}</div>`;
}

function mainView() {
  if (state.overlay === "match" && state.pendingMatch) return matchView();
  if (state.overlay === "detail" && state.detailId) return detailView(person(state.detailId));
  if (state.overlay === "chat" && state.chatId) return chatView();
  if (state.tab === "explore") return exploreView();
  if (state.tab === "likes") return likesView();
  if (state.tab === "messages") return messagesView();
  if (state.tab === "profile") return profileView();
  return discoverView();
}

function transitionHtml() {
  const p = currentPartner();
  if (!p || p.id === me.id) return "";
  const chips = p.interests.slice(0, 4).map((item) => `<span>${esc(item.label)}</span>`).join("");
  return `<div class="pw-transition">
    <div class="pw-transition-stage"><img src="${p.photo}" alt="" /></div>
    <div class="pw-transition-shade"></div>
    <header class="pw-transition-nav">
      <button type="button" class="icon-hit light" data-action="exit-practice" aria-label="Back">${icon.back}</button>
      <button type="button" class="icon-hit light" data-action="open-sheet" aria-label="More"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/></svg></button>
    </header>
    <div class="pw-transition-meta">
      <h1 class="name-line">${esc(p.name)} <span class="age">${p.age}</span>${p.verified ? verifyBadge : ""}</h1>
      <p class="pw-transition-where"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"/><circle cx="12" cy="11" r="2"/></svg>${esc(p.distance)}</p>
      <div class="pw-transition-chips">${chips}</div>
    </div>
    <div class="pw-transition-actions">
      <button type="button" class="pw-transition-side" data-action="nope" data-id="${p.id}" aria-label="Pass">${icon.x}</button>
      <button type="button" class="pw-transition-go" data-action="enter-practice" aria-label="Parallel Worlds">
        <img src="brand/parallel-worlds.png?v=neon" alt="" />
        <span>Parallel Worlds</span>
      </button>
      <button type="button" class="pw-transition-side like" data-action="like" data-id="${p.id}" aria-label="Like">${icon.heart}</button>
    </div>
  </div>`;
}

function currentPartner() {
  let id = null;
  if (state.overlay === "match") id = state.pendingMatch;
  else if (state.overlay === "detail") id = state.detailId;
  else if (state.overlay === "chat") id = state.chatId;
  else if (state.tab === "discover") id = state.deck[0] || null;
  else if (state.tab === "profile") id = me.id;
  return id ? person(id) : null;
}

function currentPartnerName() {
  return currentPartner()?.name || "";
}

window.emberPracticePartner = currentPartner;

window.emberSnapshot = () => ({
  tab: state.tab,
  overlay: state.overlay,
  deck: state.deck,
  history: state.history,
  likesIn: state.likesIn,
  likesOut: state.likesOut,
  passes: state.passes,
  blocked: state.blocked,
  matches: state.matches,
  messages: state.messages,
  unread: state.unread,
  pendingMatch: state.pendingMatch,
  detailId: state.detailId,
  chatId: state.chatId,
  sheet: state.sheet,
  sheetId: state.sheetId,
  bell: state.bell,
  looking: state.looking,
  showShieldHint: state.showShieldHint,
});

function restoreReturn() {
  let saved = null;
  try { saved = JSON.parse(sessionStorage.getItem("tindr-return") || "null"); }
  catch { saved = null; }
  sessionStorage.removeItem("tindr-return");
  if (!saved || typeof saved !== "object") return;
  const known = new Set(profiles.map((p) => p.id));
  const ids = (list) => Array.isArray(list) ? list.filter((id) => known.has(id)) : null;
  const one = (id) => (id === me.id || known.has(id) ? id : null);
  const tabs = ["discover", "explore", "likes", "messages", "profile"];
  const overlays = ["match", "detail", "chat"];
  if (tabs.includes(saved.tab)) state.tab = saved.tab;
  state.overlay = overlays.includes(saved.overlay) ? saved.overlay : null;
  const deck = ids(saved.deck);
  if (deck) state.deck = deck;
  if (Array.isArray(saved.history)) {
    state.history = saved.history.filter((item) => item && known.has(item.id) && typeof item.action === "string");
  }
  const likesIn = ids(saved.likesIn);
  const likesOut = ids(saved.likesOut);
  const passes = ids(saved.passes);
  const blocked = ids(saved.blocked);
  const matches = ids(saved.matches);
  if (likesIn) state.likesIn = likesIn;
  if (likesOut) state.likesOut = likesOut;
  if (passes) state.passes = passes;
  if (blocked) state.blocked = blocked;
  if (matches) state.matches = matches;
  if (saved.messages && typeof saved.messages === "object") {
    const messages = {};
    for (const [id, thread] of Object.entries(saved.messages)) {
      if (!known.has(id) || !Array.isArray(thread)) continue;
      messages[id] = thread
        .filter((item) => item && (item.from === "me" || item.from === "them") && typeof item.text === "string")
        .map((item) => ({ from: item.from, text: item.text, time: typeof item.time === "string" ? item.time : "" }));
    }
    state.messages = messages;
  }
  if (saved.unread && typeof saved.unread === "object") {
    const unread = {};
    for (const [id, count] of Object.entries(saved.unread)) {
      if (known.has(id) && Number.isFinite(count)) unread[id] = count;
    }
    state.unread = unread;
  }
  state.pendingMatch = one(saved.pendingMatch);
  state.detailId = one(saved.detailId);
  state.chatId = one(saved.chatId);
  state.sheetId = one(saved.sheetId);
  state.sheet = saved.sheet === "menu" || saved.sheet === "report" ? saved.sheet : null;
  if (!state.sheetId) state.sheet = null;
  if (state.overlay === "detail" && !state.detailId) state.overlay = null;
  if (state.overlay === "chat" && !state.chatId) state.overlay = null;
  if (state.overlay === "match" && !state.pendingMatch) state.overlay = null;
  state.bell = Boolean(saved.bell);
  if (["all", "Long-term partner", "New friends", "Not sure yet"].includes(saved.looking)) state.looking = saved.looking;
  state.showShieldHint = Boolean(saved.showShieldHint);
}

function screenChrome() {
  if (!state.overlay) return "tabs";
  if (state.overlay === "detail" && state.detailId && state.detailId !== me.id) return "actions";
  if (state.overlay === "chat") return "chat";
  return "plain";
}

function render() {
  const showTabs = !state.overlay;
  document.querySelector(".screen")?.setAttribute("data-chrome", screenChrome());
  document.getElementById("app").innerHTML = `<div class="root">
    ${mainView()}
    ${showTabs ? tabbar() : ""}
    ${popoverHtml()}
    ${sheetHtml()}
    ${transitionHtml()}
    ${state.toast ? `<div class="toast" role="status">${esc(state.toast)}</div>` : ""}
  </div>`;
  const partner = currentPartnerName();
  const nameEl = document.querySelector(".practice-name");
  if (nameEl) nameEl.textContent = partner || "someone";
  window.emberSyncAvatar?.();
  const thread = document.querySelector(".thread");
  if (thread) thread.scrollTop = thread.scrollHeight;
  const scroller = document.querySelector(".detail-scroll");
  if (scroller) {
    scroller.addEventListener("scroll", () => {
      if (!state.showShieldHint || scroller.scrollTop < 12) return;
      state.showShieldHint = false;
      document.querySelector(".shield-hint")?.remove();
    });
  }
}

function removeFromDeck(id) {
  state.deck = state.deck.filter((item) => item !== id);
}

function commitPass(id) {
  removeFromDeck(id);
  state.likesIn = state.likesIn.filter((item) => item !== id);
  if (!state.passes.includes(id)) state.passes.push(id);
  state.history.push({ id, action: "pass" });
}

function commitLike(id, action) {
  const profile = byId[id];
  const matched = !state.matches.includes(id) && (profile.mutual || state.likesIn.includes(id));
  removeFromDeck(id);
  state.passes = state.passes.filter((item) => item !== id);
  state.likesIn = state.likesIn.filter((item) => item !== id);
  state.likesOut = state.likesOut.filter((item) => item !== id);
  if (matched) {
    if (!state.matches.includes(id)) state.matches.unshift(id);
    if (!state.messages[id]) state.messages[id] = [];
    if (state.unread[id] == null) state.unread[id] = 1;
    state.pendingMatch = id;
    state.overlay = "match";
  } else {
    state.likesOut.push(id);
    state.pendingMatch = null;
  }
  state.history.push({ id, action });
  return matched;
}

function likePerson(id, action) {
  if (!id || state.animating || id === me.id) return;
  const matched = commitLike(id, action);
  state.detailId = null;
  state.sheet = null;
  state.bell = false;
  if (!matched) state.overlay = null;
  render();
}

function passPerson(id) {
  if (!id || state.animating || id === me.id) return;
  commitPass(id);
  if (state.detailId === id) {
    state.overlay = null;
    state.detailId = null;
  }
  state.sheet = null;
  render();
}

function fling(dir) {
  if (state.animating || state.overlay) return;
  const id = state.deck[0];
  const card = document.querySelector(".swipe-card.top");
  if (!id || !card) return;
  state.animating = true;
  card.style.transition = "transform .28s ease-in";
  card.style.transform = dir === "left"
    ? "translateX(-140%) rotate(-16deg)"
    : dir === "super"
      ? "translateY(-130%) rotate(-6deg)"
      : "translateX(140%) rotate(16deg)";
  const stamp = card.querySelector(dir === "left" ? ".stamp.nope" : dir === "super" ? ".stamp.super" : ".stamp.like");
  if (stamp) stamp.style.opacity = "1";
  setTimeout(() => {
    state.animating = false;
    if (dir === "left") passPerson(id);
    else likePerson(id, dir === "super" ? "super" : "like");
  }, 280);
}

function openDetail(id) {
  if (!person(id)) return;
  state.detailId = id;
  state.overlay = "detail";
  state.bell = false;
  state.sheet = null;
  state.sheetId = id;
  render();
}

function openChat(id) {
  state.chatId = id;
  state.overlay = "chat";
  state.tab = "messages";
  state.unread[id] = 0;
  state.sheet = null;
  state.sheetId = id;
  state.bell = false;
  render();
}

function rewind() {
  if (state.animating) return;
  const last = state.history.pop();
  if (!last) {
    showToast("Nothing to rewind");
    return;
  }
  const { id } = last;
  state.matches = state.matches.filter((item) => item !== id);
  state.likesOut = state.likesOut.filter((item) => item !== id);
  state.passes = state.passes.filter((item) => item !== id);
  state.blocked = state.blocked.filter((item) => item !== id);
  if (state.pendingMatch === id) state.pendingMatch = null;
  if (INITIAL_LIKES.includes(id) && !state.likesIn.includes(id)) state.likesIn.push(id);
  if (state.messages[id] && state.messages[id].length === 0) delete state.messages[id];
  delete state.unread[id];
  if (!state.deck.includes(id)) state.deck.unshift(id);
  state.overlay = null;
  state.tab = "discover";
  render();
}

function recycle() {
  state.deck = DECK_IDS.filter((id) => !state.matches.includes(id) && !state.blocked.includes(id));
  state.passes = state.passes.filter((id) => !state.deck.includes(id));
  state.likesOut = state.likesOut.filter((id) => !state.deck.includes(id));
  if (!state.deck.length) showToast("You're all caught up");
  else render();
}

function closeSheet() {
  state.sheet = null;
  document.querySelector(".sheet-backdrop")?.remove();
}

const handlers = {
  tab(btn) {
    state.tab = btn.dataset.tab;
    state.overlay = null;
    state.bell = false;
    state.sheet = null;
    render();
  },
  "toggle-bell"() {
    state.bell = !state.bell;
    render();
  },
  "open-detail"(btn) { openDetail(btn.dataset.id || state.deck[0]); },
  "open-chat"(btn) { openChat(btn.dataset.id); },
  back() {
    state.overlay = null;
    state.sheet = null;
    state.pendingMatch = null;
    render();
  },
  like(btn) {
    if (btn.dataset.id) likePerson(btn.dataset.id, "like");
    else fling("right");
  },
  super(btn) {
    if (btn.dataset.id) likePerson(btn.dataset.id, "super");
    else fling("super");
  },
  nope(btn) {
    if (btn.dataset.id) passPerson(btn.dataset.id);
    else fling("left");
  },
  rewind,
  boost() { showToast("You're at the top for 30 minutes"); },
  recycle,
  filter(btn) {
    state.looking = btn.dataset.value;
    render();
  },
  "exit-practice"() { window.emberStopIntro?.(); },
  "enter-practice"() { document.querySelector(".practice-jump")?.click(); },
  "open-sheet"() {
    state.sheet = "menu";
    state.sheetId = state.overlay === "chat" ? state.chatId : (state.detailId && state.detailId !== me.id ? state.detailId : state.deck[0]);
    render();
  },
  "close-sheet": closeSheet,
  "dismiss-hint"() {
    state.showShieldHint = false;
    document.querySelector(".shield-hint")?.remove();
  },
  share() {
    const p = person(state.sheetId);
    const text = `${p.name}, ${p.age} on Tindr`;
    navigator.clipboard?.writeText(text).catch(() => {});
    closeSheet();
    showToast("Profile link copied");
  },
  block() {
    const id = state.sheetId;
    state.sheet = null;
    if (id && id !== me.id) {
      removeFromDeck(id);
      state.likesIn = state.likesIn.filter((item) => item !== id);
      state.matches = state.matches.filter((item) => item !== id);
      if (!state.blocked.includes(id)) state.blocked.push(id);
      state.history.push({ id, action: "block" });
    }
    state.overlay = null;
    render();
    showToast("Blocked");
  },
  report() {
    state.sheet = "report";
    render();
  },
  "submit-report"() {
    const id = state.sheetId;
    state.sheet = null;
    if (id && id !== me.id) {
      removeFromDeck(id);
      state.likesIn = state.likesIn.filter((item) => item !== id);
      state.matches = state.matches.filter((item) => item !== id);
      if (!state.passes.includes(id)) state.passes.push(id);
      state.history.push({ id, action: "pass" });
    }
    state.overlay = null;
    render();
    showToast("Report submitted");
  },
  "keep-swiping"() {
    state.overlay = null;
    state.pendingMatch = null;
    state.tab = "discover";
    render();
  },
};

function sendChat() {
  const input = document.querySelector(".composer input");
  const text = input?.value.trim();
  if (!text || !state.chatId) return;
  if (!state.messages[state.chatId]) state.messages[state.chatId] = [];
  state.messages[state.chatId].push({ from: "me", text, time: "Now" });
  render();
}

function sendMatch() {
  const input = document.querySelector(".match-input");
  const text = input?.value.trim();
  const id = state.pendingMatch;
  if (!text) {
    showToast("Write a quick hello");
    return;
  }
  if (!state.messages[id]) state.messages[id] = [];
  state.messages[id].push({ from: "me", text, time: "Now" });
  state.unread[id] = 0;
  state.pendingMatch = null;
  state.chatId = id;
  state.tab = "messages";
  state.overlay = "chat";
  render();
}

function onClick(event) {
  if (suppressClick) {
    suppressClick = false;
    return;
  }
  if (event.target.closest("[data-sheet]")) event.stopPropagation();
  const btn = event.target.closest("[data-action]");
  if (!btn) {
    if (state.bell) {
      state.bell = false;
      render();
    }
    return;
  }
  if (btn.closest(".sheet-backdrop") && btn.dataset.action === "close-sheet" && event.target.closest("[data-sheet]")) return;
  const action = btn.dataset.action;
  if (state.bell && action !== "toggle-bell") state.bell = false;
  handlers[action]?.(btn, event);
}

function onSubmit(event) {
  event.preventDefault();
  if (event.target.dataset.action === "send-chat") sendChat();
  if (event.target.dataset.action === "send-match") sendMatch();
}

function onPointerDown(event) {
  const card = event.target.closest(".swipe-card.top");
  if (!card || state.animating || state.overlay) return;
  if (event.target.closest("button, input, a")) return;
  event.preventDefault();
  card.setPointerCapture?.(event.pointerId);
  gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, dy: 0, card };
}

function onPointerMove(event) {
  if (!gesture || event.pointerId !== gesture.id) return;
  gesture.dx = event.clientX - gesture.x;
  gesture.dy = event.clientY - gesture.y;
  const { card, dx, dy } = gesture;
  card.style.transition = "none";
  card.style.transform = `translate(${dx}px, ${dy * 0.12}px) rotate(${dx / 18}deg)`;
  const like = card.querySelector(".stamp.like");
  const nope = card.querySelector(".stamp.nope");
  if (like) like.style.opacity = dx > 0 ? String(Math.min(1, dx / 110)) : "0";
  if (nope) nope.style.opacity = dx < 0 ? String(Math.min(1, -dx / 110)) : "0";
  const next = document.querySelector(".swipe-card.next");
  if (next) {
    const progress = Math.min(1, Math.abs(dx) / 140);
    next.style.transform = `scale(${0.96 + progress * 0.04})`;
  }
}

function onPointerUp(event) {
  if (!gesture || event.pointerId !== gesture.id) return;
  const { card, dx, dy } = gesture;
  gesture = null;
  suppressClick = true;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  if (absX < 12 && absY < 12) {
    card.style.transition = "";
    card.style.transform = "";
    openDetail(state.deck[0]);
    return;
  }
  if (dy < -90 && absY > absX) {
    card.style.transition = "transform .2s ease";
    card.style.transform = "";
    openDetail(state.deck[0]);
    return;
  }
  if (dx > 110) return fling("right");
  if (dx < -110) return fling("left");
  card.style.transition = "transform .22s ease";
  card.style.transform = "";
  const next = document.querySelector(".swipe-card.next");
  if (next) next.style.transform = "";
}

function onKey(event) {
  const typing = document.activeElement && ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
  if (event.key === "Escape") {
    if (state.sheet) { closeSheet(); return; }
    if (state.bell) { state.bell = false; render(); return; }
    if (state.overlay) { state.overlay = null; state.pendingMatch = null; render(); }
    return;
  }
  if (typing || state.overlay || state.sheet || state.tab !== "discover") return;
  if (event.key === "ArrowLeft") { event.preventDefault(); fling("left"); }
  if (event.key === "ArrowRight") { event.preventDefault(); fling("right"); }
  if (event.key === "ArrowUp") { event.preventDefault(); if (state.deck[0]) openDetail(state.deck[0]); }
  if (event.key === "ArrowDown") { event.preventDefault(); fling("super"); }
}

const app = document.getElementById("app");
app.addEventListener("click", onClick);
app.addEventListener("submit", onSubmit);
app.addEventListener("pointerdown", onPointerDown);
app.addEventListener("pointermove", onPointerMove);
app.addEventListener("pointerup", onPointerUp);
app.addEventListener("pointercancel", onPointerUp);
document.addEventListener("keydown", onKey);
window.addEventListener("pageshow", (event) => {
  if (event.persisted) sessionStorage.removeItem("tindr-return");
});
restoreReturn();
render();
