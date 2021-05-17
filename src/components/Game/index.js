import React, { useState } from 'react';
import Board from '../../components/Board/index.js';
import './index.css';

export default function Game() {
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(0);
  const [gameCount, setGameCount] = useState(0);

  const renderPlayer = (player, winner) => {
    if (winner) {
      return <p>Player {winner} Wins!</p>;
    }
    return <p>It’s Player {player}’s Turn</p>;
  }

  const resetGame = () => {
    setPlayer(1);
    setWinner(0);
    setGameCount(gameCount + 1);
  };

  return (
    <article className="Game">
      <section className="Game-play">
        <h1>Connect 4</h1>
        <Board key={gameCount} player={player} updatePlayer={setPlayer} updateWinner={setWinner} />
      </section>
      <section>
        {renderPlayer(player, winner)}
        <button onClick={resetGame}>Reset Game</button>
      </section>
    </article>
  );
}
