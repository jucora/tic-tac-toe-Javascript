import whoopieSound from '../sound/whoopie.mp3';
import hereWeGoSound from '../sound/here_we_go.mp3';
import monkeySound from '../sound/monkey.mp3';
import laughSound from '../sound/laugh.mp3';

import gameBoard from './board';

const game = (() => {
  const whoopie = new Audio(whoopieSound);
  const hereWeGo = new Audio(hereWeGoSound);
  const monkey = new Audio(monkeySound);
  monkey.loop = true;
  const laugh = new Audio(laughSound);

  const character = ['😁', '😎', '💩', '😝'];
  const player1 = '';
  const player2 = '';
  const board = gameBoard.cells;
  const currentPlayer = '';

  const gameActive = false;
  const info = document.querySelector('#info');
  const restart = document.querySelector('.restart');

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

export default game;
