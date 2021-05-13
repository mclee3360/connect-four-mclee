import React, { useState } from 'react';
import Board from '../../components/Board/index.js';
import './index.css';

export default function Game() {
  const [player, setPlayer] = useState(1);

  return (
    <Board player={player} updatePlayer={setPlayer} />
  );
}
