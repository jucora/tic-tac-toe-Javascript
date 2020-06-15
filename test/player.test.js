import player from '../src/js/player';

describe('player', () => {
  it('should be defined', () => {
    expect(player).toBeDefined();
  });
  it('should return an object with the player structure', () => {
    const player1 = player.newPlayer('Julian', 1, 'computer');
    expect(player1).toEqual({
      name: 'Julian',
      character: 1,
      rol: 'computer',
    });
  });
  it('should return an object with the player structure, by default the rol should be as human', () => {
    const player1 = player.newPlayer('Julian', 1);
    expect(player1).toEqual({
      name: 'Julian',
      character: 1,
      rol: 'human',
    });
  });
});
