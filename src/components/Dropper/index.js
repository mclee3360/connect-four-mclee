import React from 'react';
import './index.scss';

export default function Dropper({col, disabled, dropToken}) {
  const handleClick = () => dropToken(col);

  return (
    <div className="DropperWrapper">
      <button className={renderDropperClasses(disabled)} onClick={handleClick} disabled={disabled}>
        {disabled ? '🌚' : '🔽'}
      </button>
    </div>
  );
}

const renderDropperClasses = (disabled) => {
  let classes = 'Dropper';
  if (disabled) {
    classes += ' Dropper--disabled';
  }
  return classes;
};
