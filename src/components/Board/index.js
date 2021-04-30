import React, { useState } from 'react';
import Dropper from '../../components/Dropper/index.js';
import Square from '../../components/Square/index.js';
import './index.css';

export default function Board() {
  const num_rows = 6;
  const num_cols = 7;
  const [boardState, setBoardState] = useState(initBoard(num_rows, num_cols));
  const [disabledDroppers, setDisabledDroppers] = useState(Array(num_cols).fill(false))
  const [p1Turn, setP1Turn] = useState(true);

  const dropToken = (col) => {
    const droppedRow = getRowToDrop(boardState, col);

    if (droppedRow < 0) {
      return;
    }

    const newBoardState = boardState.slice();
    const newRowState = newBoardState[droppedRow].slice();
    newRowState[col] = p1Turn ? 1 : 2;
    newBoardState[droppedRow] = newRowState;

    setBoardState(newBoardState);
    setP1Turn(!p1Turn);

    if (checkForWin(newBoardState)) {
      setDisabledDroppers(disabledDroppers.map((dropper) => true));
      return;
    };

    if (droppedRow === 0) {
      const newDisabledDroppers = disabledDroppers.slice();
      newDisabledDroppers[col] = true;
      setDisabledDroppers(newDisabledDroppers);
    }
  };

  const renderDroppers = (num_cols) => disabledDroppers.map((dropper, col) => (
    <Dropper key={`dropper-${col}`} col={col} dropToken={dropToken} disabled={dropper} />
  ));

  const renderSquares = () => boardState.map((row, i) => row.map((square, j) => (
    <Square key={`${i}-${j}`} row={i} col={j} state={boardState[i][j]} />
  )));

  return (
    <article className="PlayingArea">
      <section className="Droppers">{renderDroppers(num_cols)}</section>
      <section className="Board">{renderSquares()}</section>
    </article>
  );
}

const initBoard = (rows, cols) => {
  const board = Array(rows).fill(null);
  return board.map((row) => Array(cols).fill(null));
};

const getRowToDrop = (board, col) => {
  for (let row = board.length - 1; row >= 0; row--) {
    if (!board[row][col]) {
      return row;
    }
  }
  return -1;
};

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
