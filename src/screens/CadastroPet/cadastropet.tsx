import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ActionButton } from "../../components/ActionButton";
import AddPetModal from "../../components/AddPetModal";
import ViewPetModal from "../../components/ViewPetModal";
import type { PetData } from "../../types/pet";
import PetCard from "../../components/PetCard";
import { useNewPetForm } from "../../hooks/useNewPetForm";
import { getPublicPets, type Pet } from "../../services/pet";
import { cadastroPetStyles as styles } from "../../styles/cadastroPet";

export default function CadastroPet() {
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAddHover, setIsAddHover] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetData | null>(null);

  const convertPetToPetData = (pet: Pet): PetData => ({
    name: pet.nome,
    species: pet.especie === 'CACHORRO' ? 'Cachorro' : 'Gato',
    breed: pet.raca,
    gender: pet.genero === 'MACHO' ? 'Macho' : 'Fêmea',
    age: 'Não informada',
    color: pet.cor,
    image: pet.imagens?.[0],
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
  }, []);

  const loadPets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getPublicPets();
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

  const { newPetData, handleNewPetChange, handleSubmit, isFormValid } =
    useNewPetForm();

  const handleOpenAddModal = () => {
    setIsAddModalVisible(true);
    setIsAddHover(false);
    setIsSpeciesDropdownOpen(false);
  };

  const handleSelectSpecies = (option: string) => {
    handleNewPetChange("species", option);
    setIsSpeciesDropdownOpen(false);
  };

  return (
    <View style={styles.screenContainer}>
      <Header />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <Text style={styles.sectionTitle}>Meus Pets</Text>
          <Text style={styles.sectionSubtitle}>
            Gerencie o RG Digital dos seus pets
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Buscar pet..."
            value={search}
            onChangeText={setSearch}
          />

          <View style={styles.actionsRow}>
            <ActionButton
              label="Meus Pets"
              icon="favorite-border"
              variant="mypet"
              active={activeIndex === 0}
              onPress={() => setActiveIndex(0)}
            />
            <ActionButton
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
            />
            <ActionButton
              label="Adicionar"
              icon="add"
              variant="add"
              active={activeIndex === 3}
              onPress={() => setActiveIndex(3)}
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
              />
            ))
          )}
          <Pressable
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
          </Pressable>
        </ScrollView>

        <AddPetModal
          visible={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
          newPetData={newPetData}
          onChange={handleNewPetChange}
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          onSelectSpecies={handleSelectSpecies}
          isSpeciesDropdownOpen={isSpeciesDropdownOpen}
          setIsSpeciesDropdownOpen={setIsSpeciesDropdownOpen}
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
