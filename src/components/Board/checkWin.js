const checkForWin = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
      for (const direction of directions) {
        let line = getLine(board, i, j, direction[0], direction[1]);
        if (line.length > 0) {
          return line;
        }
      }
    }
  }
  return [];
};

const getLine = (board, startRow, startCol, rowDirection, colDirection) => {
  if (!isInBounds(board, startRow, startCol, rowDirection, colDirection)) {
    return [];
  }
  if (!board[startRow][startCol]) {
    return [];
  }

  const rowInc = directionIncrement(rowDirection);
  const colInc = directionIncrement(colDirection);

  if (
    board[startRow][startCol] === board[startRow + rowInc][startCol + colInc] &&
    board[startRow][startCol] === board[startRow + rowInc * 2][startCol + colInc * 2] &&
    board[startRow][startCol] === board[startRow + rowInc * 3][startCol + colInc * 3]
  ) {
    return [
      [startRow, startCol],
      [startRow + rowInc, startCol + colInc],
      [startRow + rowInc * 2, startCol + colInc * 2],
      [startRow + rowInc * 3, startCol + colInc * 3]
    ];
  }
  return [];
};

const isInBounds = (board, startRow, startCol, rowDirection, colDirection) => {
  if (startRow < 0 || startCol < 0 || startRow >= board.length || startCol >= board[0].length) {
    return false;
  }
  if (
    (rowDirection < 0 && startRow < 3) ||
    (rowDirection > 0 && startRow >= board.length - 3) ||
    (colDirection < 0 && startCol < 3) ||
    (colDirection > 0 && startCol >= board[0].length - 3)
  ) {
    return false;
  }
  return true;
};

const directionIncrement = (direction) => {
  if (direction > 0) {
    return 1;
  } else if (direction < 0) {
    return -1;
  }
  return 0;
};

export default checkForWin;
export { getLine, isInBounds };
