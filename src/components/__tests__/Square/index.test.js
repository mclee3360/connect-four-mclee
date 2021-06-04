import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import Square from 'components/Square/index.js';

describe('Square', () => {
  it('should not render a token when state not assigned', async () => {
    render(<Square row={2} col={4} state={0} winning={false} />);
    await waitFor(() => expect(document.querySelector('.Square').innerHTML).toBeFalsy());
  });

  it('should render a token when assigned a state', async () => {
    render(<Square row={2} col={4} state={1} winning={false} />);
    await waitFor(() => {
      const token = document.querySelector('.Square .Token');
      expect(token).toBeTruthy();
      expect(token.innerHTML).toBe('1');
    });
  });
});
