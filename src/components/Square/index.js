import React from 'react';
import './index.css';

export default function Square({row, col, state, update_board}) {
  const handleClick = () => update_board(row, col);

  return (
    <button className={renderTokenClasses(state)} onClick={handleClick}>{state}</button>
  );
}

const renderTokenClasses = (state) => {
  let classes = 'Square';
  if (state) {
    classes += ` Square--selected Square--p${state}`;
  }
  return classes;
};
