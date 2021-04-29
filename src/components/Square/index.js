import React, { useState } from 'react';
import './index.css';

export default function Square() {
  const [checked, setChecked] = useState(false);
  const handleClickEvent = () => checked || setChecked(true);

  return (
    <button className="Square" onClick={handleClickEvent}>
      <div className="Square-content">{checked ? 'X' : ''}</div>
    </button>
  );
}
