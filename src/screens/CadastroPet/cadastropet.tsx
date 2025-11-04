import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ActionButton } from "../../components/ActionButton";
import AddPetModal from "../../components/AddPetModal";
import EditPetModal from "../../components/EditPetModal";
import ViewPetModal from "../../components/ViewPetModal";
import type { PetData } from "../../types/pet";
import PetCard from "../../components/PetCard";
import { useNewPetForm } from "../../hooks/useNewPetForm";
import { getPublicPets, createPet, type Pet, listPets, deletePet, createPetWithFormData, updatePet, updatePetWithFormData } from "../../services/pet";
import { cadastroPetStyles as styles } from "../../styles/cadastroPet";
import { type PetForm } from "../../schemas/pet";

type CadastroPetRouteProp = RouteProp<RootStackParamList, 'CadastroPet'>;

export default function CadastroPet() {
  const route = useRoute<CadastroPetRouteProp>();
  const initialView = route.params?.initialView || 'myPets';
  
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(initialView === 'myPets' ? 0 : -1);
  const [isAddHover, setIsAddHover] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetData | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const convertPetToPetData = (pet: Pet): PetData => ({
    name: pet.nome,
    species: pet.especie === 'CACHORRO' ? 'Cachorro' : 'Gato',
    breed: pet.raca,
    gender: pet.genero === 'MACHO' ? 'Macho' : 'Fêmea',
    age: 'Não informada',
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

  const [isSpeciesDropdownOpen, setIsSpeciesDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    loadPets();
  }, [activeIndex]);

  const loadPets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = activeIndex === 0 ? await listPets() : await getPublicPets();
      setPets(response.data.pets);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar a lista de pets");
    } finally {
      setIsLoading(false);
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
      loadPets();
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

  const handleMyPetsButtonPress = () => {
    setActiveIndex(activeIndex === 0 ? -1 : 0);
  };

  const handleAddButtonPress = () => {
    handleOpenAddModal();
  };

  const handleDeletePet = async (petId: string) => {
    try {
      await deletePet(petId);
      // Recarrega a lista de pets após excluir
      loadPets();
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
      loadPets();
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
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <Text style={styles.sectionTitle}>
            {activeIndex === 0 ? "Meus Pets" : "Pets Disponíveis para Adoção"}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {activeIndex === 0 
              ? "Gerencie o RG Digital dos seus pets" 
              : "Encontre seu novo companheiro"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Buscar pet..."
            value={search}
            onChangeText={setSearch}
          />

          <View style={styles.actionsRow}>
            <ActionButton
              label={activeIndex === 0 ? "Adoção" : "Meus Pets"}
              icon="favorite-border"
              variant={activeIndex === 0 ? "adoption" : "mypet"}
              customColor={activeIndex === 0 ? "#e07b7b" : "#83af8a"}
              active={activeIndex !== 0}
              onPress={handleMyPetsButtonPress}
            />
          {/*   <ActionButton
              label="Registros"
              icon="description"
              active={activeIndex === 1}
              onPress={() => setActiveIndex(1)}
            />
            <ActionButton
              label="Pet Perdido"
              icon="warning-amber"
              color="danger"
              variant="lost"
              active={activeIndex === 2}
              onPress={() => setActiveIndex(2)}
            /> */}
            <ActionButton
              label={activeIndex === 0 ? "Adicionar" : "Doar"}
              icon="add"
              variant="add"
              active={activeIndex === 3}
              onPress={handleAddButtonPress}
            />
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#74a57e" />
              <Text style={styles.loadingText}>Carregando pets disponíveis...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={24} color="#ff6b6b" />
              <Text style={styles.errorText}>{error}</Text>
              <Pressable style={styles.retryButton} onPress={loadPets}>
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
                onEdit={() => handleEditPet(pet)}
                onDelete={handleDeletePet}
              />
            ))
          )}
          {/* <Pressable
            style={[
              styles.addPetButton,
              isAddHover && styles.addPetButtonHover,
            ]}
            onPress={handleOpenAddModal}
            onHoverIn={() => setIsAddHover(true)}
            onHoverOut={() => setIsAddHover(false)}
          >
            <MaterialIcons name="add" size={26} color={"#74a57e"} />
            <Text style={styles.addPetText}>Adicionar Pet</Text>
            <Text style={styles.addPetSubtitle}>Cadastre um novo pet</Text>
          </Pressable> */}
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
