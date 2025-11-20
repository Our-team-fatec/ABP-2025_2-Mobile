import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ActionButton } from "../../components/ActionButton";
import AddPetModal from "../../components/AddPetModal";
import EditPetModal from "../../components/EditPetModal";
import ViewPetModal from "../../components/ViewPetModal";
import type { PetData } from "../../types/pet";
import PetCard from "../../components/PetCard";
import { useNewPetForm } from "../../hooks/useNewPetForm";
import { type Pet, listPets, searchPets, deletePet, createPetWithFormData, updatePetWithFormData } from "../../services/pet";
import { cadastroPetStyles as styles } from "../../styles/cadastroPet";
import { type PetForm } from "../../schemas/pet";

export default function CadastroPet() {
  const [isAddHover, setIsAddHover] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetData | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const convertPetToPetData = (pet: Pet): PetData => ({
    id: pet.id,
    name: pet.nome,
    species: pet.especie === 'CACHORRO' ? 'Cachorro' : 'Gato',
    breed: pet.raca,
    gender: pet.genero === 'MACHO' ? 'Macho' : 'Fêmea',
    age: pet.idade ? `${pet.idade}` : 'Não informada',
    color: pet.cor,
    size: pet.porte === 'PEQUENO' ? 'Pequeno' : 
          pet.porte === 'MEDIO' ? 'Médio' : 'Grande',
    tutor: pet.tutor?.nome,
    image: pet.imagens?.[0],
    images: pet.imagens,
    status: pet.status?.map(s => ({
      label: s.label,
      type: (s.type === 'PENDENTE' ? 'pendente' : 
            s.type === 'EM_DIA' ? 'aviso' : 
            s.type === 'ALERTA' ? 'consulta' : 'vacinacao') as any
    })) || []
  });

  const [isSpeciesDropdownOpen, setIsSpeciesDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadPets(1);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch(searchTerm, 1);
      } else {
        loadPets(1);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const loadPets = async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);
      
      const response = await listPets({ page, limit: 10 });
      
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

  const handleSearch = async (term: string, page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);
      
      const response = await searchPets(term, { page, limit: 10 });
      
      if (append) {
        setPets(prev => [...prev, ...response.data.pets]);
      } else {
        setPets(response.data.pets);
      }
      
      setHasMore(response.data.pagination.page < response.data.pagination.pages);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
      setError("Não foi possível buscar os pets");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      if (searchTerm.trim()) {
        handleSearch(searchTerm, currentPage + 1, true);
      } else {
        loadPets(currentPage + 1, true);
      }
    }
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      handleLoadMore();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (searchTerm.trim()) {
        await handleSearch(searchTerm, 1);
      } else {
        await loadPets(1);
      }
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const speciesOptions = [
    "Cão",
    "Gato",
  ];

  const handleSubmitPet = async (data: PetForm) => {
    try {
      const formData = new FormData();
      
      // Adiciona os campos de texto
      formData.append('nome', data.nome);
      formData.append('especie', data.especie);
      formData.append('raca', data.raca || '');
      formData.append('genero', data.genero);
      formData.append('porte', data.porte);
      formData.append('cor', data.cor || '');
      formData.append('idade', data.idade);
      
      // Adiciona as imagens se houver
      if (data.images && data.images.length > 0) {
        for (const imageUri of data.images) {
          const filename = imageUri.split('/').pop() || 'photo.jpg';
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : 'image/jpeg';
          
          formData.append('images', {
            uri: imageUri,
            name: filename,
            type: type,
          } as any);
        }
      }
      
      // Envia o FormData
      await createPetWithFormData(formData);
      
      // Recarrega a lista de pets após criar um novo
      loadPets(1);
      return true;
    } catch (error) {
      console.error("Erro ao criar pet:", error);
      return false;
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalVisible(true);
    setIsAddHover(false);
    setIsSpeciesDropdownOpen(false);
  };

  const handleAddButtonPress = () => {
    handleOpenAddModal();
  };

  const handleDeletePet = async (petId: string) => {
    try {
      await deletePet(petId);
      // Recarrega a lista de pets após excluir
      loadPets(1);
    } catch (error) {
      console.error("Erro ao excluir pet:", error);
      setError("Não foi possível excluir o pet");
    }
  };

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setIsEditModalVisible(true);
  };

  const handleUpdatePet = async (petId: string, data: PetForm) => {
    try {
      const formData = new FormData();
      
      // Adiciona os campos de texto
      formData.append('nome', data.nome);
      formData.append('especie', data.especie);
      formData.append('raca', data.raca || '');
      formData.append('genero', data.genero);
      formData.append('porte', data.porte);
      formData.append('cor', data.cor || '');
      formData.append('idade', data.idade);
      
      // Adiciona as imagens se houver
      if (data.images && data.images.length > 0) {
        for (const imageUri of data.images) {
          // Verifica se é uma URL (imagem já existente) ou URI local (nova imagem)
          if (!imageUri.startsWith('http')) {
            const filename = imageUri.split('/').pop() || 'photo.jpg';
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : 'image/jpeg';
            
            formData.append('images', {
              uri: imageUri,
              name: filename,
              type: type,
            } as any);
          }
        }
      }
      
      // Envia o FormData
      await updatePetWithFormData(petId, formData);
      
      // Recarrega a lista de pets após atualizar
      loadPets(1);
      return true;
    } catch (error) {
      console.error("Erro ao atualizar pet:", error);
      return false;
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Header />
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 120 }}
          onScroll={handleScroll}
          scrollEventThrottle={400}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#74a57e"]}
              tintColor="#74a57e"
              title="Atualizando..."
              titleColor="#6b7280"
            />
          }
        >
          <Text style={styles.sectionTitle}>
            Meus Pets
          </Text>
          <Text style={styles.sectionSubtitle}>
            Gerencie o RG Digital dos seus pets
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Buscar pet..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          <View style={styles.actionsRow}>
            <ActionButton
              label="Adicionar Pet"
              icon="add"
              variant="add"
              onPress={handleAddButtonPress}
            />
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#74a57e" />
              <Text style={styles.loadingText}>Carregando seus pets...</Text>
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
              <Text style={styles.emptyText}>Você ainda não tem pets cadastrados</Text>
              <Text style={styles.emptySubtext}>Clique em "Adicionar Pet" para cadastrar seu primeiro pet</Text>
            </View>
          ) : (
            pets.map((pet) => (
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
                  tutor: pet.tutor?.nome,
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
                onEdit={() => handleEditPet(pet)}
                onDelete={handleDeletePet}
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

        <AddPetModal
          visible={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
          onSubmit={handleSubmitPet}
          isSpeciesDropdownOpen={isSpeciesDropdownOpen}
          setIsSpeciesDropdownOpen={setIsSpeciesDropdownOpen}
        />

        <EditPetModal
          visible={isEditModalVisible}
          onClose={() => {
            setIsEditModalVisible(false);
            setEditingPet(null);
          }}
          onSubmit={handleUpdatePet}
          pet={editingPet}
          onImageDeleted={loadPets}
        />

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
