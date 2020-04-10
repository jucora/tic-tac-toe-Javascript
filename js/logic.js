//MODULE
const gameBoard = (() => {
  const cells = ["", "", "", "", "", "", "", "", ""];
  const level2 = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];

  return { cells, level2 };
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
let level = 1;
let row = null;
let winner = false;
let info = document.querySelector("#info");

//FUNCTIONS
function printBoard(board) {
  console.log(board);
  document.querySelector(".container").innerHTML = "";
  info.textContent = `${currentPlayer.name} is playing!`;
  for (let i = 0; i < level; i++) {
    container = document.createElement("div");
    container.setAttribute("class", "board-container");

    for (let i = 0; i < board.length; i++) {
      let cell = document.createElement("div");
      cell.classList.add("col-4", "cell");
      cell.setAttribute("onmousedown", "whoopie.play()");
      container.appendChild(cell);
    }
    document.querySelector(".container").appendChild(container);
  }
}

function start() {
  if (level === 1) {
    document.querySelector("body").classList.add("level1");
    printBoard(board.cells);
  } else if (level === 2) {
    document.querySelector("body").classList.remove("level1");
    document.querySelector("body").classList.add("level2");
    document.querySelector(".board-container").classList.add("half");
    printBoard(board.level2);
  }
}

function checkLevel() {
  if (level === 1) {
    level += 1;
    start();
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
    checkLevel();
  }
}

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", start());

document.querySelectorAll(".cell").forEach(function (cell, index) {
  cell.addEventListener("click", function () {
    if (cell.textContent === "") {
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
