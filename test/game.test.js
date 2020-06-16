import game from '../src/js/game';

describe('game', () => {
  it('should be defined', () => {
    expect(game).toBeDefined();
  });
  it('should contain PLAYER empty variables that will be used during the game', () => {
    expect(game.player1).toBe('');
    expect(game.player2).toBe('');
    expect(game.currentPlayer).toBe('');
  });
  it('should be inactive at the beginning', () => {
    expect(game.gameActive).toBeFalsy();
  });
});
