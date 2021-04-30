const checkForWin = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (
        (j < 4 && checkForHorizontalWin(board, i, j)) ||
        ((i < 3) && (
          checkForVerticalWin(board, i, j) ||
          (j < 4 && checkForDiagRightWin(board, i, j)) ||
          (j > 2 && checkForDiagLeftWin(board, i, j))
        ))
      ) {
        return true;
      }
    }
  }
  return false;
};

const checkForHorizontalWin = (board, startRow, startCol) => {
  if (startCol > board[startRow].length - 4) {
    return false;
  }
  if (!board[startRow][startCol]) {
    return false;
  }
  return (
    board[startRow][startCol] === board[startRow][startCol + 1] &&
    board[startRow][startCol] === board[startRow][startCol + 2] &&
    board[startRow][startCol] === board[startRow][startCol + 3]
  );
};

const checkForVerticalWin = (board, startRow, startCol) => {
  if (startRow > board.length - 4) {
    return false;
  }
  if (!board[startRow][startCol]) {
    return false;
  }
  return (
    board[startRow][startCol] === board[startRow + 1][startCol] &&
    board[startRow][startCol] === board[startRow + 2][startCol] &&
    board[startRow][startCol] === board[startRow + 3][startCol]
  );
};

const checkForDiagRightWin = (board, startRow, startCol) => {
  if (startCol > board[startRow].length - 4 || startRow > board.length - 4) {
    return false;
  }
  if (!board[startRow][startCol]) {
    return false;
  }
  return (
    board[startRow][startCol] === board[startRow + 1][startCol + 1] &&
    board[startRow][startCol] === board[startRow + 2][startCol + 2] &&
    board[startRow][startCol] === board[startRow + 3][startCol + 3]
  );
};

const checkForDiagLeftWin = (board, startRow, startCol) => {
  if (startCol < board[startRow].length - 4 || startRow > board.length - 4) {
    return false;
  }
  if (!board[startRow][startCol]) {
    return false;
  }
  return (
    board[startRow][startCol] === board[startRow + 1][startCol - 1] &&
    board[startRow][startCol] === board[startRow + 2][startCol - 2] &&
    board[startRow][startCol] === board[startRow + 3][startCol - 3]
  );
};

export default checkForWin;
