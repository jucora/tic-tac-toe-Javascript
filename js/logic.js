//MODULE
const gameBoard = (() => {
  const cells = ["", "", "", "", "", "", "", "", ""];
  return { cells };
})();

//FACTORY FUNCTIONS
const player = (name, character) => {
  return { name, character };
};

const control = () => {
  [];
};

//VARIABLES

const character = ["😁", "😎", "💩", "😝"];
const player1 = player("Julian", character[0]);
const player2 = player("Ana", character[1]);
const board = gameBoard;
let currentPlayer = player1;
let cell = null;
let row = null;
let winner = false;
let info = document.querySelector("#info");
let game = false;

//FUNCTIONS

function start() {
  game = true;
  info.textContent = `${currentPlayer.name} is playing!`;
  row = document.querySelector(".row");
  for (const cell of board.cells) {
    let squareFront = document.createElement("div");

    squareFront.classList.add("col-4", "cell");
    squareFront.setAttribute("onmousedown", "whoopie.play()");
    row.appendChild(squareFront);
  }
}

function checkWinner(currentPlayer, index) {
  let opt = board.cells;

  console.log(currentPlayer);
  let symbol = currentPlayer.character;
  if (
    (opt[0] === opt[1] && opt[1] === opt[2] && opt[0] === symbol) ||
    (opt[3] === opt[4] && opt[4] === opt[5] && opt[3] === symbol) ||
    (opt[6] === opt[7] && opt[7] === opt[8] && opt[6] === symbol) ||
    (opt[0] === opt[3] && opt[3] === opt[6] && opt[0] === symbol) ||
    (opt[1] === opt[4] && opt[4] === opt[7] && opt[1] === symbol) ||
    (opt[2] === opt[5] && opt[5] === opt[8] && opt[2] === symbol) ||
    (opt[0] === opt[4] && opt[4] === opt[8] && opt[0] === symbol) ||
    (opt[2] === opt[4] && opt[4] === opt[6] && opt[2] === symbol)
  ) {
    info.textContent = `${currentPlayer.name} is the winner`;

    winner = true;
    game = false;
  }
}

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", start());

document.querySelectorAll(".cell").forEach(function (cell, index) {
  cell.addEventListener("click", function () {
    if (cell.textContent === "" && game) {
      board.cells[index] = currentPlayer.character;
      if (currentPlayer === player1) {
        cell.textContent = currentPlayer.character;
        checkWinner(currentPlayer);
        currentPlayer = player2;
      } else {
        cell.textContent = currentPlayer.character;
        checkWinner(currentPlayer, index);
        currentPlayer = player1;
      }
    }
    if (!winner) {
      info.textContent = `${currentPlayer.name} is Playing!`;
    }
  });
});
