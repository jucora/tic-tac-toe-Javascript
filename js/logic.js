const gameBoard = (() => {
  const board = ["*", "*", "*", "*", "*", "*", "*", "*", "*"];
  return board;
})();

const player = (name, symbol) => {
  return { name, symbol };
};

const control = () => {
  [];
};

//FUNCTIONS
function start() {
  row = document.querySelector(".row");
  const newBoard = gameBoard;
  for (const cell of newBoard) {
    let square = document.createElement("div");
    square.textContent = cell;
    square.classList.add("col-4", "cell");
    row.appendChild(square);
  }
}

//EVENT LISTENER
document.addEventListener("DOMContentLoaded", start());
