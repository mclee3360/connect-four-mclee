import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropper from 'components/Dropper/index.js';

describe('Dropper', () => {
  describe('when rendering a disabled dropper', () => {
    it('should disable the button', async () => {
      render(<Dropper disabled={true} />);
      await waitFor(() => {
        const button = document.querySelector('button');
        expect(button.classList.contains('Dropper--disabled')).toBeTruthy();
        expect(button.disabled).toBeTruthy();
      });
    });

    it('should not handle an onclick event', async () => {
      const click = jest.fn();
      render(<Dropper disabled={true} dropToken={click}/>);
      await waitFor(() => userEvent.click(document.querySelector('button')));
      await waitFor(() => expect(click).not.toHaveBeenCalled());
    });
  });

  describe('when rendering an active dropper', () => {
    it('should not disable the button', async () => {
      render(<Dropper />);
      await waitFor(() => {
        const button = document.querySelector('button');
        expect(button.classList.contains('Dropper--disabled')).toBeFalsy();
        expect(button.disabled).toBeFalsy();
      });
    });

    it('should handle an onclick event', async () => {
      const click = jest.fn();
      render(<Dropper dropToken={click}/>);
      await waitFor(() => userEvent.click(document.querySelector('button')));
      await waitFor(() => expect(click).toHaveBeenCalled());
    });
  });
});
