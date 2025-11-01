import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ActionButton } from "../../components/ActionButton";
import AddPetModal from "../../components/AddPetModal";
import ViewPetModal from "../../components/ViewPetModal";
import PetCard from "../../components/PetCard";
import { useNewPetForm } from "../../hooks/useNewPetForm";
import { cadastroPetStyles as styles } from "../../styles/cadastroPet";
import { MaterialIcons } from "@expo/vector-icons";
import { pets } from "../../mocks/pets";

export default function CadastroPet() {
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAddHover, setIsAddHover] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [isSpeciesDropdownOpen, setIsSpeciesDropdownOpen] = useState(false);
  
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

          {pets
            .filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase().trim())
            )
            .map((pet, i) => (
              <PetCard
                key={i}
                pet={pet}
                onView={() => {
                  setSelectedPet(pet);
                  setIsViewModalVisible(true);
                }}
              />
            ))}
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
