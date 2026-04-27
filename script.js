const board = document.getElementById("game-board");
let cardsArray = [
  "img1.png","img2.png","img3.png","img4.png",
  "img5.png","img6.png","img7.png","img8.png"
];
cardsArray = [...cardsArray, ...cardsArray];
cardsArray.sort(() => 0.5 - Math.random());
let firstCard  = null;
let secondCard = null;
let lockBoard  = false;
let score = 0;
let moves = 0;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(freq, type = 'sine', duration = 0.15, volume = 0.3) {
  const osc  = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type            = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}
function soundFlip()  { playSound(440, 'sine', 0.12, 0.2); }
function soundMatch() {
  playSound(523, 'sine', 0.15, 0.3);
  setTimeout(() => playSound(659, 'sine', 0.15, 0.3), 120);
  setTimeout(() => playSound(784, 'sine', 0.2,  0.3), 240);
}
function soundFail()  { playSound(200, 'triangle', 0.25, 0.2); }
function buildBoard() {
  board.innerHTML = '';
  cardsArray.forEach((img) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">
          <img src="images/${img}" />
        </div>
      </div>
    `;

    card.dataset.value = img;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}
buildBoard(); 
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  soundFlip();
  this.classList.add("flip");
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  checkMatch();
}
function checkMatch() {
  moves++;
  document.getElementById("moves").innerText = moves;
 let isMatch = firstCard.dataset.value === secondCard.dataset.value;
 if (isMatch) {
    score++;
    document.getElementById("score").innerText = score;
    soundMatch();
    resetCards();
  } else {
    soundFail();
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
function resetGame() {
  firstCard  = null;
  secondCard = null;
  lockBoard  = false;
  score      = 0;
  moves      = 0;
  document.getElementById("score").innerText = "0";
  document.getElementById("moves").innerText = "0";
  cardsArray.sort(() => 0.5 - Math.random());
  buildBoard();
}
