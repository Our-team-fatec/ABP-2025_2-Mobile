import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ViewPetModal from '../../src/components/ViewPetModal';
import type { PetData, PetStatusType } from '../../src/types/pet';

describe('ViewPetModal', () => {
  const mockPet: PetData = {
    name: 'Rex',
    breed: 'Vira-lata',
    species: 'Cachorro',
    gender: 'Macho',
    age: 'Cadastrado em 02/11/2025',
    color: 'Caramelo',
    size: 'Médio porte',
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

  const mockOnClose = jest.fn();

  it('deve renderizar todas as informações do pet', () => {
    const { getByText } = render(
      <ViewPetModal visible={true} onClose={mockOnClose} pet={mockPet} />
    );

    expect(getByText('Rex')).toBeTruthy();
    expect(getByText('Vacinação em dia')).toBeTruthy();
    expect(getByText('Cachorro')).toBeTruthy();
    expect(getByText('Vira-lata')).toBeTruthy();
    expect(getByText('Caramelo')).toBeTruthy();
    expect(getByText('Médio porte')).toBeTruthy();
  });

  it('deve chamar onClose quando o botão fechar é pressionado', () => {
    const { getByText } = render(
      <ViewPetModal visible={true} onClose={mockOnClose} pet={mockPet} />
    );

    fireEvent.press(getByText('Fechar'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('não deve renderizar nada quando visible é false', () => {
    const { queryByText } = render(
      <ViewPetModal visible={false} onClose={mockOnClose} pet={mockPet} />
    );

    expect(queryByText('Fechar')).toBeNull();
  });

  it('não deve renderizar nada quando pet é null', () => {
    const { queryByText } = render(
      <ViewPetModal visible={true} onClose={mockOnClose} pet={null} />
    );

    expect(queryByText('Fechar')).toBeNull();
  });

  it('deve mostrar mensagem quando não há status', () => {
    const petSemStatus = { ...mockPet, status: [] };
    const { getByText } = render(
      <ViewPetModal visible={true} onClose={mockOnClose} pet={petSemStatus} />
    );

    expect(getByText('Nenhum status registrado')).toBeTruthy();
  });
});