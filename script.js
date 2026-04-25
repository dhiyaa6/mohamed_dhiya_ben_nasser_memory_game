const board = document.getElementById("game-board");


let cardsArray = [
  "img1.png","img2.png","img3.png","img4.png",
  "img5.png","img6.png","img7.png","img8.png"
];

cardsArray = [...cardsArray, ...cardsArray];
cardsArray.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let score = 0;
let moves = 0;

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

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

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
    resetCards();
  } else {
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