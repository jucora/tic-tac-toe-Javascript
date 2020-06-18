import gameBoard from '../src/js/board';

describe('gameBoard', () => {
  it('should be defined', () => {
    expect(gameBoard).toBeDefined();
  });
  it('should return an array of 9 empty strings', () => {
    expect(gameBoard.cells).toEqual(['', '', '', '', '', '', '', '', '']);
  });
});
