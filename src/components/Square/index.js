import React from 'react';
import './index.css';

export default function Square({row, col, state}) {
  return <div className={renderTokenClasses(state)}>{state}</div>;
}

const renderTokenClasses = (state) => {
  let classes = 'Square';
  if (state) {
    classes += ` Square--selected Square--p${state}`;
  }
  return classes;
};
