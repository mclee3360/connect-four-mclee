import React, { useState } from 'react';
import Square from '../../components/Square/index.js';
import './index.css';

export default function Board() {
  const num_rows = 6;
  const num_cols = 7;
  const [boardState, setBoardState] = useState(initBoard(num_rows, num_cols));

  const updateBoard = (i, j) => {
    const newState = boardState.slice();
    const newRowState = boardState[i].slice();
    newRowState[j] = 1;
    newState[i] = newRowState;
    setBoardState(newState);
  };

  const renderSquares = (num_rows, num_cols) => boardState.map((row, i) => row.map((square, j) => {
    return <Square key={`${i}-${j}`} row={i} col={j} state={boardState[i][j]} update_board={updateBoard} />;
  }));

  return (
    <article className="Board Board-connectFour">
      {renderSquares(num_rows, num_cols)}
    </article>
  );
}

const initBoard = (rows, cols) => {
  const board = Array(rows).fill(null);
  return board.map((row) => Array(cols).fill(null));
};
