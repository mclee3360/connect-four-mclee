import React from 'react';
import './index.scss';

export default function Dropper({player, col, disabled, dropToken}) {
  const handleClick = () => dropToken(col);

  return (
    <div className="DropperWrapper">
      <button className={renderDropperClasses(player, disabled)} onClick={handleClick} disabled={disabled}></button>
    </div>
  );
}

const renderDropperClasses = (player, disabled) => `Dropper Dropper--p${player}${disabled ? ' Dropper--disabled' : ''}`;
