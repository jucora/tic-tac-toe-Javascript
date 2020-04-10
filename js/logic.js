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

let row = null;
let winner = false;
let game = false;
let info = document.querySelector("#info");
var getUser = new getUserInfo();

//FUNCTIONS

function getUserInfo() {
  start();
  this.render = function (dialog) {
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById("dialogoverlay");
    var dialogbox = document.getElementById("dialogbox");
    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH + "px";
    dialogbox.style.left = winW / 2 - 550 * 0.5 + "px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    document.getElementById("dialogboxhead").innerHTML =
      "Welcome to the Tic Tac Toe Game!";
    document.getElementById("dialogboxbody").innerHTML = dialog;
    document.getElementById("dialogboxfoot").innerHTML =
      '<button onclick="getUser.ok()" onmousedown = "hereWeGo.play()" onmouseup = "monkey.play()">OK</button>';
  };
  this.ok = function () {
    document.getElementById("dialogbox").style.display = "none";
    document.getElementById("dialogoverlay").style.display = "none";
  };
}

function start() {
  game = true;
  document.querySelector("body").classList.add("level1");
  info.textContent = `${currentPlayer.name} is playing!`;
  row = document.createElement("div");
  row.classList.add("row");
  for (let i = 0; i < board.cells.length; i++) {
    let cell = document.createElement("div");
    cell.classList.add("col-4", "cell");
    cell.setAttribute("onmousedown", "whoopie.play()");
    row.appendChild(cell);
  }
  document.querySelector(".container").appendChild(row);
}

function checkWinner(currentPlayer, index) {
  let opt = board.cells;
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
    setTimeout(() => {
      wow.play();
    }, 500);
  }
}

//EVENT LISTENERS
document.addEventListener(
  "DOMContentLoaded",
  getUser.render("Please provide the next info")
);

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
        checkWinner(currentPlayer);
        currentPlayer = player1;
      }
    }
    if (!winner) {
      info.textContent = `${currentPlayer.name} is Playing!`;
    }
  });
});
