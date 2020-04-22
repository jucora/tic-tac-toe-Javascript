/* eslint-disable no-unused-vars */
/* global character, game, info, row:writable */
function initialBox() {
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const dialogoverlay = document.getElementById("dialogoverlay");
  const dialogbox = document.getElementById("dialogbox");
  dialogoverlay.style.display = "block";
  dialogoverlay.style.height = `${winH}px`;
  dialogbox.style.left = `${winW / 2 - 550 * 0.5}px`;
  dialogbox.style.top = "100px";
  dialogbox.style.display = "block";
  document.getElementById("dialogboxhead").innerHTML =
    "Welcome to the Tic Tac Toe Game!";
}

const getCells = () => {
  return document.querySelector(".cells");
};

const removeGame = () => {
  document.querySelector(".cells").remove();
  gameType.render("Please select the game mode");
};

const deleteKeySound = () => {
  document.querySelectorAll(".cell").forEach((c) => {
    c.removeAttribute("onmousedown");
  });
};

const gameInfo = (message) => {
  game.info.textContent = message;
};

const displayWinner = (cells, cell1, cell2, cell3) => {
  gameInfo(`${game.currentPlayer.name} is the winner`);
  cells.children[cell1].style.background = "green";
  cells.children[cell2].style.background = "green";
  cells.children[cell3].style.background = "green";
};

const displayTie = () => {
  gameInfo("TIE: No winners this time!");
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.style.background = "green";
  });
};

function dialogBoxesPlayers(dialog, func, mode, dialogDetail) {
  document.getElementById(
    "dialogboxbody"
  ).innerHTML = `<h2 id='namePlayerOneTitle'>${dialog}${dialogDetail}</h2>`;

  document.getElementById("dialogboxbody").innerHTML +=
    '<br><input id="playerOneName" class = "form-control">';
  document.getElementById("dialogboxbody").innerHTML += `${
    "<br><h2 id='characterPlayerOneTitle'>Please select your character</h2><h2>" +
    " 1)"
  }${game.character[0]} 2)${game.character[1]} 3)${game.character[2]} 4)${
    game.character[3]
  }</h2><input id='characterPlayerOne'class = 'form-control'>`;

  if (mode === 2) {
    document.getElementById(
      "dialogboxbody"
    ).innerHTML += `<br><hr><br><h2 id='namePlayerTwoTitle'>${dialog} 2 name</h2>`;
    document.getElementById("dialogboxbody").innerHTML +=
      '<br><input id="playerTwoName" class = "form-control">';
    document.getElementById("dialogboxbody").innerHTML += `${
      "<br><h2 id='characterPlayerTwoTitle'>Please select your character</h2><h2>" +
      " 1)"
    }${game.character[0]} 2)${game.character[1]} 3)${game.character[2]} 4)${
      game.character[3]
    }</h2><input id='characterPlayerTwo'class = 'form-control'>`;
  }
  document.getElementById(
    "dialogboxfoot"
  ).innerHTML = `<button class = 'btn btn-primary form-control' onclick="userInfo.ok('${func}')">OK`;
}

function selectGameMode(dialog) {
  document.getElementById(
    "dialogboxbody"
  ).innerHTML = `<h2 id='nameInputTitle'>${dialog}</h2>`;
  document.getElementById("dialogboxbody").innerHTML +=
    '<br><button id="mode1" class = "btn btn-primary"> Player vs Computer</button><br>';
  document.getElementById("dialogboxbody").innerHTML +=
    '<br><button id="mode2" class = "btn btn-primary"> Player vs Player</button>';
}

function displayGame() {
  info.textContent = `${game.currentPlayer.name} is playing!`;
  game.restart.textContent = "Restart Game";
  row = document.createElement("div");
  row.classList.add("row", "cells");
  for (let i = 0; i < game.board.length; i += 1) {
    const cell = document.createElement("div");
    cell.classList.add("col-4", "cell");
    cell.setAttribute("onmousedown", "game.whoopie.play()");
    row.appendChild(cell);
  }
  document.querySelector(".container").appendChild(row);
}
