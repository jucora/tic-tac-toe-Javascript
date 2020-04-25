// import {
//   gameType,
//   restartGame,
//   userInfo,
//   game,
//   gameControl,
//   playWhoopie,
// } from './logic';

// export const getCells = () => document.querySelector(".cells");

// export const removeGame = () => {
//   document.querySelector(".cells").remove();
//   gameType.render("Please select the game mode");
// };

// export const gameInfo = (message) => {
//   game.info.textContent = message;
// };

// export const displayWinner = (cells, cell1, cell2, cell3) => {
//   gameInfo(`${game.currentPlayer.name} is the winner`);
//   cells.children[cell1].style.background = "green";
//   cells.children[cell2].style.background = "green";
//   cells.children[cell3].style.background = "green";
// };

// export const displayTie = () => {
//   gameInfo("TIE: No winners this time!");
//   document.querySelectorAll(".cell").forEach((cell) => {
//     cell.style.background = "green";
//   });
// };

// export const displayGame = () => {
//   game.info.textContent = `${game.currentPlayer.name} is playing!`;
//   game.restart.textContent = "Restart Game";
//   const row = document.createElement("div");
//   row.classList.add("row", "cells");
//   for (let i = 0; i < game.board.length; i += 1) {
//     const cell = document.createElement("div");
//     cell.classList.add("col-4", "cell");
//     row.appendChild(cell);
//   }
//   document.querySelector(".container").appendChild(row);

//   document.querySelectorAll(".cell").forEach((cell, index) => {
//     cell.addEventListener("click", () => {
//       playWhoopie();
//       gameControl(cell, index);
//     });
//   });
// };

// export const cellContent = (cell) => cell.textContent;

// export const drawPlayerMove = (cell) => {
//   cell.textContent = game.currentPlayer.character;
// };

// export const drawComputerMove = (id) => {
//   document.querySelector(".cells").children[id].textContent =
//     game.currentPlayer.character;
// };

// export const validInput = (text, input, message) => {
//   document.getElementById(text).textContent = message;
//   document.getElementById(input).style.background = "#F78070";
// };

// export const removeDialogBox = () => {
//   document.getElementById("dialogbox").style.display = "none";
//   document.getElementById("dialogoverlay").style.display = "none";
// };

// export function initialBox() {
//   const winW = window.innerWidth;
//   const winH = window.innerHeight;
//   const dialogoverlay = document.getElementById("dialogoverlay");
//   const dialogbox = document.getElementById("dialogbox");
//   dialogoverlay.style.display = "block";
//   dialogoverlay.style.height = `${winH}px`;
//   dialogbox.style.left = `${winW / 2 - 550 * 0.5}px`;
//   dialogbox.style.top = "100px";
//   dialogbox.style.display = "block";
//   document.getElementById("dialogboxhead").innerHTML =
//     "Welcome to the Tic Tac Toe Game!";
// }

// export function dialogBoxesPlayers(dialog, mode, dialogDetail) {
//   document.getElementById(
//     "dialogboxbody"
//   ).innerHTML = `<h2 id='namePlayerOneTitle'>${dialog}${dialogDetail}</h2>`;

//   document.getElementById("dialogboxbody").innerHTML +=
//     '<br><input id="playerOneName" class = "form-control">';
//   document.getElementById("dialogboxbody").innerHTML += `${
//     "<br><h2 id='characterPlayerOneTitle'>Please select your character</h2><h2>" +
//     " 1)"
//   }${game.character[0]} 2)${game.character[1]} 3)${game.character[2]} 4)${
//     game.character[3]
//   }</h2><input id='characterPlayerOne'class = 'form-control'>`;

//   if (mode === 2) {
//     document.getElementById(
//       "dialogboxbody"
//     ).innerHTML += `<br><hr><br><h2 id='namePlayerTwoTitle'>${dialog} 2 name</h2>`;
//     document.getElementById("dialogboxbody").innerHTML +=
//       '<br><input id="playerTwoName" class = "form-control">';
//     document.getElementById("dialogboxbody").innerHTML += `${
//       "<br><h2 id='characterPlayerTwoTitle'>Please select your character</h2><h2>" +
//       " 1)"
//     }${game.character[0]} 2)${game.character[1]} 3)${game.character[2]} 4)${
//       game.character[3]
//     }</h2><input id='characterPlayerTwo'class = 'form-control'>`;
//   }
//   const okButton = document.createElement("BUTTON");
//   okButton.innerHTML = "OK";
//   okButton.classList.add("btn", "btn-primary", "form-control");
//   okButton.addEventListener("click", () => {
//     userInfo.ok();
//   });
//   document.getElementById("dialogboxfoot").appendChild(okButton);
// }

// export const checkInputPlayerTwo = () =>
//   document.getElementById("playerTwoName");

// export const getPlayersInputs = () => {
//   const playerOneName = document.getElementById("playerOneName").value;
//   const playerOneCharacter = document.getElementById("characterPlayerOne")
//     .value;
//   const playerTwoName = document.getElementById("playerTwoName").value;
//   const playerTwoCharacter = document.getElementById("characterPlayerTwo")
//     .value;

//   return [playerOneName, playerOneCharacter, playerTwoName, playerTwoCharacter];
// };

// export const sameNames = () => {
//   document.querySelector("#namePlayerTwoTitle").textContent =
//     "Player's names should be different!";
//   document.querySelector("#namePlayerOneTitle").textContent =
//     "Player's names should be different!";
// };

// export const sameCharacters = () => {
//   document.querySelector("#characterPlayerOneTitle").textContent =
//     "Players can't have the same character";
//   document.querySelector("#characterPlayerTwoTitle").textContent =
//     "Players can't have the same character";
// };

// export const getPlayerOneInput = () => {
//   const playerOneName = document.getElementById("playerOneName").value;
//   const playerOneCharacter = document.getElementById("characterPlayerOne")
//     .value;
//   return [playerOneName, playerOneCharacter];
// };

// export const takeGameMode = (mode) => {
//   userInfo.render("Player", mode);
// };

// export function selectGameMode(dialog) {
//   document.getElementById(
//     "dialogboxbody"
//   ).innerHTML = `<h2 id='nameInputTitle'>${dialog}</h2>`;
//   document.getElementById("dialogboxbody").innerHTML +=
//     '<br><button id="mode1" class = "btn btn-primary"> Player vs Computer</button><br>';
//   document.getElementById("dialogboxbody").innerHTML +=
//     '<br><button id="mode2" class = "btn btn-primary"> Player vs Player</button>';

//   document.querySelector("#mode1").addEventListener("click", () => {
//     takeGameMode(1);
//   });
//   document.querySelector("#mode2").addEventListener("click", () => {
//     takeGameMode(2);
//   });
// }

// document.addEventListener(
//   "DOMContentLoaded",
//   gameType.render("Please select the game mode")
// );

// document.querySelector(".restart").addEventListener("click", restartGame);
