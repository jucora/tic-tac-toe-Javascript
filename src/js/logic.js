import gameBoard from "./board";
import player from "./player";
import game from "./game";
import initialBox from "./initialBox";
import audio from "./audio";

require("../css/style.css");
require("../css/bootstrap.css");

export const getInputs = () => [
  document.getElementById("playerOneName"),
  document.getElementById("characterPlayerOne"),
  document.getElementById("playerTwoName"),
  document.getElementById("characterPlayerTwo"),
];

export const getPlayersInputs = () => {
  const inputs = getInputs();
  return [inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value];
};

export const validInput = (text, input, message) => {
  document.getElementById(text).textContent = message;
  document.getElementById(input).style.background = "#F78070";
};

export const removeDialogBox = () => {
  document.getElementById("dialogbox").style.display = "none";
  document.getElementById("dialogoverlay").style.display = "none";
};

export const playWhoopie = () => {
  if (game.gameActive) {
    audio.whoopie.play();
  }
};

export const cellContent = (cell) => cell.textContent;

export const drawPlayerMove = (cell) => {
  cell.textContent = game.currentPlayer.character;
};

export const drawComputerMove = (id) => {
  document.querySelector(".cells").children[id].textContent =
    game.currentPlayer.character;
};

export const checkWinner = (board, currentPlayer) => {
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

export const gameInfo = (message) => {
  game.info.textContent = message;
};

export const displayWinner = (cells, cell1, cell2, cell3) => {
  gameInfo(`${game.currentPlayer.name} is the winner`);
  cells.children[cell1].style.background = "green";
  cells.children[cell2].style.background = "green";
  cells.children[cell3].style.background = "green";
};

export const getCells = () => document.querySelector(".cells");

export const setWinner = (cell1, cell2, cell3) => {
  const cells = getCells();
  displayWinner(cells, cell1, cell2, cell3);
  game.gameActive = false;
  setTimeout(() => {
    audio.laugh.play();
  }, 500);
};

export const getEmptySpaces = (gameData) => {
  const EMPTY = [];

  for (let id = 0; id < gameData.length; id += 1) {
    if (!gameData[id]) EMPTY.push(id);
  }

  return EMPTY;
};

export const displayTie = () => {
  gameInfo("TIE: No winners this time!");
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.style.background = "green";
  });
};

export const isTie = () => {
  if (getEmptySpaces(gameBoard.cells).length === 0) {
    displayTie();
    game.gameActive = false;
    game.currentPlayer = null;
    return true;
  }
  game.currentPlayer =
    game.currentPlayer === game.player1 ? game.player2 : game.player1;
  gameInfo(`${game.currentPlayer.name} is Playing!`);
  return false;
};

export const winnerOrTie = () => {
  if (checkWinner(gameBoard.cells, game.currentPlayer.character)) {
    setWinner(
      checkWinner(gameBoard.cells, game.currentPlayer.character)[1],
      checkWinner(gameBoard.cells, game.currentPlayer.character)[2],
      checkWinner(gameBoard.cells, game.currentPlayer.character)[3]
    );
  } else {
    isTie();
  }
};

export const checkTie = () => {
  if (getEmptySpaces(gameBoard.cells).length === 0) {
    return true;
  }
  return false;
};

export const minimax = (gameData, PLAYER) => {
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
};

export const gameControl = (cell, index) => {
  if (cellContent(cell) === "" && game.gameActive) {
    gameBoard.cells[index] = game.currentPlayer.character;
    if (game.currentPlayer === game.player1) {
      drawPlayerMove(cell);
      winnerOrTie();
      if (
        game.currentPlayer === game.player2 &&
        game.currentPlayer.rol === "computer"
      ) {
        const { id } = minimax(gameBoard.cells, game.player2.character);
        gameBoard.cells[id] = game.currentPlayer.character;
        drawComputerMove(id);
        winnerOrTie();
      }
    } else if (
      game.currentPlayer === game.player2 &&
      game.currentPlayer.rol === "human"
    ) {
      drawPlayerMove(cell);
      winnerOrTie();
    }
  }
};

export const infoContainer = () => {
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");
  const info = document.createElement("div");
  info.setAttribute("id", "info");
  const restart = document.createElement("div");
  restart.classList.add("restart");
  restart.textContent = "Restart Game";
  restart.addEventListener("click", () => {
    document.location.reload();
  });
  infoContainer.appendChild(info);
  infoContainer.appendChild(restart);
  document.querySelector(".container").appendChild(infoContainer);
};

export const gameTitle = () => {
  const title = document.createElement("h1");
  title.textContent = "Tic Tac Toe Game";
  title.classList.add("title");
  document.querySelector(".container").appendChild(title);
};

export const displayGame = () => {
  gameTitle();
  infoContainer();
  game.info = document.querySelector("#info");
  game.info.textContent = `${game.currentPlayer.name} is playing!`;
  const row = document.createElement("div");
  row.classList.add("row", "cells");
  for (let i = 0; i < gameBoard.cells.length; i += 1) {
    const cell = document.createElement("div");
    cell.classList.add("col-4", "cell");
    row.appendChild(cell);
  }
  document.querySelector(".container").appendChild(row);

  document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.addEventListener("click", () => {
      playWhoopie();
      gameControl(cell, index);
    });
  });
};

export const start = () => {
  game.gameActive = true;
  displayGame();
};

export const invalidNumber = (index) => !Number.isInteger(parseInt(index, 10));

export const sameNameValidation = (name1, name2) => {
  if (name1 === name2 && name1 !== "") {
    validInput(
      "namePlayerOneTitle",
      "playerOneName",
      "Names have to be different"
    );
    validInput(
      "namePlayerTwoTitle",
      "playerTwoName",
      "Names have to be different"
    );
    return false;
  }
  return true;
};

export const emptyNameValidation = (name1, name2) => {
  if (name1 === "" || name2 === "") {
    if (name1 === "") {
      validInput("namePlayerOneTitle", "playerOneName", "Name can't be empty!");
    }
    if (name2 === "") {
      validInput("namePlayerTwoTitle", "playerTwoName", "Name can't be empty!");
    }
    return false;
  }
  return true;
};

export const differentIndexValidation = (index1, index2) => {
  if (index1 === index2 && index1 !== "") {
    validInput(
      "characterPlayerOneTitle",
      "characterPlayerOne",
      "Please select a valid character between 1 to 4"
    );
    validInput(
      "characterPlayerTwoTitle",
      "characterPlayerTwo",
      "Please select a valid character between 1 to 4"
    );
    return false;
  }
  return true;
};

export const validIndexCharacter = (index1, index2, mode) => {
  if (
    invalidNumber(index1) ||
    index1 < 1 ||
    index1 > 4 ||
    index1.length > 1 ||
    (mode === 2 &&
      (invalidNumber(index2) || index2 < 1 || index2 > 4 || index2.length > 1))
  ) {
    if (
      invalidNumber(index1) ||
      index1 < 1 ||
      index1 > 4 ||
      index1.length > 1
    ) {
      validInput(
        "characterPlayerOneTitle",
        "characterPlayerOne",
        "Please select a valid character between 1 to 4"
      );
      return false;
    }
    if (
      mode === 2 &&
      (invalidNumber(index2) || index2 < 1 || index2 > 4 || index2.length > 1)
    ) {
      validInput(
        "characterPlayerTwoTitle",
        "characterPlayerTwo",
        "Please select a valid character between 1 to 4"
      );
      return false;
    }
    differentIndexValidation(index1, index2);
  }
  return true;
};

export const setPlayers = (name1, index1, name2, index2, mode) => {
  game.player1 = player.newPlayer(name1, player.character[index1 - 1]);
  if (mode === 2) {
    game.player2 = player.newPlayer(name2, player.character[index2 - 1]);
  } else {
    game.player2 = player.newPlayer(name2, index2);
    game.player2.rol = "computer";
  }
};

export const getReady = () => {
  removeDialogBox();
  audio.hereWeGo.play();
  setTimeout(() => {
    audio.monkey.play();
  }, 1000);
  game.currentPlayer = game.player1;
  start();
};

export const checkInput = (name1, index1, name2, index2, mode) => {
  let validName = false;
  if (emptyNameValidation(name1, name2) && sameNameValidation(name1, name2)) {
    validName = true;
  }
  let validCharacter = false;
  if (
    validIndexCharacter(index1, index2, mode) &&
    differentIndexValidation(index1, index2)
  ) {
    validCharacter = true;
  }
  if (validName && validCharacter) {
    setPlayers(name1, index1, name2, index2, mode);
    getReady();
  }
};

export const getPlayerOneInput = () => {
  const playerOneName = document.getElementById("playerOneName").value;
  const playerOneCharacter = document.getElementById("characterPlayerOne")
    .value;
  return [playerOneName, playerOneCharacter];
};

export const setDialogDetail = (mode) => {
  let dialogDetail;
  if (mode === 1) {
    dialogDetail = " name";
  } else {
    dialogDetail = " 1 name";
  }
  return dialogDetail;
};

export const opponentController = () => {
  if (getInputs()[2]) {
    const playerOneName = getPlayersInputs()[0];
    const playerOneCharacter = getPlayersInputs()[1];
    const playerTwoName = getPlayersInputs()[2];
    const playerTwoCharacter = getPlayersInputs()[3];

    checkInput(
      playerOneName,
      playerOneCharacter,
      playerTwoName,
      playerTwoCharacter,
      2
    );
  } else {
    const playerOneName = getPlayerOneInput()[0];
    const playerOneCharacter = getPlayerOneInput()[1];
    checkInput(playerOneName, playerOneCharacter, "Computer", "😈", 1);
  }
};

export function GetUserInfo() {
  this.render = (dialog, mode) => {
    initialBox();
    const dialogDetail = setDialogDetail(mode);

    document.getElementById(
      "dialogboxbody"
    ).innerHTML = `<h2 id='namePlayerOneTitle'>${dialog}${dialogDetail}</h2>`;

    document.getElementById("dialogboxbody").innerHTML +=
      '<br><input id="playerOneName" class = "form-control">';
    document.getElementById("dialogboxbody").innerHTML += `${
      "<br><h2 id='characterPlayerOneTitle'>Please select your character</h2><h2>" +
      " 1)"
    }${player.character[0]} 2)${player.character[1]} 3)${
      player.character[2]
    } 4)${
      player.character[3]
    }</h2><input id='characterPlayerOne'class = 'form-control'>`;

    if (mode === 2) {
      document.getElementById(
        "dialogboxbody"
      ).innerHTML += `<br><hr><br><h2 id='namePlayerTwoTitle'>${dialog} 2 name</h2>`;
      document.getElementById("dialogboxbody").innerHTML +=
        '<br><input id="playerTwoName" class = "form-control">';
      document.getElementById("dialogboxbody").innerHTML += `${
        "<br><h2 id='characterPlayerTwoTitle'>Please select your character</h2><h2>" +
        " 1)"
      }${player.character[0]} 2)${player.character[1]} 3)${
        player.character[2]
      } 4)${
        player.character[3]
      }</h2><input id='characterPlayerTwo'class = 'form-control'>`;
    }
    const okButton = document.createElement("BUTTON");
    okButton.innerHTML = "OK";
    okButton.classList.add("btn", "btn-primary", "form-control");
    okButton.addEventListener("click", () => {
      this.ok();
    });
    document.getElementById("dialogboxfoot").appendChild(okButton);
  };
  this.ok = () => {
    const inputs = getInputs();
    inputs.forEach((inp) => {
      if (inp) {
        inp.style.background = "#fff";
      }
    });
    opponentController();
  };
}

export const takeGameMode = (mode) => {
  const userInfo = new GetUserInfo();
  userInfo.render("Player", mode);
};

export const selectGameMode = (dialog) => {
  if (document.querySelector("#dialogboxbody")) {
    document.getElementById(
      "dialogboxbody"
    ).innerHTML = `<h2 id='nameInputTitle'>${dialog}</h2>`;
    document.getElementById("dialogboxbody").innerHTML +=
      '<br><button id="mode1" class = "btn btn-primary"> Player vs Computer</button><br>';
    document.getElementById("dialogboxbody").innerHTML +=
      '<br><button id="mode2" class = "btn btn-primary"> Player vs Player</button>';

    document.querySelector("#mode1").addEventListener("click", () => {
      takeGameMode(1);
    });
    document.querySelector("#mode2").addEventListener("click", () => {
      takeGameMode(2);
    });
  }
};

export function GameMode() {
  this.render = (dialog) => {
    initialBox();
    selectGameMode(dialog);
  };
}
export const gameType = new GameMode();

document.addEventListener(
  "DOMContentLoaded",
  gameType.render("Please select the game mode")
);
