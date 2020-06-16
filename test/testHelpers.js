import gameBoard from "../src/js/board";

const fakeDom = (() => {
  const container = () => {
    const container = document.createElement("div");
    container.classList.add("container");
    document.body.appendChild(container);
  };

  const gameinfo = () => {
    const info = document.createElement("div");
    info.setAttribute("id", "info");
    return info;
  };
  const cell = () => {
    const cell = document.createElement("div");
    return cell;
  };

  const cells = () => {
    container();
    const row = document.createElement("div");
    row.classList.add("row", "cells");
    for (let i = 0; i < gameBoard.cells.length; i += 1) {
      const cell = document.createElement("div");
      cell.classList.add("col-4", "cell");
      row.appendChild(cell);
    }
    document.querySelector(".container").appendChild(row);
    return row;
  };

  const inputsDifferentValues = () => {
    const div = document.createElement("div");
    div.innerHTML =
      "<h2 id='namePlayerOneTitle'></h2>" +
      "<input id= 'playerOneName' value='Player 1 Name'></input>" +
      "<input id= 'characterPlayerOne' value='Player 1 Character'></input>" +
      "<h2 id='namePlayerTwoTitle'></h2>" +
      "<input id= 'playerTwoName' value= 'Player 2 Name'></input>" +
      "<input id= 'characterPlayerTwo' value='Player 2 Character'></input>";
    document.body.appendChild(div);
  };

  const emptyInputs = () => {
    document.querySelector("#playerOneName").setAttribute("value", "");
    document.querySelector("#playerTwoName").setAttribute("value", "");
  };

  const inputsSameValues = () => {
    document.querySelector("#playerOneName").setAttribute("value", "same name");
    document.querySelector("#playerTwoName").setAttribute("value", "same name");
  };
  return {
    gameinfo,
    cell,
    cells,
    inputsDifferentValues,
    emptyInputs,
    inputsSameValues,
  };
})();

export default fakeDom;
