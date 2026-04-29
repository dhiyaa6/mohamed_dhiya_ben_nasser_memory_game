const LEVELS = {
  easy: {
    folder: 'images',
    cards: ['img1.png','img2.png','img3.png','img4.png',
            'img5.png','img6.png','img7.png'],
    pairs: 7
  },
  medium: {
    folder: 'images1',
    cards: ['img1.png','img2.png','img3.png','img4.png','img5.png',
            'img6.png','img7.png','img8.png','img9.png','img10.png',
            'img11.png','img12.png'],
    pairs: 12
  },
  hard: {
    folder: 'images2',
    cards: ['img1.png','img2.png','img3.png','img4.png','img5.png','img6.png',
            'img7.png','img8.png','img9.png','img10.png','img11.png','img12.png',
            'img13.png','img14.png','img15.png','img16.png','img17.png','img18.png'],
    pairs: 18
  }
};
const SPECIAL_CARDS = [
  { id: 'joker',   emoji: '🃏', label: '🃏 Joker !',   desc: 'Toutes les cartes révélées !' },
  { id: 'hint',    emoji: '🔍', label: '🔍 Indice !',  desc: 'Une paire révélée !'           },
  { id: 'shuffle', emoji: '🔀', label: '🔀 Shuffle !', desc: 'Les cartes sont mélangées !'   }
];
let currentLevel  = 'easy';
let cardsArray    = [];
let firstCard     = null;
let secondCard    = null;
let lockBoard     = false;
let score         = 0;
let moves         = 0;
let matchCount    = 0;
let seconds       = 0;
let timerInterval = null;
let timerStarted  = false;
const board = document.getElementById('game-board');
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  container.innerHTML = '';
  const colors = ['#f5c842','#7c5cbf','#00c9a7','#e94560','#e84393','#3a86ff'];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const sz = (Math.random() * 3 + 1.5) + 'px';
    p.style.cssText = `
      left:${Math.random()*100}%;
      width:${sz}; height:${sz};
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*14+8}s;
      animation-delay:${Math.random()*10}s;
    `;
    container.appendChild(p);
  }
}
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTone(freq, type = 'sine', dur = 0.15, vol = 0.28) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
}
function soundFlip()    { playTone(510, 'sine', 0.1, 0.16); }
function soundFail()    { playTone(200, 'sawtooth', 0.12, 0.16); setTimeout(()=>playTone(170,'sawtooth',0.14,0.12),100); }
function soundMatch()   {
  [523,659,784,1046].forEach((f,i) => setTimeout(()=>playTone(f,'sine',0.15,0.26), i*110));
}
function soundSpecial() {
  [880,1046,1318,1568].forEach((f,i) => setTimeout(()=>playTone(f,'sine',0.12,0.36), i*85));
}
function soundHint()    {
  [440,554,659,554,659].forEach((f,i) => setTimeout(()=>playTone(f,'triangle',0.14,0.28), i*95));
}
function soundWin() {
  [523,587,659,784,880,987,1046,987,880,1046,1175].forEach((f,i) =>
    setTimeout(()=>playTone(f,'sine',0.2,0.26), i*80)
  );
}
// ─── MUSIQUE DE FOND PAR NIVEAU (fichiers de votre choix) ───────────────────
// Placez vos fichiers dans le même dossier que index.html :
//   music_easy.mp3   → niveau Facile
//   music_medium.mp3 → niveau Moyen
//   music_hard.mp3   → niveau Difficile
const LEVEL_MUSIC = {
  easy:   'music_easy.mp3',
  medium: 'music_medium.mp3',
  hard:   'music_hard.mp3'
};
let bgAudio  = null;
let bgMuted  = false;

function startBgMusic() {
  if (bgAudio) { bgAudio.pause(); bgAudio.currentTime = 0; }
  bgAudio = new Audio(LEVEL_MUSIC[currentLevel]);
  bgAudio.loop   = true;
  bgAudio.volume = bgMuted ? 0 : 0.5;
  bgAudio.play().catch(() => {});
}
function stopBgMusic() {
  if (!bgAudio) return;
  bgAudio.pause();
  bgAudio.currentTime = 0;
}
function toggleMusic() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  bgMuted = !bgMuted;
  if (bgAudio) bgAudio.volume = bgMuted ? 0 : 0.5;
  const btn = document.getElementById('music-btn');
  btn.textContent = bgMuted ? '🔇' : '🔊';
  btn.classList.toggle('muted', bgMuted);
}
function startTimer() {
  if (timerStarted) return;
  timerStarted = true;
  timerInterval = setInterval(() => { seconds++; updateTimerDisplay(); }, 1000);
}
function stopTimer() { clearInterval(timerInterval); }
function updateTimerDisplay() {
  const m = String(Math.floor(seconds / 60)).padStart(2,'0');
  const s = String(seconds % 60).padStart(2,'0');
  document.getElementById('timer').innerText = `${m}:${s}`;
}
function formatTime(t) {
  const m = Math.floor(t/60), s = t%60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}
const MIN_MOVES = { easy: 10, medium: 15, hard: 21 };
function getBest() {
  const val = localStorage.getItem(`best_${currentLevel}`);
  if (!val) return null;
  const n = parseInt(val);
  if (isNaN(n) || n < MIN_MOVES[currentLevel]) {
    localStorage.removeItem(`best_${currentLevel}`);
    return null;
  }
  return n;
}
function saveBest(n) {
  const p = getBest();
  if (!p || n < parseInt(p)) localStorage.setItem(`best_${currentLevel}`, n);
}
function updateBestDisplay() {
  const b = getBest();
  document.getElementById('best-score').innerText = b ? b + ' coups' : '--';
}
function showNotif(type, text) {
  const el = document.getElementById('special-notif');
  el.textContent = text;
  el.className = `special-notif ${type}`;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.add('hidden'), 2400);
}
function setDifficulty(level, btn) {
  currentLevel = level;
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  board.className = level;
  updateBestDisplay();
  resetGame();
}
function buildBoard() {
  board.innerHTML = '';
  board.className = currentLevel;
  const level = LEVELS[currentLevel];

  let imgs = [...level.cards, ...level.cards];
  SPECIAL_CARDS.forEach(s => imgs.push(`special_${s.id}`, `special_${s.id}`));
  cardsArray = imgs.sort(() => 0.5 - Math.random());

  cardsArray.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    if (value.startsWith('special_')) {
      const type = value.replace('special_', '');
      const spec = SPECIAL_CARDS.find(s => s.id === type);
      card.classList.add('special', type);
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back">${spec.emoji}</div>
        </div>`;
    } else {
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back">
            <img src="${level.folder}/${value}" alt="carte" loading="lazy"/>
          </div>
        </div>`;
    }
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}
function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains('matched')) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  if (!timerStarted) { startTimer(); startBgMusic(); }

  soundFlip();
  this.classList.add('flip');

  if (!firstCard) { firstCard = this; return; }
  secondCard = this;
  checkMatch();
}

function checkMatch() {
  moves++;
  document.getElementById('moves').innerText = moves;
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    score++;
    matchCount++;
    document.getElementById('score').innerText = score;
    const val = firstCard.dataset.value;

    if (val.startsWith('special_')) {
      const type = val.replace('special_', '');
      firstCard.classList.add('matched','special-used');
      secondCard.classList.add('matched','special-used');
      soundSpecial();
      setTimeout(() => activateSpecial(type), 400);
    } else {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      soundMatch();
    }
    resetCards();

    const total = LEVELS[currentLevel].pairs + SPECIAL_CARDS.length;
    if (matchCount === total) { stopTimer(); stopBgMusic(); setTimeout(showWinScreen, 700); }

  } else {
    soundFail();
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetCards();
    }, 1000);
  }
}

function resetCards() { [firstCard, secondCard] = [null, null]; lockBoard = false; }
function activateSpecial(type) {
  if (type === 'joker')   activateJoker();
  if (type === 'hint')    activateHint();
  if (type === 'shuffle') activateShuffle();
}
function activateJoker() {
  showNotif('joker', '🃏 Joker — Toutes les cartes révélées !');
  lockBoard = true;
  const unmatched = document.querySelectorAll('.card:not(.matched)');
  unmatched.forEach(c => c.classList.add('flip'));
  setTimeout(() => {
    unmatched.forEach(c => { if (!c.classList.contains('matched')) c.classList.remove('flip'); });
    lockBoard = false;
  }, 2200);
}
function activateHint() {
  showNotif('hint', '🔍 Indice — Une paire révélée !');
  soundHint();
  lockBoard = true;
  const unmatched = Array.from(document.querySelectorAll('.card:not(.matched):not(.flip)'));
  const valueMap  = {};
  let pair = null;

  for (const card of unmatched) {
    const v = card.dataset.value;
    if (v.startsWith('special_')) continue;
    if (valueMap[v]) { pair = [valueMap[v], card]; break; }
    else valueMap[v] = card;
  }

  if (pair) {
    pair.forEach(c => {
      c.classList.add('flip');
      c.style.outline = '2px solid #e84393';
    });
    setTimeout(() => {
      pair.forEach(c => {
        if (!c.classList.contains('matched')) c.classList.remove('flip');
        c.style.outline = '';
      });
      lockBoard = false;
    }, 1800);
  } else {
    lockBoard = false;
  }
}
function activateShuffle() {
  showNotif('shuffle', '🔀 Shuffle — Les cartes sont mélangées !');
  lockBoard = true;
  const cells     = Array.from(board.children);
  const unmatched = cells.filter(c => !c.classList.contains('matched'));
  const values    = unmatched.map(c => c.dataset.value).sort(() => 0.5 - Math.random());

  unmatched.forEach(card => {
    card.style.transition = 'opacity .3s, transform .3s';
    card.style.opacity    = '0';
    card.style.transform  = 'scale(.8)';
  });

  setTimeout(() => {
    unmatched.forEach((card, i) => {
      const nv = values[i];
      card.dataset.value = nv;
      if (nv.startsWith('special_')) {
        const t    = nv.replace('special_','');
        const spec = SPECIAL_CARDS.find(s => s.id === t);
        card.className = `card special ${t}`;
        card.innerHTML = `<div class="card-inner"><div class="card-front"></div><div class="card-back">${spec.emoji}</div></div>`;
      } else {
        card.className = 'card';
        card.innerHTML = `<div class="card-inner"><div class="card-front"></div><div class="card-back"><img src="${LEVELS[currentLevel].folder}/${nv}" alt="carte" loading="lazy"/></div></div>`;
      }
      card.addEventListener('click', flipCard);
      card.style.opacity   = '1';
      card.style.transform = 'scale(1)';
    });
    lockBoard = false;
  }, 420);
}
function showWinScreen() {
  soundWin();
  saveBest(moves);
  updateBestDisplay();
  document.getElementById('win-moves').innerText = moves;
  document.getElementById('win-time').innerText  = formatTime(seconds);
  document.getElementById('win-score').innerText = score;
  document.getElementById('win-screen').classList.remove('hidden');
}
function resetGame() {
  document.getElementById('win-screen').classList.add('hidden');
  document.getElementById('special-notif') && document.getElementById('special-notif').classList.add('hidden');
  firstCard = secondCard = null;
  lockBoard = false;
  score = moves = matchCount = 0;
  timerStarted = false;
  document.getElementById('score').innerText = '0';
  document.getElementById('moves').innerText = '0';
  stopTimer(); stopBgMusic();
  seconds = 0;
  updateTimerDisplay();
  buildBoard();
}
initParticles();
updateBestDisplay();
buildBoard();
