import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Dropper from 'components/Dropper/index.js';

describe('Dropper', () => {
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

  describe('when rendering a disabled dropper', () => {
    it('should disable the button', async () => {
      act(() => { render(<Dropper disabled={true} />, container); });
      const button = container.querySelector('button');
      await waitFor(() => {
        expect(button.classList.contains('Dropper--disabled')).toBeTruthy();
        expect(button.disabled).toBeTruthy();
      });
    });

    it('should not handle an onclick event', async () => {
      const click = jest.fn();
      act(() => { render(<Dropper disabled={true} dropToken={click}/>, container); });
      act(() => { userEvent.click(container.querySelector('button')); })
      await waitFor(() => expect(click).not.toHaveBeenCalled());
    });
  });

  describe('when rendering an active dropper', () => {
    it('should not disable the button', async () => {
      act(() => { render(<Dropper />, container); });
      const button = container.querySelector('button');
      await waitFor(() => {
        expect(button.classList.contains('Dropper--disabled')).toBeFalsy();
        expect(button.disabled).toBeFalsy();
      });
    });

    it('should handle an onclick event', async () => {
      const click = jest.fn();
      act(() => { render(<Dropper dropToken={click}/>, container); });
      act(() => { userEvent.click(container.querySelector('button')); })
      await waitFor(() => expect(click).toHaveBeenCalled());
    });
  });
});
