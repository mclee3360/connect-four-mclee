import React from 'react';
import useSound from 'use-sound';
import './index.scss';
import dropEffect from 'assets/drop.mp3';

export default function Dropper({player, col, disabled, dropToken}) {
  const [playDrop] = useSound(dropEffect, { volume: 0.2 });
  const handleClick = () => {
    dropToken(col);
    playDrop();
  };

  return (
    <div className="DropperWrapper">
      <button className={renderDropperClasses(player, disabled)} onClick={handleClick} disabled={disabled}></button>
    </div>
  );
}

const renderDropperClasses = (player, disabled) => `Dropper Dropper--p${player}${disabled ? ' Dropper--disabled' : ''}`;
