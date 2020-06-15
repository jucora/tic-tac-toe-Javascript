const fakeDom = (() => {
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
    inputsDifferentValues,
    emptyInputs,
    inputsSameValues,
  };
})();

export default fakeDom;
