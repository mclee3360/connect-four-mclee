import React from 'react';
import './index.scss';

export default function Square({row, col, state, winning}) {
  const renderToken = () => {
    if (state) {
      const classes = `Token Token--p${state}`;
      return <div className={classes}>{state}</div>;
    }
    return null;
  }

  let classes = `Square${winning ? ' Square--winning' : ''}`
  return <div className={classes}>{renderToken()}</div>;
}
