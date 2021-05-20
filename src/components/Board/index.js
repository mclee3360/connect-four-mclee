import React, { useState } from 'react';
import Dropper from '../../components/Dropper/index.js';
import Square from '../../components/Square/index.js';
import checkForWin from './checkWin.js';
import './index.scss';

export default function Board({player, updatePlayer, updateWinner}) {
  const num_rows = 6;
  const num_cols = 7;
  const [boardState, setBoardState] = useState(initBoard(num_rows, num_cols));
  const [disabledDroppers, setDisabledDroppers] = useState(Array(num_cols).fill(false));
  const [winningLine, setWinningLine] = useState([]);

  const dropToken = (col) => {
    const droppedRow = getRowToDrop(boardState, col);

    if (droppedRow < 0) {
      return;
    }

    const newBoardState = boardState.slice();
    const newRowState = newBoardState[droppedRow].slice();
    newRowState[col] = player;
    newBoardState[droppedRow] = newRowState;

    setBoardState(newBoardState);

    const winLine = checkForWin(newBoardState);
    if (winLine.length > 0) {
      setWinningLine(winLine);
      setDisabledDroppers(disabledDroppers.map((dropper) => true));
      updateWinner(player)
      return;
    }

    updatePlayer(swapPlayer(player));
    if (droppedRow === 0) {
      const newDisabledDroppers = disabledDroppers.slice();
      newDisabledDroppers[col] = true;
      setDisabledDroppers(newDisabledDroppers);
    }
  };

  const renderDroppers = (num_cols) => disabledDroppers.map((dropper, col) => (
    <Dropper key={`dropper-${col}`} col={col} dropToken={dropToken} disabled={dropper} />
  ));

  const renderSquares = () => boardState.map((row, i) => row.map((square, j) => {
    const isWinningSquare = winningLine.some((coord) => coord[0] === i && coord[1] === j);
    return <Square key={`${i}-${j}`} winning={isWinningSquare} row={i} col={j} state={boardState[i][j]} />;
  }));

  return (
    <article>
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

const swapPlayer = (player) => {
  return (player - 1) * -1 + 2;
}
