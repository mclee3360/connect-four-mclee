import React from 'react';
import './index.css';

export default function Square({state, update_board}) {
  const handleClick = () => update_board();

  return (
    <button className="Square" onClick={handleClick}>
      <div className="Square-content"></div>
    </button>
  );
}
