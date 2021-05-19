import React from 'react';
import './index.css';

export default function Square({row, col, state, winning, corner}) {
  const renderToken = () => {
    if (state) {
      const classes = `Token Token--p${state}${winning ? ' Token--winning' : ''}`;
      return <div className={classes}>{state}</div>;
    }
    return null;
  }

  if (corner) {
    return <span className='Square Square-corner'>{renderToken()}</span>;
  }
  return <div className='Square'>{renderToken()}</div>;
}
