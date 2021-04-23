import React from 'react';
import Square from '../../components/Square/index.js'

export default function Board() {
  return (
    <article>
      {Array.from({ length: 9 }, (x, i) => (renderSquare()))}
    </article>
  );
}

const renderSquare = () => <Square />;
