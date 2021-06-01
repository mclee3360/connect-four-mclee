import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react'
import Sound from 'components/Sound/index.js';

let mockPlay = jest.fn();
let mockStop = jest.fn();
jest.mock('use-sound', () => ((file, settings) => [mockPlay, { stop: mockStop }]));

describe('Sound', () => {
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

  it('should not render anything on the DOM', async () => {
    act(() => { render(<Sound file="test.mp3" volume={0.5} />, container); });
    await waitFor(() => expect(container.innerHTML).toBeFalsy());
  });

  it('should play on mount', async () => {
    act(() => { render(<Sound file="test.mp3" volume={0.5} />, container); });
    await waitFor(() => expect(mockPlay).toHaveBeenCalled());
  });

  it('should stop on unmount', async() => {
    act(() => { render(<Sound file="test.mp3" volume={0.5} />, container); });
    act(() => { unmountComponentAtNode(container); });
    await waitFor(() => expect(mockStop).toHaveBeenCalled());
  });
});
