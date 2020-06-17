const fakeDom = (() => {
  const globalStructure = () => {
    document.body.innerHTML = " <div class='container'>"
      + "<h1 class='title'>Tic Tac Toe Game</h1>"
      + "<div class='info-container'>"
      + "<div id='info'></div>"
      + "<div class='restart'>Restart Game</div>"
      + "</div><div class='row cells'>"
      + "<div class='col-4 cell'></div>"
      + "<div class='col-4 cell'></div>"
      + "<div class='col-4 cell'></div>"
      + "<div class='col-4 cell'></div>"
      + "<div class='col-4 cell'></div>"
      + "<div class='col-4 cell'></div>"
      + "<div class='col-4 cell'></div>"
      + "<div class='col-4 cell'></div>"
      + "<div class='col-4 cell'></div>"
      + "</div></div><script src='app.js'></script>"
      + "<div id='dialogoverlay' style='display: none; height: 312px;'>"
      + "</div><div id='dialogbox' style='left: 345px; top: 100px; display: none;'>"
      + "<div><div id='dialogboxhead'>Welcome to the Tic Tac Toe Game!</div>"
      + "<div id='dialogboxbody'><h2 id='namePlayerOneTitle'>Player 1 name</h2><br>"
      + "<input id='playerOneName' class='form-control' style='background: rgb(255, 255, 255);' value='Player 1 Name'>"
      + "<br><h2 id='characterPlayerOneTitle'>Please select your character</h2>"
      + '<h2> 1)😁 2)😎 3)💩 4)😝</h2>'
      + "<input id='characterPlayerOne' class='form-control' style='background: rgb(255, 255, 255);' value='Player 1 Character'>"
      + "<br><hr><br><h2 id='namePlayerTwoTitle'>Player 2 name</h2>"
      + "<br><input id='playerTwoName' class='form-control' style='background: rgb(255, 255, 255);' value='Player 2 Name'>"
      + "<br><h2 id='characterPlayerTwoTitle'>Please select your character</h2>"
      + '<h2> 1)😁 2)😎 3)💩 4)😝</h2>'
      + "<input id='characterPlayerTwo' class='form-control' style='background: rgb(255, 255, 255);'value='Player 2 Character'>"
      + "</div><div id='dialogboxfoot'><button class='btn btn-primary form-control'>OK</button></div></div></div>";
  };

  const emptyInputs = () => {
    document.querySelector('#playerOneName').setAttribute('value', '');
    document.querySelector('#playerTwoName').setAttribute('value', '');
  };

  const inputsSameValues = () => {
    document.querySelector('#playerOneName').setAttribute('value', 'same name');
    document.querySelector('#playerTwoName').setAttribute('value', 'same name');
  };
  return {
    globalStructure,
    emptyInputs,
    inputsSameValues,
  };
})();

export default fakeDom;
