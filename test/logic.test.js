import player from "../src/js/player";
import gameBoard from "../src/js/board";
import game from "../src/js/game";

import {
  getInputs,
  getPlayersInputs,
  validInput,
  removeDialogBox,
  playWhoopie,
  cellContent,
  drawPlayerMove,
  drawComputerMove,
  checkWinner,
  gameInfo,
  displayWinner,
  getCells,
  setWinner,
  getEmptySpaces,
  displayTie,
  isTie,
  winnerOrTie,
  checkTie,
  minimax,
  gameControl,
  infoContainer,
  gameTitle,
  displayGame,
  start,
  invalidNumber,
  sameNameValidation,
  emptyNameValidation,
  differentIndexValidation,
  validIndexCharacter,
  setPlayers,
  getReady,
  checkInput,
  getPlayerOneInput,
  setDialogDetail,
  opponentController,
  GetUserInfo,
  takeGameMode,
  selectGameMode,
  GameMode,
  gameType,
} from "../src/js/logic";

/** ******** DOM SIMULATION ********* */

import fakeDom from "./testHelpers";

beforeAll(() => {
  fakeDom.globalStructure();
});

/** ********************************* */

describe("getInputs", () => {
  it("should be defined", () => {
    expect(getInputs).toBeDefined();
  });
  it("should be an instance of Array", () => {
    expect(getInputs()).toBeInstanceOf(Array);
  });
  it("should have a length of 4", () => {
    expect(getInputs()).toHaveLength(4);
  });
});

describe("getPlayersInputs", () => {
  it("should be defined", () => {
    expect(getPlayersInputs).toBeDefined();
  });
  it("should be an instance of Array", () => {
    expect(getPlayersInputs()).toBeInstanceOf(Array);
  });
  it("should have a lenght of 4", () => {
    expect(getPlayersInputs()).toHaveLength(4);
  });
  it("should return an array with inputs values", () => {
    expect(getPlayersInputs()).toEqual([
      "Player 1 Name",
      "Player 1 Character",
      "Player 2 Name",
      "Player 2 Character",
    ]);
  });
});

describe("validInput", () => {
  it("should be defined", () => {
    expect(validInput).toBeDefined();
  });
  it("should display a message when an input validation error occurs and change the input background", () => {
    const text = "namePlayerOneTitle";
    const input = "playerOneName";
    const message = "Name can't be empty!";
    validInput(text, input, message);
    expect(document.getElementById(text).textContent).toBe(message);
    expect(document.getElementById(input).style.background).toEqual(
      "rgb(247, 128, 112)"
    );
  });
});

describe("removeDialogBox", () => {
  it("should be defined", () => {
    expect(removeDialogBox).toBeDefined();
  });
  it("should remove the dialog box to start the game", () => {
    removeDialogBox();
    expect(document.getElementById("dialogbox").style.display).toBe("none");
  });
  it("should remove the dialog overlay to start the game", () => {
    expect(document.getElementById("dialogoverlay").style.display).toBe("none");
  });
});

describe("playWhoopie", () => {
  it("should be defined", () => {
    expect(playWhoopie).toBeDefined();
  });
  // pendding audio play test
});

describe("cellContent", () => {
  it("should be defined", () => {
    expect(cellContent).toBeDefined();
  });
  it("should return the text content of any board cell", () => {
    const cell = document.querySelector(".cells").children[3];
    cell.textContent = "😎";
    expect(cellContent(cell)).toBe("😎");
  });
});

describe("drawPlayerMove", () => {
  it("should be defined", () => {
    expect(drawPlayerMove).toBeDefined();
  });
  it("should set the player character inside the cell when the cell is selected by the user", () => {
    const player1 = player.newPlayer("Julian", "😎", "human");
    game.currentPlayer = player1;
    const cell = document.querySelector(".cells").children[1];
    drawPlayerMove(cell);
    expect(cell.textContent).toBe("😎");
  });
});

describe("drawComputerMove", () => {
  it("should be defined", () => {
    expect(drawComputerMove).toBeDefined();
  });
  it("should set the computer character in the cell when the computer selects the cell", () => {
    const computer = player.newPlayer("Computer", "😈", "computer");
    game.currentPlayer = computer;
    const id = 2;
    const cells = document.querySelector(".cells");
    drawComputerMove(id);
    expect(cells.children[id].textContent).toBe("😈");
  });
});

describe("checkWinner", () => {
  it("should return true when there is a winner and also return winner positions", () => {
    // Example 1:
    const board = ["😎", "😎", "😎", "", "", "", "", "", ""];
    const currentPlayer = "😎";
    expect(checkWinner(board, currentPlayer)).toEqual([true, 0, 1, 2]);
    // Example 2:
    const board2 = ["💩", "", "", "", "💩", "", "", "", "💩"];
    const currentPlayer2 = "💩";
    expect(checkWinner(board2, currentPlayer2)).toEqual([true, 0, 4, 8]);
  });
  it("should return false when there is not a winner", () => {
    const board3 = ["😎", "😎", "", "😎", "", "", "", "", ""];
    const currentPlayer3 = "😎";
    expect(checkWinner(board3, currentPlayer3)).toBeFalsy();
  });
});

describe("gameInfo", () => {
  it("should be defined", () => {
    expect(gameInfo).toBeDefined();
  });
  it("should display information about the status of the game", () => {
    game.info = document.querySelector("#info");
    const player1 = player.newPlayer("Julian", "😎", "human");
    game.currentPlayer = player1;
    const message = `${game.currentPlayer.name} is the winner`;
    gameInfo(message);
    expect(game.info.textContent).toBe("Julian is the winner");
  });
});

describe("displayWinner", () => {
  it("should be defined", () => {
    expect(displayWinner).toBeDefined();
  });
  it("should mark the winner cells with a green color", () => {
    const cells = document.querySelector(".cells");
    const cell1 = 0;
    const cell2 = 1;
    const cell3 = 2;
    displayWinner(cells, cell1, cell2, cell3);
    expect(cells.children[cell1].style.background).toBe("green");
    expect(cells.children[cell2].style.background).toBe("green");
    expect(cells.children[cell3].style.background).toBe("green");
  });
});

describe("getCells", () => {
  it("should be defined", () => {
    expect(getCells).toBeDefined();
  });
  it("should get the cells of the board", () => {
    expect(getCells().children.length).toBe(9);
  });
});

describe("setWinner", () => {
  it("should be defined", () => {
    expect(setWinner).toBeDefined();
  });
  it("should set the game as inactive", () => {
    const cell1 = 0;
    const cell2 = 1;
    const cell3 = 2;
    setWinner(cell1, cell2, cell3);
    expect(game.gameActive).toBeFalsy();
  });
});

describe("getEmptySpaces", () => {
  it("should return an array with the empty board spaces indices", () => {
    const gameData = ["😎", "💩", "😎", "", "", "", "", "", ""];
    expect(getEmptySpaces(gameData)).toHaveLength(6);
    expect(getEmptySpaces(gameData)).toEqual([3, 4, 5, 6, 7, 8]);
  });
});

describe("displayTie", () => {
  it("should be defined", () => {
    expect(displayTie).toBeDefined();
  });
  it("should set the color green to all cells when there is a tie", () => {
    displayTie();
    document.querySelectorAll(".cell").forEach((cell) => {
      expect(cell.style.background).toBe("green");
    });
  });
});

describe("isTie", () => {
  it("should return true when there are not more spaces in the board", () => {
    gameBoard.cells = ["😎", "💩", "😎", "💩", "😎", "😎", "💩", "😎", "💩"];
    expect(isTie()).toBeTruthy();
  });
  it("should set the game as inactive", () => {
    game.gameActive = true;
    isTie();
    expect(game.gameActive).toBeFalsy();
  });
  it("should set the current player as null", () => {
    game.currentPlayer = player.newPlayer("Julian", "😎", "human");
    isTie();
    expect(game.currentPlayer).toBeNull();
  });
  it("should return false when the board still have spaces", () => {
    gameBoard.cells = ["😎", "💩", "😎", "💩", "😎", "😎", "💩", "😎", ""];
    game.currentPlayer = { name: "gamerName" };
    expect(isTie()).toBeFalsy();
  });
});

describe("winnerOrTie", () => {
  it("should be defined", () => {
    expect(winnerOrTie).toBeDefined();
  });
});

describe("checkTie", () => {
  it("return true if there are not more spaces in the board", () => {
    gameBoard.cells = ["😎", "💩", "😎", "💩", "😎", "😎", "💩", "😎", "💩"];
    expect(checkTie()).toBeTruthy();
  });
  it("return false if there are not more spaces in the board", () => {
    gameBoard.cells = ["😎", "💩", "😎", "💩", "😎", "😎", "💩", "😎", ""];
    expect(checkTie()).toBeFalsy();
  });
});

describe("minimax", () => {
  it("should evaluate when the human player is close to win so it will select the best movement", () => {
    gameBoard.cells = ["😎", "😎", "", "", "", "", "", "", ""];
    game.player2 = player.newPlayer("gamerName", "😎", "human");
    expect(minimax(gameBoard.cells, game.player2.character)).toEqual({
      evaluation: +10,
      id: 2,
    });
  });
  it("should select the best movement for the computer when computer is close to win", () => {
    gameBoard.cells = ["😈", "😈", "", "", "", "", "", "", ""];
    game.player1 = player.newPlayer("computer", "😈", "computer");
    expect(minimax(gameBoard.cells, game.player1.character)).toEqual({
      evaluation: -10,
      id: 2,
    });
  });
});

describe("gameControl", () => {
  it("should be defined", () => {
    expect(gameControl).toBeDefined();
  });
  // pending
});

describe("infoContainer", () => {
  expect(infoContainer).toBeDefined();
});

describe("gameTitle", () => {
  expect(gameTitle).toBeDefined();
});

describe("displayGame", () => {
  it("should be defined", () => {
    expect(displayGame).toBeDefined();
  });
  it("should display the current user when the game starts", () => {
    game.currentPlayer = player.newPlayer("Julian", "😎", "human");
    displayGame();
    expect(game.info.textContent).toBe("Julian is playing!");
  });
});

describe("start", () => {
  it("should be defined", () => {
    expect(start).toBeDefined();
  });
  it("should set the game as active", () => {
    game.gameActive = false;
    start();
    expect(game.gameActive).toBeTruthy();
  });
});

describe("invalidNumber", () => {
  it("should be defined", () => {
    expect(invalidNumber).toBeDefined();
  });
  it("should return true if an input value is not an integer", () => {
    const index = "a";
    expect(invalidNumber(index)).toBeTruthy();
  });
  it("should return false if an input value is an integer", () => {
    const index = 4;
    expect(invalidNumber(index)).toBeFalsy();
  });
});

describe("sameNameValidation", () => {
  it("should return true if players names are present and are different", () => {
    const playerOneName = getPlayersInputs()[0];
    const playerTwoName = getPlayersInputs()[2];
    expect(sameNameValidation(playerOneName, playerTwoName)).toBeTruthy();
  });

  it("should return false if both players names are equal", () => {
    fakeDom.inputsSameValues();
    const playerOneName = getPlayersInputs()[0];
    const playerTwoName = getPlayersInputs()[2];
    expect(sameNameValidation(playerOneName, playerTwoName)).toBeFalsy();
  });
});

describe("emptyNameValidation", () => {
  it("should be defined", () => {
    expect(emptyNameValidation).toBeDefined();
  });
  it("should return false if both players names are not present", () => {
    fakeDom.emptyInputs();
    const playerOneName = getPlayersInputs()[0];
    const playerTwoName = getPlayersInputs()[2];
    expect(emptyNameValidation(playerOneName, playerTwoName)).toBeFalsy();
  });
});

describe("differentIndexValidation", () => {
  it("should return false if Player1 character is equal than Player2 character", () => {
    const index1 = 1;
    const index2 = 1;
    expect(differentIndexValidation(index1, index2)).toBeFalsy();
  });
});

describe("validIndexCharacter", () => {
  it("should be defined", () => {
    expect(validIndexCharacter).toBeDefined();
  });
  it("should return false if the user selects a string as a character", () => {
    const index = "a";
    expect(validIndexCharacter(index)).toBeFalsy();
  });
  it("should return false if the user selects a value less than 1", () => {
    const index = 0;
    expect(validIndexCharacter(index)).toBeFalsy();
  });
  it("should return false if the user selects a value greater than 4", () => {
    const index = 5;
    expect(validIndexCharacter(index)).toBeFalsy();
  });

  it("should return true if Player1 and Player2 passed all the last validations", () => {
    const index1 = 1;
    const index2 = 2;
    const mode = 2;
    expect(validIndexCharacter(index1, index2, mode)).toBeTruthy();
  });
});

describe("setPlayers", () => {
  const name1 = "Julian";
  const index1 = 1;
  const name2 = "Ana";
  const index2 = 2;
  let mode = 2;
  it("should be defined", () => {
    expect(setPlayers).toBeDefined();
  });

  it("should set player 1", () => {
    setPlayers(name1, index1, name2, index2, mode);
    expect(game.player1).toEqual({
      name: "Julian",
      character: "😁",
      rol: "human",
    });
  });
  it("should set player 2", () => {
    setPlayers(name1, index1, name2, index2, mode);
    expect(game.player2).toEqual({
      name: "Ana",
      character: "😎",
      rol: "human",
    });
  });
  it("should set player 2 as computer rol if the game mode is 1", () => {
    mode = 1;
    setPlayers(name1, index1, name2, index2, mode);
    expect(game.player2.rol).toEqual("computer");
  });
});

describe("getReady", () => {
  it("should be defined", () => {
    expect(getReady).toBeDefined();
  });
  it("should set the player 1 as the current player when the game is ready to start", () => {
    getReady();
    expect(game.currentPlayer).toBe(game.player1);
  });
});

describe("checkInput", () => {
  it("should be defined", () => {
    expect(checkInput).toBeDefined();
  });
  it("should set a name as valid after validation filters", () => {
    const name1 = "Julian";
    const index1 = 1;
    const name2 = "Ana";
    const index2 = 2;
    const mode = 2;
    checkInput(name1, index1, name2, index2, mode);
    expect(
      emptyNameValidation(name1, name2) && sameNameValidation(name1, name2)
    ).toBeTruthy();
  });
  it("should set an index as valid after validation filters", () => {
    const index1 = 1;
    const index2 = 2;
    const mode = 2;
    expect(
      validIndexCharacter(index1, index2, mode) &&
        differentIndexValidation(index1, index2)
    ).toBeTruthy();
  });
});

describe("getPlayerOneInput", () => {
  it("should return an array with the name and character of the player 1", () => {
    const playerOneName = document.getElementById("playerOneName").value;
    const playerOneCharacter = document.getElementById("characterPlayerOne")
      .value;
    expect(getPlayerOneInput()).toEqual([playerOneName, playerOneCharacter]);
  });
});

describe("setDialogDetail", () => {
  it("should display a dialog detail for player1  as: name, when the game is Player VS Computer", () => {
    const mode = 1;
    expect(setDialogDetail(mode)).toBe(" name");
  });
  it("should display a dialog detail for player 1 as:  1 name, when the game is Player1 VS Player2", () => {
    const mode = 2;
    expect(setDialogDetail(mode)).toBe(" 1 name");
  });
});

describe("opponentController", () => {
  it("should be defined", () => {
    expect(opponentController).toBeDefined();
  });
});

describe("GetUserInfo", () => {
  it("should be defined", () => {
    expect(GetUserInfo).toBeDefined();
  });
});

describe("takeGameMode", () => {
  it("should be defined", () => {
    expect(takeGameMode).toBeDefined();
  });
});

describe("selectGameMode", () => {
  it("should be defined", () => {
    expect(selectGameMode).toBeDefined();
  });
});
describe("GameMode", () => {
  it("should be defined", () => {
    expect(GameMode).toBeDefined();
  });
});
describe("gameType", () => {
  it("should be defined", () => {
    expect(gameType).toBeDefined();
  });
});
