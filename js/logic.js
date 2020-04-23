/* eslint-disable no-unused-vars */
/* global initialBox, dialogBoxesPlayers, selectGameMode, displayGame */

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
  const player1 = "";
  const player2 = "";
  const board = gameBoard.cells;
  const currentPlayer = "";

  const gameActive = false;
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
    gameActive,
    info,
    restart,
    character,
  };
})();

function restartGame() {
  cellsContainer = getCells();
  if (cellsContainer) {
    removeGame();
    game.board = ["", "", "", "", "", "", "", "", ""];
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

function setWinner(cell1, cell2, cell3) {
  const cells = getCells();
  displayWinner(cells, cell1, cell2, cell3);
  game.gameActive = false;
  setTimeout(() => {
    game.laugh.play();
  }, 500);
  deleteKeySound();
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
    displayTie();
    deleteKeySound();
    game.currentPlayer = null;
    return true;
  }
  gameInfo(`${game.currentPlayer.name} is Playing!`);
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

function winnerOrTie() {
  let winnerCells = "";
  if (checkWinner(game.board, game.currentPlayer.character)) {
    winnerCells = checkWinner(game.board, game.currentPlayer.character);
    setWinner(winnerCells[1], winnerCells[2], winnerCells[3]);
  } else {
    game.currentPlayer =
      game.currentPlayer === game.player1 ? game.player2 : game.player1;
    isTie();
  }
}

function gameControl(cell, index) {
  if (cellContent(cell) === "" && game.gameActive) {
    game.board[index] = game.currentPlayer.character;
    if (game.currentPlayer === game.player1) {
      drawPlayerMove(cell);
      winnerOrTie();
      if (
        game.currentPlayer === game.player2 &&
        game.currentPlayer.rol === "computer"
      ) {
        const { id } = minimax(game.board, game.player2.character);
        game.board[id] = game.currentPlayer.character;
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
}

const start = () => {
  game.gameActive = true;
  displayGame();
};

function checkInput(name1, index1, name2, index2, mode) {
  if (name1 === "") {
    validInput("namePlayerOneTitle", "playerOneName", "Name can't be empty!");
  } else if (name2 === "") {
    validInput("namePlayerTwoTitle", "playerTwoName", "Name can't be empty!");
  }

  if (index1 < 1 || index1 > 4 || index1 === "") {
    validInput(
      "characterPlayerOneTitle",
      "characterPlayerOne",
      "Please select a valid character between 1 to 4"
    );
  } else if (index2 < 1 || index2 > 4 || index2 === "") {
    validInput(
      "characterPlayerTwoTitle",
      "characterPlayerTwo",
      "Please select a valid character between 1 to 4"
    );
  } else {
    game.player1 = player(name1, game.character[index1 - 1]);
    if (mode === 2) {
      game.player2 = player(name2, game.character[index2 - 1]);
    } else {
      game.player2 = player(name2, index2);
      game.player2.rol = "computer";
    }
    removeDialogBox();
    game.hereWeGo.play();
    setTimeout(() => {
      game.monkey.play();
    }, 1000);
    game.currentPlayer = game.player1;
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
    if (checkInputPlayerTwo()) {
      let playerOneName = getPlayersInputs()[0];
      let playerOneCharacter = getPlayersInputs()[1];
      let playerTwoName = getPlayersInputs()[2];
      let playerTwoCharacter = getPlayersInputs()[3];

      if (playerOneName === playerTwoName && playerOneName !== "") {
        sameNames();
      } else if (
        playerOneCharacter === playerTwoCharacter &&
        playerOneCharacter !== ""
      ) {
        sameCharacters();
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
      let playerOneName = getPlayerOneInput()[0];
      let playerOneCharacter = getPlayerOneInput()[1];
      window[func](playerOneName, playerOneCharacter, "Computer", "😈");
    }
  };
}

const userInfo = new GetUserInfo();

function GameMode() {
  this.render = (dialog) => {
    initialBox();
    selectGameMode(dialog);
  };
}
const gameType = new GameMode();
