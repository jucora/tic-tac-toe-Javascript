export const gameBoard = (() => {
  const cells = ["", "", "", "", "", "", "", "", ""];
  return { cells };
})();

export const player = (name, character, rol = "human") => ({
  name,
  character,
  rol,
});

export const game = (() => {
  const whoopie = new Audio();
  whoopie.src = "../sound/whoopie.mp3";
  const hereWeGo = new Audio();
  hereWeGo.src = "../sound/here_we_go.mp3";
  const monkey = new Audio();
  monkey.src = "../sound/monkey.mp3";
  monkey.loop = true;
  const laugh = new Audio();
  laugh.src = "../sound/laugh.mp3";

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
