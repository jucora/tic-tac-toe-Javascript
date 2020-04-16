const gameBoard = (() => {
  const cells = ["", "", "", "", "", "", "", "", ""];
  return { cells };
})();

const player = (name, character, rol = "human") => {
  return { name, character, rol };
};

const character = ["😁", "😎", "💩", "😝"];
let player1 = "";
let player2 = "";
const board = gameBoard;
let currentPlayer = "";

let row = null;
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
    let mode = null;
    document.querySelector("#mode1").addEventListener("click", function () {
      mode = 1;
      userInfo.render("Player", "checkInput", mode);
    });
    document.querySelector("#mode2").addEventListener("click", function () {
      mode = 2;
      userInfo.render("Player ", "checkInput", mode);
    });
  };
}

function restartGame() {
  if (document.querySelector(".cells")) {
    document.querySelector(".cells").remove();
    board.cells = ["", "", "", "", "", "", "", "", ""];
  }
}

function checkInput(name1, index1, name2, index2, mode) {
  if (name1 === "") {
    document.getElementById("namePlayerOneTitle").textContent =
      "Name can't be empty!";
    document.getElementById("playerOneName").style.background = "#F78070";
  } else if (name2 === "") {
    document.getElementById("namePlayerTwoTitle").textContent =
      "Name can't be empty!";
    document.getElementById("playerTwoName").style.background = "#F78070";
  }

  if (index1 < 1 || index1 > 4 || index1 === "") {
    document.getElementById("characterPlayerOneTitle").textContent =
      "Please select a valid character between 1 to 4";
    document.getElementById("characterPlayerOne").style.background = "#F78070";
  } else if (index2 < 1 || index2 > 4 || index2 === "") {
    document.getElementById("characterPlayerTwoTitle").textContent =
      "Please select a valid character between 1 to 4";
    document.getElementById("characterPlayerTwo").style.background = "#F78070";
  }

  if (name1 && index1 && name2 && index2) {
    player1 = player(name, character[index1 - 1]);
    if (mode === 2) {
      player2 = player(name2, character[index2 - 1]);
    } else {
      player2 = player(name2, index2);
      player2.rol = "computer";
    }
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

function deleteKeySound() {
  currentPlayer = null;
  document.querySelectorAll(".cell").forEach(function (c) {
    c.removeAttribute("onmousedown");
  });
}

function isTie() {
  if (getEmptySpaces(board.cells).length === 0) {
    info.textContent = "TIE: No winners this time!";
    document.querySelectorAll(".cell").forEach(function (cell) {
      cell.style.background = "green";
    });
    deleteKeySound();
    return true;
  } else {
    info.textContent = `${currentPlayer.name} is Playing!`;
    return false;
  }
}

function setWinner(cell1, cell2, cell3) {
  let cells = document.querySelector(".cells");

  info.textContent = `${currentPlayer.name} is the winner`;

  game = false;
  setTimeout(() => {
    laugh.play();
  }, 500);
  deleteKeySound();
  cells.children[cell1].style.background = "green";
  cells.children[cell2].style.background = "green";
  cells.children[cell3].style.background = "green";
}

const checkWinner = (board, currentPlayer) => {
  if (
    board[0] === board[1] &&
    board[1] === board[2] &&
    board[2] === currentPlayer &&
    currentPlayer != ""
  ) {
    return [true, 0, 1, 2];
  } else if (
    board[3] === board[4] &&
    board[4] === board[5] &&
    board[3] === currentPlayer &&
    currentPlayer != ""
  ) {
    return [true, 3, 4, 5];
  } else if (
    board[6] === board[7] &&
    board[7] === board[8] &&
    board[6] === currentPlayer &&
    currentPlayer != ""
  ) {
    return [true, 6, 7, 8];
  } else if (
    board[0] === board[3] &&
    board[3] === board[6] &&
    board[0] === currentPlayer &&
    currentPlayer != ""
  ) {
    return [true, 0, 3, 6];
  } else if (
    board[1] === board[4] &&
    board[4] === board[7] &&
    board[1] === currentPlayer &&
    currentPlayer != ""
  ) {
    return [true, 1, 4, 7];
  } else if (
    board[2] === board[5] &&
    board[5] === board[8] &&
    board[2] === currentPlayer &&
    currentPlayer != ""
  ) {
    return [true, 2, 5, 8];
  } else if (
    board[0] === board[4] &&
    board[4] === board[8] &&
    board[0] === currentPlayer &&
    currentPlayer != ""
  ) {
    return [true, 0, 4, 8];
  } else if (
    board[2] === board[4] &&
    board[4] === board[6] &&
    board[2] === currentPlayer &&
    currentPlayer != ""
  ) {
    return [true, 2, 4, 6];
  } else {
    return false;
  }
};

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
          if (checkWinner(board.cells, currentPlayer.character)) {
            winnerCells = checkWinner(board.cells, currentPlayer.character);

            setWinner(winnerCells[1], winnerCells[2], winnerCells[3]);
          } else {
            currentPlayer = player2;
            isTie();
          }
          if (currentPlayer === player2 && currentPlayer.rol === "computer") {
            let id = minimax(board.cells, player2.character).id;
            board.cells[id] = currentPlayer.character;
            document.querySelector(".cells").children[id].textContent =
              currentPlayer.character;
            if (checkWinner(board.cells, currentPlayer.character)) {
              winnerCells = checkWinner(board.cells, currentPlayer.character);

              setWinner(winnerCells[1], winnerCells[2], winnerCells[3]);
            } else {
              currentPlayer = player1;
              isTie();
            }
          }
        } else if (currentPlayer === player2 && currentPlayer.rol === "human") {
          cell.textContent = currentPlayer.character;
          if (checkWinner(board.cells, currentPlayer.character)) {
            winnerCells = checkWinner(board.cells, currentPlayer.character);

            setWinner(winnerCells[1], winnerCells[2], winnerCells[3]);
          } else {
            currentPlayer = player1;
            isTie();
          }
        }
      }
    });
  });
};

function getUserInfo() {
  this.render = (dialog, func, mode) => {
    initialBox();
    let dialogDetail;
    if (mode === 1) {
      dialogDetail = " name";
    } else {
      dialogDetail = " 1 name";
    }
    document.getElementById("dialogboxbody").innerHTML =
      "<h2 id='namePlayerOneTitle'>" + dialog + dialogDetail + "</h2>";

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

    if (mode === 2) {
      document.getElementById("dialogboxbody").innerHTML +=
        "<h2 id='namePlayerTwoTitle'>" + dialog + " 2 name</h2>";
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
    }
    document.getElementById("dialogboxfoot").innerHTML =
      "<button class = 'btn btn-primary form-control' onclick=\"userInfo.ok('" +
      func +
      "')\">OK";
  };
  this.ok = (func) => {
    if (document.getElementById("playerTwoName")) {
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
          playerTwoCharacter,
          2
        );
      }
    } else {
      var playerOneName = document.getElementById("playerOneName").value;
      var playerOneCharacter = document.getElementById("characterPlayerOne")
        .value;
      window[func](playerOneName, playerOneCharacter, "computer", "😈");
    }
  };
}

function getEmptySpaces(gameData) {
  let EMPTY = [];

  for (let id = 0; id < gameData.length; id++) {
    if (!gameData[id]) EMPTY.push(id);
  }

  return EMPTY;
}

function checkTie() {
  if (getEmptySpaces(board.cells).length === 0) {
    return true;
  } else {
    return false;
  }
}

function minimax(gameData, PLAYER) {
  if (checkWinner(gameData, player2.character)) return { evaluation: +10 };
  if (checkWinner(gameData, player1.character)) return { evaluation: -10 };
  if (checkTie(gameData)) return { evaluation: 0 };

  let EMPTY_SPACES = getEmptySpaces(gameData);

  let moves = [];

  for (let i = 0; i < EMPTY_SPACES.length; i++) {
    let id = EMPTY_SPACES[i];

    let backup = gameData[id];

    gameData[id] = PLAYER;

    let move = {};
    move.id = id;

    if (PLAYER == player2.character) {
      move.evaluation = minimax(gameData, player1.character).evaluation;
    } else {
      move.evaluation = minimax(gameData, player2.character).evaluation;
    }

    gameData[id] = backup;

    moves.push(move);
  }

  let bestMove;

  if (PLAYER == player2.character) {
    let bestEvaluation = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].evaluation > bestEvaluation) {
        bestEvaluation = moves[i].evaluation;
        bestMove = moves[i];
      }
    }
  } else {
    let bestEvaluation = +Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].evaluation < bestEvaluation) {
        bestEvaluation = moves[i].evaluation;
        bestMove = moves[i];
      }
    }
  }

  return bestMove;
}

const gameType = new gameMode();
const userInfo = new getUserInfo();

//listeners

document.addEventListener(
  "DOMContentLoaded",
  gameType.render("Please select the game mode")
);

document.querySelector(".restart").addEventListener("click", function () {
  gameType.render("");
});
