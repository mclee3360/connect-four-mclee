import React, { useState } from 'react';
import Board from 'components/Board/index.js';
import Confetti from 'components/Confetti/index.js';
import './index.scss';

export default function Game() {
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(0);
  const [gameCount, setGameCount] = useState(0);

  const renderPlayer = (player, winner) => {
    const playerClasses = `Game-player Game-player--${player}`;
    if (winner) {
      return <p><span className={playerClasses}>Player {winner}</span> Wins!</p>;
    }
    return <p>It’s <span className={playerClasses}>Player {player}’s</span> Turn</p>;
  }
  const renderConfetti = (winner) => winner ? <Confetti loop={false} /> : null;

  const resetGame = () => {
    setPlayer(1);
    setWinner(0);
    setGameCount(gameCount + 1);
  };

  return (
    <article className="Game">
      {renderConfetti(winner)}
      <section className="Game-play">
        <h1 className="Heading--primary">Play Connect 4</h1>
        <Board key={gameCount} player={player} updatePlayer={setPlayer} updateWinner={setWinner} />
      </section>
      <section className="Game-info">
        {renderPlayer(player, winner)}
        <button className="Button" onClick={resetGame}>Reset Game</button>
      </section>
    </article>
  );
}
