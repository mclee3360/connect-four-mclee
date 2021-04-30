import React, { useState } from 'react';
import Square from '../../components/Square/index.js';
import './index.css';

export default function Board() {
  const num_rows = 6;
  const num_cols = 7;
  const [boardState, setBoardState] = useState(Array(num_rows).fill(Array(num_cols).fill(null)));
  const updateBoard = (i, j) => {
  };
  const renderSquares = (num_rows, num_cols) => boardState.map((row, i) => row.map((square, j) => <Square key={`${i},${j}`} state={boardState[i][j]} update_board={updateBoard} />));

  return (
    <article className="Board Board-connectFour">
      {renderSquares(num_rows, num_cols)}
    </article>
  );
}
