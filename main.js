const gameBoard = (() => {
  let board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  const getBoard = () => board;

  const pickSquare = (row, column, sign) => {
    board[row][column] = sign;
  };

  const printBoard = () => {
    console.log(board);
  };

  return { getBoard, pickSquare, printBoard };
})();


const gameFlow = (() => {
  const board = gameBoard;
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
    console.log(`${getActivePlayer().name}'s turn.`)
  }

  const checkForWinner = () => {
    const boardLayout = gameBoard.getBoard()
    for (let i = 0; i < 3; i++) {
        if (boardLayout[0][i] === boardLayout[1][i] & boardLayout[0][i] === boardLayout[2][i]) {
            console.log(boardLayout[0][i])
            return boardLayout[0][i]
        } else if (boardLayout[i][0] === boardLayout[i][1] & boardLayout[i][0] === boardLayout[i][2]) {
            console.log(boardLayout[i][0]) 
            return boardLayout[i][0]
        }
    }
    if (boardLayout[0][0] === boardLayout[1][1] & boardLayout[0][0] === boardLayout[2][2]){
        console.log(boardLayout[0][0])
        return boardLayout[0][0]
    } else if (boardLayout[0][2] === boardLayout[1][1] & boardLayout[0][2] === boardLayout[2][0]) {
        console.log(boardLayout[0][2])
        return boardLayout[0][2]
    }
}

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name}'s Turn`);
    board.pickSquare(row, column, getActivePlayer().sign)

    checkForWinner();
    switchTurn();
    printNewRound();
  };

  return { playRound, getActivePlayer };
})();

const screenController = () => {
  
}