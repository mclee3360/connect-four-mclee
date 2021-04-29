import React from 'react';
import Column from '../../components/Column/index.js';
import './index.css';

export default function Board({num_rows}) {
  const renderCol = (index, num_rows) => <Column key={index} num_rows={num_rows} />;

  return (
    <article className="Board">
      {Array.from({ length: num_rows }, (x, i) => (renderCol(i, num_rows)))}
    </article>
  );
}
