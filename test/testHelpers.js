const removeFakeDom = () => {
  document.body.innerHTML = "";
};

const fakeInputs = () => {
  const div = document.createElement("div");
  div.innerHTML =
    "<input id= 'playerOneName' value='Player 1 Name'></input>" +
    "<input id= 'characterPlayerOne' value='Player 1 Character'></input>" +
    "<input id= 'playerTwoName' value= 'Player 2 Name'></input>" +
    "<input id= 'characterPlayerTwo' value='Player 2 Character'></input>";
  document.body.appendChild(div);
};

const fakeEmptyInputs = () => {
  const div = document.createElement("div");
  div.innerHTML =
    "<h2 id='namePlayerOneTitle'></h2>" +
    "<input id= 'playerOneName' value=''></input>" +
    "<input id= 'characterPlayerOne' value='Player 1 Character'></input>" +
    "<h2 id='namePlayerTwoTitle'></h2>" +
    "<input id= 'playerTwoName' value= ''></input>" +
    "<input id= 'characterPlayerTwo' value='Player 2 Character'></input>";
  document.body.appendChild(div);
};

const fakeInputsSameName = () => {
  const div = document.createElement("div");
  div.innerHTML =
    "<h2 id='namePlayerOneTitle'></h2>" +
    "<input id= 'playerOneName' value='same name'></input>" +
    "<input id= 'characterPlayerOne' value='Player 1 Character'></input>" +
    "<h2 id='namePlayerTwoTitle'></h2>" +
    "<input id= 'playerTwoName' value= 'same name'></input>" +
    "<input id= 'characterPlayerTwo' value='Player 2 Character'></input>";
  document.body.appendChild(div);
};

export { removeFakeDom, fakeInputs, fakeEmptyInputs, fakeInputsSameName };
