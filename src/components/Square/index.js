import React from 'react';
import './index.css';

export default function Square({row, col, state, winning, corner}) {
  const renderToken = () => {
    if (state) {
      const classes = `Token Token--p${state}`;
      return <div className={classes}>{state}</div>;
    }
    return null;
  }

  let classes = `Square${winning ? ' Square--winning' : ''}`
  if (corner) {
    classes += ' Square--corner';
    return <span className={classes}>{renderToken()}</span>;
  }
  return <div className={classes}>{renderToken()}</div>;
}
