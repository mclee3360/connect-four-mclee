import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import Sound from 'components/Sound/index.js';

let mockPlay = jest.fn();
let mockStop = jest.fn();
jest.mock('use-sound', () => ((file, settings) => [mockPlay, { stop: mockStop }]));

describe('Sound', () => {
  it('should not render anything on the DOM', async () => {
    render(<Sound file="test.mp3" volume={0.5} />);
    await waitFor(() => expect(document.innerHTML).toBeFalsy());
  });

  it('should play on mount', async () => {
    render(<Sound file="test.mp3" volume={0.5} />);
    await waitFor(() => expect(mockPlay).toHaveBeenCalled());
  });

  it('should stop on unmount', async() => {
    const { unmount } = render(<Sound file="test.mp3" volume={0.5} />);
    unmount();
    await waitFor(() => expect(mockStop).toHaveBeenCalled());
  });
});
