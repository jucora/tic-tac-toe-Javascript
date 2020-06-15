import audio from '../src/js/audio';

describe('audio', () => {
  it('should be defined', () => {
    expect(audio).toBeDefined();
  });
  it('should contain background music called: monkey', () => {
    expect(audio.monkey).toBeInstanceOf(Audio);
  });
  test('The background music should have the loop option ON', () => {
    expect(audio.monkey.loop).toBe(true);
  });
  it('should contain an audio called: whoopie that will be played every time a board cell is selected', () => {
    expect(audio.whoopie).toBeInstanceOf(Audio);
  });
  it('should contain an audio called: hereWeGo, when the game starts', () => {
    expect(audio.hereWeGo).toBeInstanceOf(Audio);
  });
  it('should contain an audio called: laugh, that will be played when one of the players win the game', () => {
    expect(audio.laugh).toBeInstanceOf(Audio);
  });
});
