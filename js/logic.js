/* eslint-disable no-unused-vars */
/* global initialBox, dialogBoxesPlayers, selectGameMode */

const gameBoard = (() => {
  const cells = ["", "", "", "", "", "", "", "", ""];
  return { cells };
})();

const player = (name, character, rol = "human") => ({ name, character, rol });

const game = (() => {
  const whoopie = new Audio();
  whoopie.src = "sound/whoopie.mp3";
  const hereWeGo = new Audio();
  hereWeGo.src = "sound/here_we_go.mp3";
  const monkey = new Audio();
  monkey.src = "sound/monkey.mp3";
  monkey.loop = true;
  const laugh = new Audio();
  laugh.src = "sound/laugh.mp3";

  const character = ["😁", "😎", "💩", "😝"];
  let player1 = "";
  let player2 = "";
  const board = gameBoard.cells;
  let currentPlayer = "";

  let row = null;
  let winnerCells = "";
  let gameActive = false;
  const info = document.querySelector("#info");
  const restart = document.querySelector(".restart");

  return {
    hereWeGo,
    monkey,
    whoopie,
    laugh,
    player1,
    player2,
    board,
    currentPlayer,
    row,
    winnerCells,
    gameActive,
    info,
    restart,
    character,
  };
})();

initialBox();

function restartGame() {
  if (document.querySelector(".cells")) {
    document.querySelector(".cells").remove();
    board.cells = ["", "", "", "", "", "", "", "", ""];
  }
}

const checkWinner = (board, currentPlayer) => {
  if (
    board[0] === board[1] &&
    board[1] === board[2] &&
    board[2] === currentPlayer &&
    currentPlayer !== ""
  ) {
    return [true, 0, 1, 2];
  }
  if (
    board[3] === board[4] &&
    board[4] === board[5] &&
    board[3] === currentPlayer &&
    currentPlayer !== ""
  ) {
    return [true, 3, 4, 5];
  }
  if (
    board[6] === board[7] &&
    board[7] === board[8] &&
    board[6] === currentPlayer &&
    currentPlayer !== ""
  ) {
    return [true, 6, 7, 8];
  }
  if (
    board[0] === board[3] &&
    board[3] === board[6] &&
    board[0] === currentPlayer &&
    currentPlayer !== ""
  ) {
    return [true, 0, 3, 6];
  }
  if (
    board[1] === board[4] &&
    board[4] === board[7] &&
    board[1] === currentPlayer &&
    currentPlayer !== ""
  ) {
    return [true, 1, 4, 7];
  }
  if (
    board[2] === board[5] &&
    board[5] === board[8] &&
    board[2] === currentPlayer &&
    currentPlayer !== ""
  ) {
    return [true, 2, 5, 8];
  }
  if (
    board[0] === board[4] &&
    board[4] === board[8] &&
    board[0] === currentPlayer &&
    currentPlayer !== ""
  ) {
    return [true, 0, 4, 8];
  }
  if (
    board[2] === board[4] &&
    board[4] === board[6] &&
    board[2] === currentPlayer &&
    currentPlayer !== ""
  ) {
    return [true, 2, 4, 6];
  }
  return false;
};

function deleteKeySound() {
  game.currentPlayer = null;
  document.querySelectorAll(".cell").forEach((c) => {
    c.removeAttribute("onmousedown");
  });
}

function setWinner(cell1, cell2, cell3) {
  const cells = document.querySelector(".cells");

  info.textContent = `${game.currentPlayer.name} is the winner`;

  game.gameActive = false;
  setTimeout(() => {
    game.laugh.play();
  }, 500);
  deleteKeySound();
  cells.children[cell1].style.background = "green";
  cells.children[cell2].style.background = "green";
  cells.children[cell3].style.background = "green";
}

function getEmptySpaces(gameData) {
  const EMPTY = [];

  for (let id = 0; id < gameData.length; id += 1) {
    if (!gameData[id]) EMPTY.push(id);
  }

  return EMPTY;
}

function isTie() {
  if (getEmptySpaces(game.board).length === 0) {
    info.textContent = "TIE: No winners this time!";
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.style.background = "green";
    });
    deleteKeySound();
    return true;
  }
  info.textContent = `${game.currentPlayer.name} is Playing!`;
  return false;
}

function checkTie() {
  if (getEmptySpaces(game.board).length === 0) {
    return true;
  }
  return false;
}

function minimax(gameData, PLAYER) {
  if (checkWinner(gameData, game.player2.character)) return { evaluation: +10 };
  if (checkWinner(gameData, game.player1.character)) return { evaluation: -10 };
  if (checkTie(gameData)) return { evaluation: 0 };

  const EMPTY_SPACES = getEmptySpaces(gameData);

  const moves = [];

  for (let i = 0; i < EMPTY_SPACES.length; i += 1) {
    const id = EMPTY_SPACES[i];

    const backup = gameData[id];

    gameData[id] = PLAYER;

    const move = {};
    move.id = id;

    if (PLAYER === game.player2.character) {
      move.evaluation = minimax(gameData, game.player1.character).evaluation;
    } else {
      move.evaluation = minimax(gameData, game.player2.character).evaluation;
    }

    gameData[id] = backup;

    moves.push(move);
  }

  let bestMove;

  if (PLAYER === game.player2.character) {
    let bestEvaluation = -Infinity;
    for (let i = 0; i < moves.length; i += 1) {
      if (moves[i].evaluation > bestEvaluation) {
        bestEvaluation = moves[i].evaluation;
        bestMove = moves[i];
      }
    }
  } else {
    let bestEvaluation = +Infinity;
    for (let i = 0; i < moves.length; i += 1) {
      if (moves[i].evaluation < bestEvaluation) {
        bestEvaluation = moves[i].evaluation;
        bestMove = moves[i];
      }
    }
  }

  return bestMove;
}

const start = () => {
  game.gameActive = true;
  info.textContent = `${game.currentPlayer.name} is playing!`;
  game.restart.textContent = "Restart Game";
  row = document.createElement("div");
  row.classList.add("row", "cells");
  for (let i = 0; i < game.board.length; i += 1) {
    const cell = document.createElement("div");
    cell.classList.add("col-4", "cell");
    cell.setAttribute("onmousedown", "game.whoopie.play()");
    row.appendChild(cell);
  }
  document.querySelector(".container").appendChild(row);

  document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (cell.textContent === "" && game.gameActive) {
        game.board[index] = game.currentPlayer.character;
        if (game.currentPlayer === game.player1) {
          cell.textContent = game.currentPlayer.character;
          if (checkWinner(game.board, game.currentPlayer.character)) {
            winnerCells = checkWinner(game.board, game.currentPlayer.character);

            setWinner(winnerCells[1], winnerCells[2], winnerCells[3]);
          } else {
            game.currentPlayer = game.player2;
            isTie();
          }
          if (
            game.currentPlayer === game.player2 &&
            game.currentPlayer.rol === "computer"
          ) {
            const { id } = minimax(game.board, game.player2.character);
            game.board[id] = game.currentPlayer.character;
            document.querySelector(".cells").children[id].textContent =
              game.currentPlayer.character;
            if (checkWinner(game.board, game.currentPlayer.character)) {
              winnerCells = checkWinner(
                game.board,
                game.currentPlayer.character
              );

              setWinner(winnerCells[1], winnerCells[2], winnerCells[3]);
            } else {
              game.currentPlayer = game.player1;
              isTie();
            }
          }
        } else if (
          game.currentPlayer === game.player2 &&
          game.currentPlayer.rol === "human"
        ) {
          cell.textContent = game.currentPlayer.character;
          if (checkWinner(game.board, game.currentPlayer.character)) {
            winnerCells = checkWinner(game.board, game.currentPlayer.character);

            setWinner(winnerCells[1], winnerCells[2], winnerCells[3]);
          } else {
            game.currentPlayer = game.player1;
            isTie();
          }
        }
      }
    });
  });
};

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
  } else {
    game.player1 = player(name1, game.character[index1 - 1]);
    if (mode === 2) {
      game.player2 = player(name2, game.character[index2 - 1]);
    } else {
      game.player2 = player(name2, index2);
      game.player2.rol = "computer";
    }
    document.getElementById("dialogbox").style.display = "none";
    document.getElementById("dialogoverlay").style.display = "none";
    game.hereWeGo.play();
    setTimeout(() => {
      game.monkey.play();
    }, 1000);
    game.currentPlayer = game.player1;
    restartGame();
    start();
  }
}

function GetUserInfo() {
  this.render = (dialog, func, mode) => {
    initialBox();
    let dialogDetail;
    if (mode === 1) {
      dialogDetail = " name";
    } else {
      dialogDetail = " 1 name";
    }
    dialogBoxesPlayers(dialog, func, mode, dialogDetail);
  };
  this.ok = (func) => {
    if (document.getElementById("playerTwoName")) {
      const playerOneName = document.getElementById("playerOneName").value;
      const playerOneCharacter = document.getElementById("characterPlayerOne")
        .value;
      const playerTwoName = document.getElementById("playerTwoName").value;
      const playerTwoCharacter = document.getElementById("characterPlayerTwo")
        .value;
      if (playerOneName === playerTwoName && playerOneName !== "") {
        document.querySelector("#namePlayerTwoTitle").textContent =
          "Player's names should be different!";
        document.querySelector("#namePlayerOneTitle").textContent =
          "Player's names should be different!";
      } else if (
        playerOneCharacter === playerTwoCharacter &&
        playerOneCharacter !== ""
      ) {
        document.querySelector("#characterPlayerOneTitle").textContent =
          "Players can't have the same character";
        document.querySelector("#characterPlayerTwoTitle").textContent =
          "Players can't have the same character";
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
      const playerOneName = document.getElementById("playerOneName").value;
      const playerOneCharacter = document.getElementById("characterPlayerOne")
        .value;
      window[func](playerOneName, playerOneCharacter, "Computer", "😈");
    }
  };
}

const userInfo = new GetUserInfo();

function GameMode() {
  this.render = (dialog) => {
    initialBox();
    selectGameMode(dialog);
    let mode = null;
    document.querySelector("#mode1").addEventListener("click", () => {
      mode = 1;
      userInfo.render("Player", "checkInput", mode);
    });
    document.querySelector("#mode2").addEventListener("click", () => {
      mode = 2;
      userInfo.render("Player ", "checkInput", mode);
    });
  };
}

const gameType = new GameMode();

document.addEventListener(
  "DOMContentLoaded",
  gameType.render("Please select the game mode")
);

document.querySelector(".restart").addEventListener("click", () => {
  gameType.render("");
});
