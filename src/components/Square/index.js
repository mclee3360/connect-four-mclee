import React from 'react';
import './index.css';

export default function Square({row, col, state, winning}) {
  return <div className={renderTokenClasses(state, winning)}>{state}</div>;
}

const renderTokenClasses = (state, winning) => {
  let classes = 'Square';
  if (state) {
    classes += ` Square--selected Square--p${state}`;
  }
  if (winning) {
    classes += ' Square--winning';
  }
  return classes;
};
