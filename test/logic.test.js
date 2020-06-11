import { game, player } from '../src/js/factories';

import {
  getInputs,
  getPlayersInputs,
  checkWinner,
  setWinner,
  getEmptySpaces,
  isTie,
  winnerOrTie,
  checkTie,
  minimax,
} from '../src/js/logic';
import { fakeInputs, fakeCells } from './testHelpers';

/** ******** DOM SIMULATION ********* */

fakeInputs();
fakeCells();

/** ********************************* */

describe('getInputs', () => {
  it('should be defined', () => {
    expect(getInputs).toBeDefined();
  });
  it('should be an instance of Array', () => {
    expect(getInputs()).toBeInstanceOf(Array);
  });
  it('should have a length of 4', () => {
    expect(getInputs()).toHaveLength(4);
  });
  // pending return type input tag
});

describe('getPlayersInputs', () => {
  it('should be defined', () => {
    expect(getPlayersInputs).toBeDefined();
  });
  it('should be an instance of Array', () => {
    expect(getPlayersInputs()).toBeInstanceOf(Array);
  });
  it('should have a lenght of 4', () => {
    expect(getPlayersInputs()).toHaveLength(4);
  });
  it('should return an array with inputs values', () => {
    expect(getPlayersInputs()).toEqual([
      'Player 1 Name',
      'Player 1 Character',
      'Player 2 Name',
      'Player 2 Character',
    ]);
  });
});

// validInput
// removeDialogBox
// playWhoopie
// cellContent
// drawPlayerMove

describe('checkWinner', () => {
  it('should return true when there is a winner and also return winner positions', () => {
    // Example 1:
    const board = ['😎', '😎', '😎', '', '', '', '', '', ''];
    const currentPlayer = '😎';
    expect(checkWinner(board, currentPlayer)).toEqual([true, 0, 1, 2]);
    // Example 2:
    const board2 = ['💩', '', '', '', '💩', '', '', '', '💩'];
    const currentPlayer2 = '💩';
    expect(checkWinner(board2, currentPlayer2)).toEqual([true, 0, 4, 8]);
  });
  it('should return false when there is not a winner', () => {
    const board3 = ['😎', '😎', '', '😎', '', '', '', '', ''];
    const currentPlayer3 = '😎';
    expect(checkWinner(board3, currentPlayer3)).toBeFalsy();
  });
});

// gameInfo
// displayWinner
// getCells
// setWinner

describe('getEmptySpaces', () => {
  it('should return an array with the empty board spaces indices', () => {
    const gameData = ['😎', '💩', '😎', '', '', '', '', '', ''];
    expect(getEmptySpaces(gameData)).toHaveLength(6);
    expect(getEmptySpaces(gameData)).toEqual([3, 4, 5, 6, 7, 8]);
  });
});

// displayTie

describe('isTie', () => {
  it('should return true when there are not more spaces in the board', () => {
    game.board = ['😎', '💩', '😎', '💩', '😎', '😎', '💩', '😎', '💩'];
    expect(isTie()).toBeTruthy();
  });
  it('should return false when the board still have spaces', () => {
    game.board = ['😎', '💩', '😎', '💩', '😎', '😎', '💩', '😎', ''];
    game.currentPlayer = { name: 'gamerName' };
    expect(isTie()).toBeFalsy();
  });
});

// winnerOrTie

describe('checkTie', () => {
  it('return true if there are not more spaces in the board', () => {
    game.board = ['😎', '💩', '😎', '💩', '😎', '😎', '💩', '😎', '💩'];
    expect(checkTie()).toBeTruthy();
  });
  it('return false if there are not more spaces in the board', () => {
    game.board = ['😎', '💩', '😎', '💩', '😎', '😎', '💩', '😎', ''];
    expect(checkTie()).toBeFalsy();
  });
});

describe('minimax', () => {
  it('should evaluate when the human player is close to win so it will select the best movement', () => {
    game.board = ['😎', '😎', '', '', '', '', '', '', ''];
    game.player2 = player('gamerName', '😎', 'human');
    expect(minimax(game.board, game.player2.character)).toEqual({
      evaluation: +10,
      id: 2,
    });
  });
  it('should select the best movement for the computer when computer is close to win', () => {
    game.board = ['😈', '😈', '', '', '', '', '', '', ''];
    game.player1 = player('computer', '😈', 'computer');
    expect(minimax(game.board, game.player1.character)).toEqual({
      evaluation: -10,
      id: 2,
    });
  });
});

// gameControl
// displayGame
// start
// invalidNumber

describe('nameValidation', () => {
  it('should return false if the');
});
