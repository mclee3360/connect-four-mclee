import React, { useState } from 'react';
import Board from '../../components/Board/index.js';
import './index.css';

export default function Game() {
  const [player, setPlayer] = useState(1);

  return (
    <article class="Game">
      <section class="Game-play">
        <h1>Connect 4</h1>
        <Board player={player} updatePlayer={setPlayer} />
      </section>
      <section>
        <p>It’s Player {player}’s Turn</p>
      </section>
    </article>
  );
}
