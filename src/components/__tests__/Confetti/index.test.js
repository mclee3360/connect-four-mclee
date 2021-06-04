import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
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
  it('should render a sound component', async () => {
    render(<Confetti loop={true} />);
    await waitFor(() => expect(document.querySelector('.Sound')).toBeTruthy());
  });

  it('should render confetti on mount', async () => {
    render(<Confetti loop={true} />);
    await waitFor(() => expect(document.querySelector('.Confetti')).toBeTruthy());
  });

  it('should remove confetti on dismount', async () => {
    const { unmount } = render(<Confetti loop={true} />);
    unmount();
    await waitFor(() => {
      expect(document.querySelector('.Sound')).toBeFalsy();
      expect(document.querySelector('.Confetti')).toBeFalsy();
    });
  });
});
