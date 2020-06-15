import game from '../src/js/game';
import gameBoard from '../src/js/board';

describe('game', () => {
  it('should be defined', () => {
    expect(game).toBeDefined();
  });
  it('should contain all audio files for the game', () => {
    expect(game.whoopie).toBeInstanceOf(Audio);
    expect(game.hereWeGo).toBeInstanceOf(Audio);
    expect(game.monkey).toBeInstanceOf(Audio);
    expect(game.laugh).toBeInstanceOf(Audio);
  });
  it('should have the loop option ON, for the main music background', () => {
    expect(game.monkey.loop).toBe(true);
  });
  it('should contain an array with all character options for players', () => {
    expect(game.character).toEqual(['😁', '😎', '💩', '😝']);
  });
  it('should contain PLAYER empty variables that will be used during the game', () => {
    expect(game.player1).toBe('');
    expect(game.player2).toBe('');
    expect(game.currentPlayer).toBe('');
  });
  it('should contain a board', () => {
    expect(game.board).toEqual(['', '', '', '', '', '', '', '', '']);
  });
  test('the board should be a copy of gameBoard', () => {
    expect(game.board).toBe(gameBoard.cells);
  });
  it('should be inactive at the beginning', () => {
    expect(game.gameActive).toBe(false);
  });
});
