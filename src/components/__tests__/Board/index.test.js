import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Board from 'components/Board/index.js';

const mockPlay = jest.fn();
const mockStop = jest.fn();
jest.mock('use-sound', () => ((file, settings) => [mockPlay, { stop: mockStop }]));

describe('Board', () => {
  let updatePlayer, updateWinner;

  it('should render Droppers for the number of columns', async () => {
    render(<Board player={1} updatePlayer={updatePlayer} updateWinner={updateWinner} />);
    await waitFor(() => expect(document.querySelectorAll('.Dropper').length).toBe(7));
  });

  it('should render Squares for the number of rows x columns', async () => {
    render(<Board player={1} updatePlayer={updatePlayer} updateWinner={updateWinner} />);
    await waitFor(() => expect(document.querySelectorAll('.Square').length).toBe(42));
  });

  describe('when dropping a token', () => {
    it('should call to update player', async () => {
      updatePlayer = jest.fn();
      render(<Board player={1} updatePlayer={updatePlayer} updateWinner={updateWinner} />);
      await waitFor(() => userEvent.click(document.querySelector('.Dropper')));
      await waitFor(() => expect(updatePlayer).toHaveBeenCalled());
    });

    it('should render a token on the bottom row of the clicked column', async () => {
      updatePlayer = jest.fn();
      render(<Board player={1} updatePlayer={updatePlayer} updateWinner={updateWinner} />);

      await waitFor(() => userEvent.click(document.querySelectorAll('.Dropper')[1]));
      await waitFor(() => expect(document.querySelectorAll('.Square')[7 * 5 + 1].querySelector('.Token')).toBeTruthy());
    });

    it('should disable dropper when column gets full', async () => {
      updatePlayer = jest.fn();
      let player = 1;
      const { rerender } = render(<Board player={player} updatePlayer={updatePlayer} updateWinner={updateWinner} />);
      for (let i = 0; i < 6; i++) {
        await waitFor(() => userEvent.click(document.querySelectorAll('.Dropper')[1]));
        player = player === 1 ? 2 : 1;
        rerender(<Board player={player} updatePlayer={updatePlayer} updateWinner={updateWinner} />);
      }
      await waitFor(() => {
        const dropper = document.querySelectorAll('.Dropper')[1];
        expect(dropper.disabled).toBeTruthy()
      });
    });
  });

  describe('when the game is won', () => {
    beforeEach(async () => {
      updatePlayer = jest.fn();
      updateWinner = jest.fn();
      render(<Board player={1} updatePlayer={updatePlayer} updateWinner={updateWinner} />);
      for (let i = 1; i < 5; i++) {
        await waitFor(() => userEvent.click(document.querySelectorAll('.Dropper')[i]));
      }
    });

    it('should disable all droppers', async () => {
      await waitFor(() => {
        document.querySelectorAll('.Dropper').forEach((dropper) => expect(dropper.disabled).toBeTruthy());
      });
    });

    it('should call to update winner', async () => {
      await waitFor(() => expect(updateWinner).toHaveBeenCalled());
    });
  });
});
