import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../src/App';

describe('App Component', () => {
  it('deve renderizar sem erros', () => {
    const component = render(<App />);
    expect(component).toBeTruthy();
  });

  it('deve conter o texto DaVinciPets', () => {
    const { getByText } = render(<App />);
    expect(getByText('DaVinciPets')).toBeTruthy();
  });

  it('deve conter o texto de boas-vindas', () => {
    const { getByText } = render(<App />);
    expect(getByText('Bem-vindo ao DaVinciPets!')).toBeTruthy();
  });
});