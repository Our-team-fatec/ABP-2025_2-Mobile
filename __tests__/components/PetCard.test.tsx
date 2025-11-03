import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PetCard from '../../src/components/PetCard';
import type { PetData, PetStatus, PetStatusType } from '../../src/types/pet';

describe('PetCard', () => {
  const mockPet: PetData = {
    name: 'Rex',
    breed: 'Vira-lata',
    species: 'Cachorro',
    gender: 'Macho',
    age: 'Cadastrado em 02/11/2025',
    color: 'Caramelo',
    weight: 'Médio porte',
    image: {
      id: 'img-1',
      url: 'https://example.com/dog.jpg',
      titulo: 'Rex.jpg',
      descricao: null,
      pet_id: 'test-id-1',
      criado_em: '2025-11-02T00:00:00Z',
      atualizado_em: '2025-11-02T00:00:00Z',
      removido_em: null
    },
    status: [
      { label: 'Vacinação em dia', type: 'aviso' as PetStatusType }
    ]
  };

  const mockOnView = jest.fn();

  it('deve renderizar todas as informações do pet', () => {
    const { getByText } = render(
      <PetCard pet={mockPet} onView={mockOnView} />
    );

    expect(getByText('Rex')).toBeTruthy();
    expect(getByText('Vacinação em dia')).toBeTruthy();
    expect(getByText(/Vira-lata • Macho • Cadastrado em 02\/11\/2025/)).toBeTruthy();
  });

  it('deve chamar onView quando o botão ver é clicado', () => {
    const { getByText } = render(
      <PetCard pet={mockPet} onView={mockOnView} />
    );

    fireEvent.press(getByText('Ver'));
    expect(mockOnView).toHaveBeenCalled();
  });

  it('deve exibir mensagem quando não há status', () => {
    const petSemStatus = { ...mockPet, status: [] };
    const { getByText } = render(
      <PetCard pet={petSemStatus} onView={mockOnView} />
    );

    expect(getByText('Nenhum status registrado')).toBeTruthy();
  });
});