import React from 'react';
import { act } from 'react-test-renderer';
import renderer from 'react-test-renderer';
import App from '../src/App';

describe('App Component', () => {
  it('deve renderizar corretamente', () => {
    let tree;
    act(() => {
      tree = renderer.create(<App />).toJSON();
    });
    expect(tree).toMatchSnapshot();
  });
});