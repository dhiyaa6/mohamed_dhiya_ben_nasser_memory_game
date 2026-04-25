const board = document.getElementById("game-board");
let cardsArray = ["🍎","🍌","🍇","🍓","🍒","🍍","🥝","🍉"];
cardsArray = [...cardsArray, ...cardsArray]; 
cardsArray.sort(() => 0.5 - Math.random());
let firstCard = null;
let secondCard = null;
let lockBoard = false;
cardsArray.forEach((emoji) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = emoji;
  card.innerText = "";
  card.addEventListener("click", flipCard);
  board.appendChild(card);
});
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.innerText = this.dataset.value;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    resetCards();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.innerText = "";
      secondCard.innerText = "";

      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      resetCards();
    }, 800);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}