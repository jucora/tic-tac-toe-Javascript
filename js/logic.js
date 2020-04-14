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
let player2 = "";
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
  this.render = (dialog) => {
    initialBox();
    document.getElementById("dialogboxbody").innerHTML =
      "<h2 id='nameInputTitle'>" + dialog + "</h2>";
    document.getElementById("dialogboxbody").innerHTML +=
      '<br><button id="mode1" class = "btn btn-primary"> Player vs Computer</button>';
    document.getElementById("dialogboxbody").innerHTML +=
      '<br><button id="mode2" class = "btn btn-primary"> Player vs Player</button>';

    document.querySelector("#mode1").addEventListener("click", function () {
      singleUserInfo.render("Your name", "checkInputSinglePlayer");
    });
    document.querySelector("#mode2").addEventListener("click", function () {
      doubleUsersInfo.render("Player ", "checkInputTwoPlayers");
    });
  };
}

function restartGame() {
  if (document.querySelector(".cells")) {
    document.querySelector(".cells").remove();
    board.cells = ["", "", "", "", "", "", "", "", ""];
  }
}

function checkInputSinglePlayer(name, index) {
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
    player2 = player("Computer", "😈");
    document.getElementById("dialogbox").style.display = "none";
    document.getElementById("dialogoverlay").style.display = "none";
    hereWeGo.play();
    setTimeout(() => {
      monkey.play();
    }, 1000);
    currentPlayer = player1;
    restartGame();
    start();
  }
}

function checkInputTwoPlayers(name1, character1, name2, character2) {
  if (name1 === "" || name2 === "") {
    if (name1 === "") {
      document.querySelector(".namePlayerOneTitle").textContent =
        "Name can't be empty!";
      document.querySelector("#playerOneName").style.background = "#F78070";
    } else if (name2 === "") {
      document.querySelector(".namePlayerTwoTitle").textContent =
        "Name can't be empty!";
      document.querySelector("#playerTwoName").style.background = "#F78070";
    }
  } else if (character1 < 1 || character1 > 4 || character1 === "") {
    document.getElementById("characterPlayerOneTitle").textContent =
      "Please select a valid character between 1 to 4";
    document.getElementById("characterPlayerOne").style.background = "#F78070";
  } else if (character2 < 1 || character2 > 4 || character2 === "") {
    document.getElementById("characterPlayerTwoTitle").textContent =
      "Please select a valid character between 1 to 4";
    document.getElementById("characterPlayerTwo").style.background = "#F78070";
  } else {
    player1 = player(name1, character[character1 - 1]);
    player2 = player(name2, character[character2 - 1]);
    document.getElementById("dialogbox").style.display = "none";
    document.getElementById("dialogoverlay").style.display = "none";
    hereWeGo.play();
    setTimeout(() => {
      monkey.play();
    }, 1000);
    currentPlayer = player1;
    restartGame();
    start();
  }
}

function isTie() {
  if (getEmptySpaces().length === 0) {
    info.textContent = "TIE: No winners this time!";
    document.querySelectorAll(".cell").forEach(function (cell) {
      cell.style.background = "green";
    });
    return true;
  } else {
    info.textContent = `${currentPlayer.name} is Playing!`;
    return false;
  }
}

const start = () => {
  game = true;
  document.querySelector("body").classList.add("level1");
  info.textContent = `${currentPlayer.name} is playing!`;
  restart.textContent = "Restart Game";
  row = document.createElement("div");
  row.classList.add("row", "cells");
  for (let i = 0; i < board.cells.length; i++) {
    let cell = document.createElement("div");
    cell.classList.add("col-4", "cell");
    cell.setAttribute("onmousedown", "whoopie.play()");
    row.appendChild(cell);
  }
  document.querySelector(".container").appendChild(row);

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
        isTie();
      }
    });
  });
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

function getDoubleUsersInfo() {
  this.render = (dialog, func) => {
    initialBox();
    document.getElementById("dialogboxbody").innerHTML =
      "<h2 class='namePlayerOneTitle'>" + dialog + "1 name </h2>";
    document.getElementById("dialogboxbody").innerHTML +=
      '<br><input id="playerOneName" class = "form-control">';
    document.getElementById("dialogboxbody").innerHTML +=
      "<br><h2 id='characterPlayerOneTitle'>Please select your character</h2><h2>" +
      " 1)" +
      character[0] +
      " 2)" +
      character[1] +
      " 3)" +
      character[2] +
      " 4)" +
      character[3] +
      "</h2>" +
      "<input id='characterPlayerOne'class = 'form-control'>";

    document.getElementById("dialogboxbody").innerHTML +=
      "<h2 class='namePlayerTwoTitle'>" + dialog + " 2 name</h2>";
    document.getElementById("dialogboxbody").innerHTML +=
      '<br><input id="playerTwoName" class = "form-control">';
    document.getElementById("dialogboxbody").innerHTML +=
      "<br><h2 id='characterPlayerTwoTitle'>Please select your character</h2><h2>" +
      " 1)" +
      character[0] +
      " 2)" +
      character[1] +
      " 3)" +
      character[2] +
      " 4)" +
      character[3] +
      "</h2>" +
      "<input id='characterPlayerTwo'class = 'form-control'>";

    document.getElementById("dialogboxfoot").innerHTML =
      "<button class = 'btn btn-primary form-control' onclick=\"doubleUsersInfo.ok('" +
      func +
      "')\">OK";
  };
  this.ok = (func) => {
    var playerOneName = document.getElementById("playerOneName").value;
    var playerOneCharacter = document.getElementById("characterPlayerOne")
      .value;
    var playerTwoName = document.getElementById("playerTwoName").value;
    var playerTwoCharacter = document.getElementById("characterPlayerTwo")
      .value;
    if (playerOneName === playerTwoName && playerOneName != "") {
      alert("Player's names should be different!");
    } else if (
      playerOneCharacter === playerTwoCharacter &&
      playerOneCharacter != ""
    ) {
      alert("Players can't have the same character");
    } else {
      window[func](
        playerOneName,
        playerOneCharacter,
        playerTwoName,
        playerTwoCharacter
      );
    }
  };
}

function getEmptySpaces() {
  let empty = [];
  for (let i = 0; i < board.cells.length; i++) {
    if (!board.cells[i]) {
      empty.push(i);
    }
  }
  return empty;
}

const gameType = new gameMode();
const singleUserInfo = new getSingleUserInfo();
const doubleUsersInfo = new getDoubleUsersInfo();

function setWinner(cell1, cell2, cell3) {
  let cells = document.querySelector(".cells");

  info.textContent = `${currentPlayer.name} is the winner`;
  winner = true;
  game = false;
  setTimeout(() => {
    laugh.play();
  }, 500);
  cells.children[cell1].style.background = "green";
  cells.children[cell2].style.background = "green";
  cells.children[cell3].style.background = "green";
  return true;
}

const checkWinner = (currentPlayer) => {
  let opt = board.cells;
  let symbol = currentPlayer.character;

  if (
    opt[0] === opt[1] &&
    opt[1] === opt[2] &&
    opt[2] === symbol &&
    symbol != ""
  ) {
    setWinner(0, 1, 2);
  } else if (
    opt[3] === opt[4] &&
    opt[4] === opt[5] &&
    opt[3] === symbol &&
    symbol != ""
  ) {
    setWinner(3, 4, 5);
  } else if (
    opt[6] === opt[7] &&
    opt[7] === opt[8] &&
    opt[6] === symbol &&
    symbol != ""
  ) {
    setWinner(6, 7, 8);
  } else if (
    opt[0] === opt[3] &&
    opt[3] === opt[6] &&
    opt[0] === symbol &&
    symbol != ""
  ) {
    setWinner(0, 3, 6);
  } else if (
    opt[1] === opt[4] &&
    opt[4] === opt[7] &&
    opt[1] === symbol &&
    symbol != ""
  ) {
    setWinner(1, 4, 7);
  } else if (
    opt[2] === opt[5] &&
    opt[5] === opt[8] &&
    opt[2] === symbol &&
    symbol != ""
  ) {
    setWinner(2, 5, 8);
  } else if (
    opt[0] === opt[4] &&
    opt[4] === opt[8] &&
    opt[0] === symbol &&
    symbol != ""
  ) {
    setWinner(0, 4, 8);
  } else if (
    opt[2] === opt[4] &&
    opt[4] === opt[6] &&
    opt[2] === symbol &&
    symbol != ""
  ) {
    setWinner(2, 4, 6);
  }
};

//listeners

document.addEventListener(
  "DOMContentLoaded",
  gameType.render("Please select the game mode")
);

document.querySelector(".restart").addEventListener("click", function () {
  gameType.render("");
});
