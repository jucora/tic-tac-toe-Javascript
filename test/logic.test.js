import player from "../src/js/player";
import gameBoard from "../src/js/board";
import game from "../src/js/game";
import audio from "../src/js/audio";

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
  displayGame,
  start,
  invalidNumber,
  nameValidation,
  invalidCharacter,
  checkInput,
  getPlayerOneInput,
  resetInputColor,
  setDialogDetail,
  GetUserInfo,
  takeGameMode,
  selectGameMode,
  GameMode,
  gameType,
  removeGame,
  restartGame,
} from "../src/js/logic";

/** ******** DOM SIMULATION ********* */

import fakeDom from "./testHelpers";

beforeAll(() => {
  fakeDom.inputsDifferentValues();
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
  //pendding audio play test
});

describe("cellContent", () => {
  it("should be defined", () => {
    expect(cellContent).toBeDefined();
  });
  it("should return the text content of any board cell", () => {
    const cell = fakeDom.cell();
    cell.textContent = "";
    expect(cellContent(cell)).toBe("");
  });
});

describe("drawPlayerMove", () => {
  it("should be defined", () => {
    expect(drawPlayerMove).toBeDefined();
  });
  it("should set the player character inside the cell when the cell is selected by the user", () => {
    const player1 = player.newPlayer("Julian", "😎", "human");
    game.currentPlayer = player1;
    const cell = fakeDom.cell();
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
    const cells = fakeDom.cells();
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
    game.info = fakeDom.gameinfo();
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
    const cells = fakeDom.cells();
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
    const cell1 = 0,
      cell2 = 1,
      cell3 = 2;
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
});

describe("isTie", () => {
  game.info = fakeDom.gameinfo();
  it("should return true when there are not more spaces in the board", () => {
    gameBoard.cells = ["😎", "💩", "😎", "💩", "😎", "😎", "💩", "😎", "💩"];
    expect(isTie()).toBeTruthy();
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
});

describe("displayGame", () => {
  it("should be defined", () => {
    expect(displayGame).toBeDefined();
  });
});

describe("start", () => {
  it("should be defined", () => {
    expect(start).toBeDefined();
  });
});

describe("invalidNumber", () => {
  it("should be defined", () => {
    expect(invalidNumber).toBeDefined();
  });
});

describe("nameValidation", () => {
  it("should return true if players names are present and are different", () => {
    const playerOneName = getPlayersInputs()[0];
    const playerTwoName = getPlayersInputs()[2];
    expect(nameValidation(playerOneName, playerTwoName)).toBeTruthy();
  });
  it("should return false if both players names are not present", () => {
    fakeDom.emptyInputs();
    const playerOneName = getPlayersInputs()[0];
    const playerTwoName = getPlayersInputs()[2];
    expect(nameValidation(playerOneName, playerTwoName)).toBeFalsy();
  });
  it("should return false if both players names are equal", () => {
    fakeDom.inputsSameValues();
    const playerOneName = getPlayersInputs()[0];
    const playerTwoName = getPlayersInputs()[2];
    expect(nameValidation(playerOneName, playerTwoName)).toBeFalsy();
  });
});

describe("invalidCharacter", () => {
  it("should be defined", () => {
    expect(invalidCharacter).toBeDefined();
  });
});

describe("checkInput", () => {
  it("should be defined", () => {
    expect(checkInput).toBeDefined();
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

describe("resetInputColor", () => {
  it("should be defined", () => {
    expect(resetInputColor).toBeDefined();
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

describe("removeGame", () => {
  it("should be defined", () => {
    expect(removeGame).toBeDefined();
  });
});
describe("restartGame", () => {
  it("should be defined", () => {
    expect(restartGame).toBeDefined();
  });
});
