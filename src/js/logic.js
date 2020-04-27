import { player, game } from './factories';

require('../css/style.css');
require('../css/bootstrap.css');

function initialBox() {
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const dialogoverlay = document.getElementById('dialogoverlay');
  const dialogbox = document.getElementById('dialogbox');
  dialogoverlay.style.display = 'block';
  dialogoverlay.style.height = `${winH}px`;
  dialogbox.style.left = `${winW / 2 - 550 * 0.5}px`;
  dialogbox.style.top = '100px';
  dialogbox.style.display = 'block';
  document.getElementById('dialogboxhead').innerHTML = 'Welcome to the Tic Tac Toe Game!';
}

const checkInputPlayerTwo = () => document.getElementById('playerTwoName');

const getInputs = () => [
  document.getElementById('playerOneName'),
  document.getElementById('characterPlayerOne'),
  document.getElementById('playerTwoName'),
  document.getElementById('characterPlayerTwo'),
];

const getPlayersInputs = () => {
  const inputs = getInputs();
  return [inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value];
};

const validInput = (text, input, message) => {
  document.getElementById(text).textContent = message;
  document.getElementById(input).style.background = '#F78070';
};

const sameNames = () => {
  document.querySelector('#namePlayerTwoTitle').textContent = "Player's names should be different!";
  document.querySelector('#namePlayerOneTitle').textContent = "Player's names should be different!";
};

const sameCharacters = () => {
  document.querySelector('#characterPlayerOneTitle').textContent = "Players can't have the same character";
  document.querySelector('#characterPlayerTwoTitle').textContent = "Players can't have the same character";
};

const removeDialogBox = () => {
  document.getElementById('dialogbox').style.display = 'none';
  document.getElementById('dialogoverlay').style.display = 'none';
};

const playWhoopie = () => {
  if (game.gameActive) {
    game.whoopie.play();
  }
};

const cellContent = (cell) => cell.textContent;

const drawPlayerMove = (cell) => {
  cell.textContent = game.currentPlayer.character;
};

const drawComputerMove = (id) => {
  document.querySelector('.cells').children[id].textContent = game.currentPlayer.character;
};

const checkWinner = (board, currentPlayer) => {
  if (
    board[0] === board[1]
    && board[1] === board[2]
    && board[2] === currentPlayer
    && currentPlayer !== ''
  ) {
    return [true, 0, 1, 2];
  }
  if (
    board[3] === board[4]
    && board[4] === board[5]
    && board[3] === currentPlayer
    && currentPlayer !== ''
  ) {
    return [true, 3, 4, 5];
  }
  if (
    board[6] === board[7]
    && board[7] === board[8]
    && board[6] === currentPlayer
    && currentPlayer !== ''
  ) {
    return [true, 6, 7, 8];
  }
  if (
    board[0] === board[3]
    && board[3] === board[6]
    && board[0] === currentPlayer
    && currentPlayer !== ''
  ) {
    return [true, 0, 3, 6];
  }
  if (
    board[1] === board[4]
    && board[4] === board[7]
    && board[1] === currentPlayer
    && currentPlayer !== ''
  ) {
    return [true, 1, 4, 7];
  }
  if (
    board[2] === board[5]
    && board[5] === board[8]
    && board[2] === currentPlayer
    && currentPlayer !== ''
  ) {
    return [true, 2, 5, 8];
  }
  if (
    board[0] === board[4]
    && board[4] === board[8]
    && board[0] === currentPlayer
    && currentPlayer !== ''
  ) {
    return [true, 0, 4, 8];
  }
  if (
    board[2] === board[4]
    && board[4] === board[6]
    && board[2] === currentPlayer
    && currentPlayer !== ''
  ) {
    return [true, 2, 4, 6];
  }
  return false;
};

const gameInfo = (message) => {
  game.info.textContent = message;
};

const displayWinner = (cells, cell1, cell2, cell3) => {
  gameInfo(`${game.currentPlayer.name} is the winner`);
  cells.children[cell1].style.background = 'green';
  cells.children[cell2].style.background = 'green';
  cells.children[cell3].style.background = 'green';
};

const getCells = () => document.querySelector('.cells');

function setWinner(cell1, cell2, cell3) {
  const cells = getCells();
  displayWinner(cells, cell1, cell2, cell3);
  game.gameActive = false;
  setTimeout(() => {
    game.laugh.play();
  }, 500);
}

function getEmptySpaces(gameData) {
  const EMPTY = [];

  for (let id = 0; id < gameData.length; id += 1) {
    if (!gameData[id]) EMPTY.push(id);
  }

  return EMPTY;
}

const displayTie = () => {
  gameInfo('TIE: No winners this time!');
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.style.background = 'green';
  });
};

function isTie() {
  if (getEmptySpaces(game.board).length === 0) {
    displayTie();
    game.gameActive = false;
    game.currentPlayer = null;
    return true;
  }
  gameInfo(`${game.currentPlayer.name} is Playing!`);
  return false;
}

function winnerOrTie() {
  let winnerCells = '';
  if (checkWinner(game.board, game.currentPlayer.character)) {
    winnerCells = checkWinner(game.board, game.currentPlayer.character);
    setWinner(winnerCells[1], winnerCells[2], winnerCells[3]);
  } else {
    game.currentPlayer = game.currentPlayer === game.player1 ? game.player2 : game.player1;
    isTie();
  }
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

function gameControl(cell, index) {
  if (cellContent(cell) === '' && game.gameActive) {
    game.board[index] = game.currentPlayer.character;
    if (game.currentPlayer === game.player1) {
      drawPlayerMove(cell);
      winnerOrTie();
      if (
        game.currentPlayer === game.player2
        && game.currentPlayer.rol === 'computer'
      ) {
        const { id } = minimax(game.board, game.player2.character);
        game.board[id] = game.currentPlayer.character;
        drawComputerMove(id);
        winnerOrTie();
      }
    } else if (
      game.currentPlayer === game.player2
      && game.currentPlayer.rol === 'human'
    ) {
      drawPlayerMove(cell);
      winnerOrTie();
    }
  }
}

const displayGame = () => {
  game.info.textContent = `${game.currentPlayer.name} is playing!`;
  game.restart.textContent = 'Restart Game';
  const row = document.createElement('div');
  row.classList.add('row', 'cells');
  for (let i = 0; i < game.board.length; i += 1) {
    const cell = document.createElement('div');
    cell.classList.add('col-4', 'cell');
    row.appendChild(cell);
  }
  document.querySelector('.container').appendChild(row);

  document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => {
      playWhoopie();
      gameControl(cell, index);
    });
  });
};

const start = () => {
  game.gameActive = true;
  displayGame();
};

const invalidNumber = (index) => !Number.isInteger(parseInt(index, 10));

const nameValidation = (name1, name2) => {
  if (name1 === '' || name2 === '') {
    if (name1 === '') {
      validInput('namePlayerOneTitle', 'playerOneName', "Name can't be empty!");
    }
    if (name2 === '') {
      validInput('namePlayerTwoTitle', 'playerTwoName', "Name can't be empty!");
    }
    return false;
  }
  if (name1 === name2 && name1 !== '') {
    sameNames();
    return false;
  }
  return true;
};

const invalidCharacter = (index1, index2, mode) => {
  if (
    invalidNumber(index1)
    || index1 < 1
    || index1 > 4
    || index1.length > 1
    || (mode === 2
      && (invalidNumber(index2) || index2 < 1 || index2 > 4 || index2.length > 1))
  ) {
    if (
      invalidNumber(index1)
      || index1 < 1
      || index1 > 4
      || index1.length > 1
    ) {
      validInput(
        'characterPlayerOneTitle',
        'characterPlayerOne',
        'Please select a valid character between 1 to 4',
      );
    }
    if (
      mode === 2
      && (invalidNumber(index2) || index2 < 1 || index2 > 4 || index2.length > 1)
    ) {
      validInput(
        'characterPlayerTwoTitle',
        'characterPlayerTwo',
        'Please select a valid character between 1 to 4',
      );
    }
    return false;
  } if (index1 === index2 && index1 !== '') {
    sameCharacters();
    return false;
  }
  return true;
};

const checkInput = (name1, index1, name2, index2, mode) => {
  const validName = nameValidation(name1, name2);
  const validCharacter = invalidCharacter(index1, index2, mode);
  if (validName && validCharacter) {
    game.player1 = player(name1, game.character[index1 - 1]);
    if (mode === 2) {
      game.player2 = player(name2, game.character[index2 - 1]);
    } else {
      game.player2 = player(name2, index2);
      game.player2.rol = 'computer';
    }
    removeDialogBox();
    game.hereWeGo.play();
    setTimeout(() => {
      game.monkey.play();
    }, 1000);
    game.currentPlayer = game.player1;
    start();
  }
};

const getPlayerOneInput = () => {
  const playerOneName = document.getElementById('playerOneName').value;
  const playerOneCharacter = document.getElementById('characterPlayerOne')
    .value;
  return [playerOneName, playerOneCharacter];
};

const resetInputColor = (inp) => {
  if (inp) {
    inp.style.background = '#fff';
  }
};

const setDialogDetail = (mode) => {
  let dialogDetail;
  if (mode === 1) {
    dialogDetail = ' name';
  } else {
    dialogDetail = ' 1 name';
  }
  return dialogDetail;
};

function GetUserInfo() {
  this.render = (dialog, mode) => {
    initialBox();
    const dialogDetail = setDialogDetail(mode);

    document.getElementById(
      'dialogboxbody',
    ).innerHTML = `<h2 id='namePlayerOneTitle'>${dialog}${dialogDetail}</h2>`;

    document.getElementById('dialogboxbody').innerHTML
      += '<br><input id="playerOneName" class = "form-control">';
    document.getElementById('dialogboxbody').innerHTML += `${
      "<br><h2 id='characterPlayerOneTitle'>Please select your character</h2><h2>"
      + ' 1)'
    }${game.character[0]} 2)${game.character[1]} 3)${game.character[2]} 4)${
      game.character[3]
    }</h2><input id='characterPlayerOne'class = 'form-control'>`;

    if (mode === 2) {
      document.getElementById(
        'dialogboxbody',
      ).innerHTML += `<br><hr><br><h2 id='namePlayerTwoTitle'>${dialog} 2 name</h2>`;
      document.getElementById('dialogboxbody').innerHTML
        += '<br><input id="playerTwoName" class = "form-control">';
      document.getElementById('dialogboxbody').innerHTML += `${
        "<br><h2 id='characterPlayerTwoTitle'>Please select your character</h2><h2>"
        + ' 1)'
      }${game.character[0]} 2)${game.character[1]} 3)${game.character[2]} 4)${
        game.character[3]
      }</h2><input id='characterPlayerTwo'class = 'form-control'>`;
    }
    const okButton = document.createElement('BUTTON');
    okButton.innerHTML = 'OK';
    okButton.classList.add('btn', 'btn-primary', 'form-control');
    okButton.addEventListener('click', () => {
      this.ok();
    });
    document.getElementById('dialogboxfoot').appendChild(okButton);
  };
  this.ok = () => {
    const inputs = getInputs();
    inputs.forEach((inp) => {
      resetInputColor(inp);
    });
    if (checkInputPlayerTwo()) {
      const playerOneName = getPlayersInputs()[0];
      const playerOneCharacter = getPlayersInputs()[1];
      const playerTwoName = getPlayersInputs()[2];
      const playerTwoCharacter = getPlayersInputs()[3];

      checkInput(
        playerOneName,
        playerOneCharacter,
        playerTwoName,
        playerTwoCharacter,
        2,
      );
    } else {
      const playerOneName = getPlayerOneInput()[0];
      const playerOneCharacter = getPlayerOneInput()[1];
      checkInput(playerOneName, playerOneCharacter, 'Computer', '😈', 1);
    }
  };
}

const userInfo = new GetUserInfo();

const takeGameMode = (mode) => {
  userInfo.render('Player', mode);
};

function selectGameMode(dialog) {
  document.getElementById(
    'dialogboxbody',
  ).innerHTML = `<h2 id='nameInputTitle'>${dialog}</h2>`;
  document.getElementById('dialogboxbody').innerHTML
    += '<br><button id="mode1" class = "btn btn-primary"> Player vs Computer</button><br>';
  document.getElementById('dialogboxbody').innerHTML
    += '<br><button id="mode2" class = "btn btn-primary"> Player vs Player</button>';

  document.querySelector('#mode1').addEventListener('click', () => {
    takeGameMode(1);
  });
  document.querySelector('#mode2').addEventListener('click', () => {
    takeGameMode(2);
  });
}

function GameMode() {
  this.render = (dialog) => {
    initialBox();
    selectGameMode(dialog);
  };
}
const gameType = new GameMode();

const removeGame = () => {
  getCells().remove();
  gameType.render('Please select the game mode');
};

function restartGame() {
  const cellsContainer = getCells();
  if (cellsContainer) {
    removeGame();
    game.board = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('dialogboxfoot').children[0].remove();
  }
}

document.addEventListener(
  'DOMContentLoaded',
  gameType.render('Please select the game mode'),
);

document.querySelector('.restart').addEventListener('click', restartGame);
