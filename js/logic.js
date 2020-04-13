const gameBoard = (() => {
  const cells = ["", "", "", "", "", "", "", "", ""];
  return { cells };
})();

const player = (name, character) => {
  return { name, character };
};

const control = () => {
  [];
};

const character = ["😁", "😎", "💩", "😝"];
let player1 = "";
let player2 = player("julian", character[0]);
const board = gameBoard;
let currentPlayer = "";

let row = null;
let winner = false;
let game = false;
let info = document.querySelector("#info");
let restart = document.querySelector(".restart");

function initialBox() {
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
}

function gameMode() {
  start();
  this.render = (dialog) => {
    initialBox();
    document.getElementById("dialogboxbody").innerHTML =
      "<h2 id='nameInputTitle'>" + dialog + "</h2>";
    document.getElementById("dialogboxbody").innerHTML +=
      '<br><button id="mode1" class = "btn btn-primary"> Player vs Computer</button>';
    document.getElementById("dialogboxbody").innerHTML +=
      '<br><button id="mode2" class = "btn btn-primary"> Player vs Player</button>';
  };
}

function checkInput(name, index) {
  if (name === "") {
    document.getElementById("nameInputTitle").textContent =
      "Name can't be empty!";
    document.getElementById("prompt_value1").style.background = "#F78070";
  } else if (index < 1 || index > 4 || index === "") {
    document.getElementById("selectCharacterTitle").textContent =
      "Please select a valid character between 1 to 4";
    document.getElementById("prompt_value2").style.background = "#F78070";
  } else {
    player1 = player(name, character[index - 1]);
    document.getElementById("dialogbox").style.display = "none";
    document.getElementById("dialogoverlay").style.display = "none";
    hereWeGo.play();
    setTimeout(() => {
      monkey.play();
    }, 1000);
    currentPlayer = player1;
  }
}

const start = () => {
  game = true;
  document.querySelector("body").classList.add("level1");
  info.textContent = `${currentPlayer.name} is playing!`;
  restart.textContent = "Restart Game";
  row = document.createElement("div");
  row.classList.add("row");
  for (let i = 0; i < board.cells.length; i++) {
    let cell = document.createElement("div");
    cell.classList.add("col-4", "cell");
    cell.setAttribute("onmousedown", "whoopie.play()");
    row.appendChild(cell);
  }
  document.querySelector(".container").appendChild(row);
};

function getSingleUserInfo() {
  this.render = (dialog, func) => {
    initialBox();
    document.getElementById("dialogboxbody").innerHTML =
      "<h2 id='nameInputTitle'>" + dialog + "</h2>";
    document.getElementById("dialogboxbody").innerHTML +=
      '<br><input id="prompt_value1" class = "form-control">';
    document.getElementById("dialogboxbody").innerHTML +=
      "<br><h2 id='selectCharacterTitle'>Please select your character</h2><h2>" +
      " 1)" +
      character[0] +
      " 2)" +
      character[1] +
      " 3)" +
      character[2] +
      " 4)" +
      character[3] +
      "</h2>" +
      "<input id='prompt_value2'class = 'form-control'>";

    document.getElementById("dialogboxfoot").innerHTML =
      "<button class = 'btn btn-primary form-control' onclick=\"singleUserInfo.ok('" +
      func +
      "')\">OK";
  };
  this.ok = (func) => {
    var prompt_value1 = document.getElementById("prompt_value1").value;
    var prompt_value2 = document.getElementById("prompt_value2").value;
    window[func](prompt_value1, prompt_value2);
  };
}

const gameType = new gameMode();
const singleUserInfo = new getSingleUserInfo();

const checkWinner = (currentPlayer) => {
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
    if (symbol != "") {
      info.textContent = `${currentPlayer.name} is the winner`;
      winner = true;
      game = false;
      setTimeout(() => {
        wow.play();
      }, 500);
      console.log(board.cells);
    }
  }
};

//listeners

document.addEventListener(
  "DOMContentLoaded",
  gameType.render("Please select the game mode")
);

document.querySelector("#mode1").addEventListener("click", function () {
  singleUserInfo.render("Your name", "checkInput");
});
document.querySelector("#mode2").addEventListener("click", function () {});

document.querySelectorAll(".cell").forEach((cell, index) => {
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

document.querySelector(".restart").addEventListener("click", function () {
  document.querySelector(".row").innerHTML = "";
  board.cells = ["", "", "", "", "", "", "", "", ""];
  //SOLUCIONAR
});
