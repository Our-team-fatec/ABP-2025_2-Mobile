import React, { useState } from "react";
import {
  Modal,
  View,
  ScrollView,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";
import { NewPetForm } from "../types/cadastroPet";

interface AddPetModalProps {
  visible: boolean;
  onClose: () => void;
  // Controlled form props
  newPetData: NewPetForm;
  onChange: <K extends keyof NewPetForm>(
    field: K,
    value: NewPetForm[K]
  ) => void;
  onSubmit: () => boolean;
  isFormValid: boolean;
  onSelectSpecies?: (species: string) => void;
  isSpeciesDropdownOpen?: boolean;
  setIsSpeciesDropdownOpen?: (open: boolean) => void;
}

const speciesOptions = [
  "Cão",
  "Gato",
];

const AddPetModal: React.FC<AddPetModalProps> = ({
  visible,
  onClose,
  newPetData,
  onChange,
  onSubmit,
  isFormValid,
  onSelectSpecies,
  isSpeciesDropdownOpen = false,
  setIsSpeciesDropdownOpen = () => {},
}) => {
  const handleSelectSpecies = (species: string) => {
    if (onSelectSpecies) {
      onSelectSpecies(species);
    } else {
      onChange("species", species);
      setIsSpeciesDropdownOpen(false);
    }
  };

  const handleSelectGender = (gender: "male" | "female") => {
    onChange("gender", gender);
  };

  const handleToggleNeutered = () => {
    onChange("isNeutered", !newPetData.isNeutered);
  };
  const handleSubmit = () => {
    const ok = onSubmit();
    if (ok) onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalCard}>
                
            <View style={styles.modalHandle} />

            <ScrollView
              style={styles.modalFormScroll}
              contentContainerStyle={styles.modalFormContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator
            >
              {/* Foto do Pet */}
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitleModal}>Foto do Pet</Text>
                <View style={styles.photoCircle}>
                  <MaterialIcons
                    name="photo-camera"
                    size={32}
                    color="#9ca3af"
                  />
                </View>
                <View style={styles.photoButtonsRow}>
                  <TouchableOpacity style={styles.photoButton}>
                    <MaterialIcons
                      name="photo-camera"
                      size={16}
                      color="#047857"
                    />
                    <Text style={styles.photoButtonLabel}>Tirar Foto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.photoButton}>
                    <MaterialIcons
                      name="photo-library"
                      size={16}
                      color="#047857"
                    />
                    <Text style={styles.photoButtonLabel}>Galeria</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Informações Básicas */}
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitleModal}>
                  Informações Básicas
                </Text>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Nome do Pet *</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: Buddy"
                    value={newPetData.name}
                    onChangeText={(text) => onChange("name", text)}
                  />
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Espécie *</Text>
                  <View style={styles.selectContainer}>
                    <Pressable
                      style={styles.selectTrigger}
                      onPress={() => setIsSpeciesDropdownOpen(!isSpeciesDropdownOpen)}
                    >
                      <Text
                        style={[
                          styles.selectTriggerText,
                          !newPetData.species && styles.selectPlaceholder,
                        ]}
                      >
                        {newPetData.species || "Selecione"}
                      </Text>
                      <MaterialIcons
                        name={
                          isSpeciesDropdownOpen ? "expand-less" : "expand-more"
                        }
                        size={20}
                        color="#047857"
                      />
                    </Pressable>
                    {isSpeciesDropdownOpen && (
                      <View style={styles.selectDropdown}>
                        {speciesOptions.map((option) => (
                          <Pressable
                            key={option}
                            style={[
                              styles.selectOption,
                              newPetData.species === option &&
                                styles.selectOptionActive,
                            ]}
                            onPress={() => handleSelectSpecies(option)}
                          >
                            <Text
                              style={[
                                styles.selectOptionText,
                                newPetData.species === option &&
                                  styles.selectOptionTextActive,
                              ]}
                            >
                              {option}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Raça</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: Golden Retriever"
                    value={newPetData.breed}
                    onChangeText={(text) => onChange("breed", text)}
                  />
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Sexo *</Text>
                  <View style={styles.genderRow}>
                    <Pressable
                      style={[
                        styles.genderOption,
                        newPetData.gender === "male" &&
                          styles.genderOptionActive,
                      ]}
                      onPress={() => handleSelectGender("male")}
                    >
                      <View
                        style={[
                          styles.genderRadio,
                          newPetData.gender === "male" &&
                            styles.genderRadioActive,
                        ]}
                      />
                      <Text style={styles.genderLabel}>Macho</Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.genderOption,
                        newPetData.gender === "female" &&
                          styles.genderOptionActive,
                      ]}
                      onPress={() => handleSelectGender("female")}
                    >
                      <View
                        style={[
                          styles.genderRadio,
                          newPetData.gender === "female" &&
                            styles.genderRadioActive,
                        ]}
                      />
                      <Text style={styles.genderLabel}>Fêmea</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Idade *</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Digite a idade"
                    value={newPetData.birthDate}
                    onChangeText={(text) => onChange("birthDate", text)}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Cor</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: Dourado"
                    value={newPetData.color}
                    onChangeText={(text) => onChange("color", text)}
                  />
                </View>

                <Pressable
                  style={styles.checkboxRow}
                  onPress={handleToggleNeutered}
                >
                  <View
                    style={[
                      styles.checkboxBox,
                      newPetData.isNeutered && styles.checkboxBoxChecked,
                    ]}
                  >
                    {newPetData.isNeutered && (
                      <MaterialIcons name="check" size={14} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>Castrado</Text>
                </Pressable>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={onClose}
              >
                <Text
                  style={[
                    styles.modalButtonLabel,
                    styles.modalCancelButtonLabel,
                  ]}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isFormValid}
                style={[
                  styles.modalButton,
                  styles.modalPrimaryButton,
                  !isFormValid && styles.modalButtonDisabled,
                ]}
              >
                <Text
                  style={[
                    styles.modalButtonLabel,
                    styles.modalPrimaryButtonLabel,
                    !isFormValid && styles.modalButtonDisabledLabel,
                  ]}
                >
                  Salvar pet
                </Text>
              </TouchableOpacity>
              </View>   
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default AddPetModal;
