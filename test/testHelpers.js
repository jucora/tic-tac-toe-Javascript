const fakeInputs = () => {
  const div = document.createElement('div');
  div.innerHTML = "<input id= 'playerOneName' value='Player 1 Name'></input>"
    + "<input id= 'characterPlayerOne' value='Player 1 Character'></input>"
    + "<input id= 'playerTwoName' value= 'Player 2 Name'></input>"
    + "<input id= 'characterPlayerTwo' value='Player 2 Character'></input>";
  document.body.appendChild(div);
};

const fakeCells = () => {
  const div = document.createElement('div');
  div.classList.add('cells');
  for (let i = 1; i <= 9; i += 1) {
    div.innerHTML += "<div class='cell'></div>";
  }

  return document.body.appendChild(div);
};

export { fakeInputs, fakeCells };
