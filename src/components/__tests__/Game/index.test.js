import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from 'components/Game/index.js';

const mockPlay = jest.fn();
const mockStop = jest.fn();
jest.mock('use-sound', () => ((file, settings) => [mockPlay, { stop: mockStop }]));

const addConfetti = () => {
  const confetti = document.createElement('div');
  confetti.classList.add('Confetti');
  document.body.appendChild(confetti);
};
const removeConfetti = () => {
  document.querySelectorAll('.Confetti').forEach((confetti) => confetti.remove());
};
jest.mock('canvas-confetti', () => {
  const confetti = () => {
    confetti.reset = removeConfetti;
    addConfetti();
    return confetti;
  };
  return confetti();
});

describe('Game', () => {
  it('should display which player’s turn it is', async () => {
    render(<Game />);
    await waitFor(() => expect(document.querySelector('.Game-info').textContent).toMatch(/Player 1/));
    await waitFor(() => userEvent.click(document.querySelector('.Dropper')));
    await waitFor(() => expect(document.querySelector('.Game-info').textContent).toMatch(/Player 2/));
  });

  describe('when the game is won', () => {
    beforeEach(async () => {
      render(<Game />);
      await waitFor(() => userEvent.click(document.querySelectorAll('.Dropper')[1]));
      await waitFor(() => userEvent.click(document.querySelectorAll('.Dropper')[0]));
      await waitFor(() => userEvent.click(document.querySelectorAll('.Dropper')[1]));
      await waitFor(() => userEvent.click(document.querySelectorAll('.Dropper')[0]));
      await waitFor(() => userEvent.click(document.querySelectorAll('.Dropper')[1]));
      await waitFor(() => userEvent.click(document.querySelectorAll('.Dropper')[0]));
      await waitFor(() => userEvent.click(document.querySelectorAll('.Dropper')[1]));
    });
    it('should render confetti', async () => {
      await waitFor(() => expect(document.querySelector('.Confetti')).toBeTruthy());
    });
    it('should display the winning player', async () => {
      await waitFor(() => expect(document.querySelector('.Game-info').textContent).toMatch(/Player 1 Wins/));
    });
  });
});
