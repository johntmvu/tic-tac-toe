const gameBoard = () => {
  const rows = 3;
  const columns = 3;
  let board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(square());
    }
  }

  const getBoard = () => board;

  const pickSquare = (row, column, sign) => {
    board[row][column].fillSquare(sign);
  };

  const printBoard = () => {
    const boardWithValues = board.map((row) =>
      row.map((square) => square.getValue())
    );
    console.log(board)
    console.log(boardWithValues);
  };

  return { getBoard, pickSquare, printBoard };
};

const square = () => {
  let value = null;

  const fillSquare = (sign) => {
    value = sign;
  };

  const getValue = () => value;

  return { fillSquare, getValue };
};

const gameFlow = () => {
  const board = gameBoard();
  const players = [
    {
      name: "Player One",
      sign: "X",
    },
    {
      name: "Player Two",
      sign: "O",
    },
  ];

  let activePlayer = players[0];

  const switchTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const checkForWinner = () => {
    const boardLayout = board.getBoard();

    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        boardLayout[i][0] &&
        boardLayout[i][0] === boardLayout[i][1] &&
        boardLayout[i][0] === boardLayout[i][2]
      ) {
        return boardLayout[i][0]; // Return the winning sign
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        boardLayout[0][i] &&
        boardLayout[0][i] === boardLayout[1][i] &&
        boardLayout[0][i] === boardLayout[2][i]
      ) {
        return boardLayout[0][i]; // Return the winning sign
      }
    }

    // Check diagonals
    if (
      boardLayout[0][0] &&
      boardLayout[0][0] === boardLayout[1][1] &&
      boardLayout[0][0] === boardLayout[2][2]
    ) {
      return boardLayout[0][0]; // Return the winning sign
    }

    if (
      boardLayout[0][2] &&
      boardLayout[0][2] === boardLayout[1][1] &&
      boardLayout[0][2] === boardLayout[2][0]
    ) {
      return boardLayout[0][2]; // Return the winning sign
    }

    return null; // Return null if no winner
  };

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name}'s Turn`);
    board.pickSquare(row, column, getActivePlayer().sign);

    const winner = checkForWinner();
    if (winner) {
      console.log(`${winner} wins!`);
      // Handle end of game logic here
    } else {
      switchTurn();
      printNewRound();
    }
  };

  return { playRound, getActivePlayer, getBoard: board.getBoard };
};

const screenController = (() => {
  const game = gameFlow();
  const boardDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector(".turn")

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    board.forEach((row, rowIndex) => {
      row.forEach((square, columnIndex) => {
        const squareButton = document.createElement("button");
        squareButton.classList.add("square");

        squareButton.dataset.row = rowIndex;
        squareButton.dataset.column = columnIndex;
        squareButton.textContent = square.getValue();
        boardDiv.appendChild(squareButton);
      });
    });
  };

  function clickHandler(e) {
    const column = e.target.dataset.column;
    const row = e.target.dataset.row;

    if (!row || !column) return;

    game.playRound(row, column);
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandler);

  updateScreen();
})();
