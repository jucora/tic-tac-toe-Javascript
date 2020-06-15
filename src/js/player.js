const player = (() => {
  const character = ['😁', '😎', '💩', '😝'];
  const newPlayer = (name, character, rol = 'human') => ({
    name,
    character,
    rol,
  });
  return { character, newPlayer };
})();

export default player;
