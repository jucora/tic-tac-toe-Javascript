/* eslint-disable no-unused-vars */
/* global character, game */
function initialBox() {
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const dialogoverlay = document.getElementById('dialogoverlay');
  const dialogbox = document.getElementById('dialogbox');
  dialogoverlay.style.display = 'block';
  dialogoverlay.style.height = `${winH}px`;
  dialogbox.style.left = `${winW / 2 - 550 * 0.5}px`;
  dialogbox.style.top = '100px';
  dialogbox.style.display = 'block';
  document.getElementById('dialogboxhead').innerHTML = 'Welcome to the Tic Tac Toe Game!';
}

function dialogBoxesPlayers(dialog, func, mode, dialogDetail) {
  document.getElementById(
    'dialogboxbody',
  ).innerHTML = `<h2 id='namePlayerOneTitle'>${dialog}${dialogDetail}</h2>`;

  document.getElementById('dialogboxbody').innerHTML
    += '<br><input id="playerOneName" class = "form-control">';
  document.getElementById('dialogboxbody').innerHTML += `${
    "<br><h2 id='characterPlayerOneTitle'>Please select your character</h2><h2>"
    + ' 1)'
  }${game.character[0]} 2)${game.character[1]} 3)${game.character[2]} 4)${
    game.character[3]
  }</h2><input id='characterPlayerOne'class = 'form-control'>`;

  if (mode === 2) {
    document.getElementById(
      'dialogboxbody',
    ).innerHTML += `<br><hr><br><h2 id='namePlayerTwoTitle'>${dialog} 2 name</h2>`;
    document.getElementById('dialogboxbody').innerHTML
      += '<br><input id="playerTwoName" class = "form-control">';
    document.getElementById('dialogboxbody').innerHTML += `${
      "<br><h2 id='characterPlayerTwoTitle'>Please select your character</h2><h2>"
      + ' 1)'
    }${game.character[0]} 2)${game.character[1]} 3)${game.character[2]} 4)${
      game.character[3]
    }</h2><input id='characterPlayerTwo'class = 'form-control'>`;
  }
  document.getElementById(
    'dialogboxfoot',
  ).innerHTML = `<button class = 'btn btn-primary form-control' onclick="userInfo.ok('${func}')">OK`;
}

function selectGameMode(dialog) {
  document.getElementById(
    'dialogboxbody',
  ).innerHTML = `<h2 id='nameInputTitle'>${dialog}</h2>`;
  document.getElementById('dialogboxbody').innerHTML
    += '<br><button id="mode1" class = "btn btn-primary"> Player vs Computer</button><br>';
  document.getElementById('dialogboxbody').innerHTML
    += '<br><button id="mode2" class = "btn btn-primary"> Player vs Player</button>';
}
