import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
// ActionButton e AddPetModal removidos: não são necessários na página de adoção
import ViewPetModal from "../../components/ViewPetModal";
import type { PetData } from "../../types/pet";
import PetCard from "../../components/PetCard";
import { getPublicPets, type Pet } from "../../services/pet";
import { cadastroPetStyles as styles } from "../../styles/cadastroPet";

export default function AdocaoPet() {
  const [search, setSearch] = useState("");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetData | null>(null);

  const convertPetToPetData = (pet: Pet): PetData => ({
    name: pet.nome,
    species: pet.especie === 'CACHORRO' ? 'Cachorro' : 'Gato',
    breed: pet.raca,
    gender: pet.genero === 'MACHO' ? 'Macho' : 'Fêmea',
    age: pet.idade ? `${pet.idade} anos` : 'Não informada',
    color: pet.cor,
    image: pet.imagens?.[0],
    images: pet.imagens,
    status: pet.status?.map(s => ({
      label: s.label,
      type: (s.type === 'PENDENTE' ? 'pendente' : 
            s.type === 'EM_DIA' ? 'aviso' : 
            s.type === 'ALERTA' ? 'consulta' : 'vacinacao') 
    })) || []
  });

  // sem dropdown de espécie nesta tela (apenas listagem pública)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    loadPets(1);
  }, []);

  const loadPets = async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);
      
      const response = await getPublicPets({ page, limit: 10 });
      
      if (append) {
        setPets(prev => [...prev, ...response.data.pets]);
      } else {
        setPets(response.data.pets);
      }
      
      setHasMore(response.data.pagination.page < response.data.pagination.pages);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar a lista de pets");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      loadPets(currentPage + 1, true);
    }
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      handleLoadMore();
    }
  };

  // Funções de criação/remessa não são necessárias nesta tela de adoção

  return (
    <View style={styles.screenContainer}>
      <Header />
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 120 }}
          onScroll={handleScroll}
          scrollEventThrottle={400}
        >
          <Text style={styles.sectionTitle}>
            Pets Disponíveis para Adoção
          </Text>
          <Text style={styles.sectionSubtitle}>
            Encontre seu novo companheiro
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Buscar pet..."
            value={search}
            onChangeText={setSearch}
          />

          {/* Sem botão de doação nesta tela de adoção */}

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#74a57e" />
              <Text style={styles.loadingText}>Carregando pets disponíveis...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={24} color="#ff6b6b" />
              <Text style={styles.errorText}>{error}</Text>
              <Pressable style={styles.retryButton} onPress={() => loadPets(1)}>
                <Text style={styles.retryButtonText}>Tentar Novamente</Text>
              </Pressable>
            </View>
          ) : pets.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="pets" size={48} color="#74a57e" />
              <Text style={styles.emptyText}>Nenhum pet disponível para adoção</Text>
              <Text style={styles.emptySubtext}>No momento não há pets cadastrados</Text>
            </View>
          ) : (
            pets
            .filter((pet) =>
              pet.nome.toLowerCase().includes(search.toLowerCase().trim())
            )
            .map((pet) => (
              <PetCard
                key={pet.id}
                petId={pet.id}
                pet={{
                  name: pet.nome,
                  breed: pet.raca,
                  species: pet.especie === 'CACHORRO' ? 'Cachorro' : 'Gato',
                  gender: pet.genero === 'MACHO' ? 'Macho' : 'Fêmea',
                  age: `Cadastrado em ${new Date(pet.criado_em).toLocaleDateString('pt-BR')}`,
                  image: pet.imagens?.[0],
                  weight: pet.porte === 'PEQUENO' ? 'Pequeno porte' : 
                         pet.porte === 'MEDIO' ? 'Médio porte' : 'Grande porte',
                  color: pet.cor,
                  status: pet.status?.map(s => ({
                    label: s.label,
                    type: (s.type === 'PENDENTE' ? 'pendente' : 
                          s.type === 'EM_DIA' ? 'aviso' : 
                          s.type === 'ALERTA' ? 'consulta' : 'vacinacao')
                  })) ?? []
                }}
                onView={() => {
                  setSelectedPet(convertPetToPetData(pet));
                  setIsViewModalVisible(true);
                }}
                // Não permite edição/exclusão na página de adoção
                showActions={false}
              />
            ))
          )}
          
          {isLoadingMore && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#74a57e" />
              <Text style={styles.loadingText}>Carregando mais pets...</Text>
            </View>
          )}
        </ScrollView>

        <ViewPetModal
          visible={isViewModalVisible}
          onClose={() => setIsViewModalVisible(false)}
          pet={selectedPet}
        />
      </View>
      <Footer />
    </View>
  );
}
