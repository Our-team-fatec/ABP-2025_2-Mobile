import React from 'react';
import renderer, { act } from 'react-test-renderer';
import App from '../src/App';

describe('App Component', () => {
  it('deve renderizar corretamente', async () => {
    let tree;
    await act(async () => {
      tree = renderer.create(<App />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  }, 20000);
});