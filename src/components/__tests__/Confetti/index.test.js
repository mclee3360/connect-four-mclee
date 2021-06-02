import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react'
import Confetti from 'components/Confetti/index.js';

const addConfetti = () => {
  const confetti = document.createElement('div');
  confetti.classList.add('Confetti');
  document.body.appendChild(confetti);
};

const removeConfetti = () => {
  document.querySelectorAll('.Confetti').forEach((confetti) => confetti.remove());
};

jest.mock('components/Sound/index.js', () => (() => <div className="Sound"></div>));
jest.mock('canvas-confetti', () => {
  const confetti = () => {
    confetti.reset = removeConfetti;
    addConfetti();
    return confetti;
  };
  return confetti();
});

describe('Confetti', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should render a sound component', async () => {
    act(() => { render(<Confetti loop={true} />, container); });
    await waitFor(() => expect(container.querySelector('.Sound')).toBeTruthy());
  });

  it('should render confetti on mount', async () => {
    act(() => { render(<Confetti loop={true} />, container); });
    await waitFor(() => expect(document.querySelector('.Confetti')).toBeTruthy());
  });

  it('should remove confetti on dismount', async () => {
    act(() => { render(<Confetti loop={true} />, container); });
    act(() => { unmountComponentAtNode(container); });
    await waitFor(() => {
      expect(container.querySelector('.Sound')).toBeFalsy();
      expect(document.querySelector('.Confetti')).toBeFalsy();
    });
  });
});
