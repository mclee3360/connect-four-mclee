import React from 'react';
import Square from '../../components/Square/index.js';

export default function Column({num_rows}) {
  const renderSquare = (index) => <Square key={index} />;
  
  return (
    <section className="Column">
      {Array.from({ length: num_rows }, (x, i) => (renderSquare(i)))}
    </section>
  );
}
