import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react'
import Square from 'components/Square/index.js';

describe('Square', () => {
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

  describe('when Square has not been assigned a state', () => {
    it('should not render a token', async () => {
      act(() => { render(<Square row={2} col={4} state={0} winning={false} />, container); });
      await waitFor(() => {
        const square = container.querySelector('.Square');
        expect(square.innerHTML).toBeFalsy()
      });
    });
  });

  describe('when Square has been assigned a state', () => {
    it('should render a token', async () => {
      act(() => { render(<Square row={2} col={4} state={1} winning={false} />, container); });
      await waitFor(() => {
        const token = container.querySelector('.Square .Token');
        expect(token).toBeTruthy();
        expect(token.innerHTML).toBe('1');
      });
    });
  });
});
