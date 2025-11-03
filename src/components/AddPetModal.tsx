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
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";
import { formStyles } from "../styles/form";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema, type PetForm } from "../schemas/pet";

interface AddPetModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: PetForm) => Promise<boolean>;
  isSpeciesDropdownOpen?: boolean;
  setIsSpeciesDropdownOpen?: (open: boolean) => void;
  isSizeDropdownOpen?: boolean;
  setIsSizeDropdownOpen?: (open: boolean) => void;
}

const speciesOptions = [
  "CACHORRO",
  "GATO",
];

const sizeOptions = ["PEQUENO", "MEDIO", "GRANDE"] as const;

const AddPetModal: React.FC<AddPetModalProps> = ({
  visible,
  onClose,
  onSubmit,
  isSpeciesDropdownOpen = false,
  setIsSpeciesDropdownOpen = () => {},
  isSizeDropdownOpen = false,
  setIsSizeDropdownOpen = () => {},
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(petSchema),
    mode: "onBlur",
    defaultValues: {
      nome: "",
      especie: "CACHORRO",
      raca: "",
      genero: "MACHO" as const,
      dataNascimento: "",
      cor: "",
      porte: "MEDIO" as const,
      castrado: false,
      observacoes: "",
    }
  });

  const formData = watch();

  const handleSelectSpecies = (especie: string) => {
    setValue("especie", especie);
    setIsSpeciesDropdownOpen(false);
  };

  const handleSelectSize = (porte: "PEQUENO" | "MEDIO" | "GRANDE") => {
    setValue("porte", porte);
    setIsSizeDropdownOpen(false);
  };

  const handleSelectGender = (genero: "MACHO" | "FEMEA") => {
    setValue("genero", genero);
  };

  const handleToggleNeutered = () => {
    setValue("castrado", !formData.castrado);
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      const ok = await onSubmit(data);
      if (ok) onClose();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o pet. Tente novamente.");
    }
  });

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
                  <Controller
                    control={control}
                    name="nome"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={[styles.modalInput, errors.nome && formStyles.inputError]}
                        placeholder="Ex: Buddy"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.nome && (
                    <Text style={styles.errorText}>{errors.nome.message}</Text>
                  )}
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Espécie *</Text>
                  <View style={styles.selectContainer}>
                    <Controller
                      control={control}
                      name="especie"
                      render={({ field: { value } }) => (
                        <>
                          <Pressable
                            style={[
                              styles.selectTrigger,
                              errors.especie && formStyles.inputError,
                            ]}
                            onPress={() =>
                              setIsSpeciesDropdownOpen(!isSpeciesDropdownOpen)
                            }
                          >
                            <Text
                              style={[
                                styles.selectTriggerText,
                                !value && styles.selectPlaceholder,
                              ]}
                            >
                              {value || "Selecione"}
                            </Text>
                            <MaterialIcons
                              name={
                                isSpeciesDropdownOpen
                                  ? "expand-less"
                                  : "expand-more"
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
                                    value === option &&
                                      styles.selectOptionActive,
                                  ]}
                                  onPress={() => handleSelectSpecies(option)}
                                >
                                  <Text
                                    style={[
                                      styles.selectOptionText,
                                      value === option &&
                                        styles.selectOptionTextActive,
                                    ]}
                                  >
                                    {option}
                                  </Text>
                                </Pressable>
                              ))}
                            </View>
                          )}
                        </>
                      )}
                    />
                    {errors.especie && (
                      <Text style={formStyles.errorText}>
                        {errors.especie.message}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Raça</Text>
                  <Controller
                    control={control}
                    name="raca"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={[styles.modalInput, errors.raca && formStyles.inputError]}
                        placeholder="Ex: Golden Retriever"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Sexo *</Text>
                  <Controller
                    control={control}
                    name="genero"
                    render={({ field: { value } }) => (
                      <View style={styles.genderRow}>
                        <Pressable
                          style={[
                            styles.genderOption,
                            value === "MACHO" && styles.genderOptionActive,
                            errors.genero && formStyles.inputError
                          ]}
                          onPress={() => handleSelectGender("MACHO")}
                        >
                          <View
                            style={[
                              styles.genderRadio,
                              value === "MACHO" && styles.genderRadioActive,
                            ]}
                          />
                          <Text style={styles.genderLabel}>Macho</Text>
                        </Pressable>
                        <Pressable
                          style={[
                            styles.genderOption,
                            value === "FEMEA" && styles.genderOptionActive,
                            errors.genero && formStyles.inputError
                          ]}
                          onPress={() => handleSelectGender("FEMEA")}
                        >
                          <View
                            style={[
                              styles.genderRadio,
                              value === "FEMEA" && styles.genderRadioActive,
                            ]}
                          />
                          <Text style={styles.genderLabel}>Fêmea</Text>
                        </Pressable>
                      </View>
                    )}
                  />
                  {errors.genero && (
                    <Text style={formStyles.errorText}>
                      {errors.genero.message}
                    </Text>
                  )}
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Idade *</Text>
                  <Controller
                    control={control}
                    name="dataNascimento"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={[
                          styles.modalInput,
                          errors.dataNascimento && formStyles.inputError,
                        ]}
                        placeholder="Digite a idade"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="numeric"
                      />
                    )}
                  />
                  {errors.dataNascimento && (
                    <Text style={formStyles.errorText}>
                      {errors.dataNascimento.message}
                    </Text>
                  )}
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Cor</Text>
                  <Controller
                    control={control}
                    name="cor"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={[
                          styles.modalInput,
                          errors.cor && formStyles.inputError,
                        ]}
                        placeholder="Ex: Dourado"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.cor && (
                    <Text style={formStyles.errorText}>
                      {errors.cor.message}
                    </Text>
                  )}
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Porte *</Text>
                  <View style={styles.selectContainer}>
                    <Controller
                      control={control}
                      name="porte"
                      render={({ field: { value } }) => (
                        <>
                          <Pressable
                            style={[
                              styles.selectTrigger,
                              errors.porte && formStyles.inputError,
                            ]}
                            onPress={() =>
                              setIsSizeDropdownOpen(!isSizeDropdownOpen)
                            }
                          >
                            <Text
                              style={[
                                styles.selectTriggerText,
                                !value && styles.selectPlaceholder,
                              ]}
                            >
                              {value || "Selecione"}
                            </Text>
                            <MaterialIcons
                              name={
                                isSizeDropdownOpen
                                  ? "expand-less"
                                  : "expand-more"
                              }
                              size={20}
                              color="#047857"
                            />
                          </Pressable>
                          {isSizeDropdownOpen && (
                            <View style={styles.selectDropdown}>
                              {sizeOptions.map((option) => (
                                <Pressable
                                  key={option}
                                  style={[
                                    styles.selectOption,
                                    value === option &&
                                      styles.selectOptionActive,
                                  ]}
                                  onPress={() => handleSelectSize(option)}
                                >
                                  <Text
                                    style={[
                                      styles.selectOptionText,
                                      value === option &&
                                        styles.selectOptionTextActive,
                                    ]}
                                  >
                                    {option}
                                  </Text>
                                </Pressable>
                              ))}
                            </View>
                          )}
                        </>
                      )}
                    />
                    {errors.porte && (
                      <Text style={formStyles.errorText}>
                        {errors.porte.message}
                      </Text>
                    )}
                  </View>
                </View>

                <Controller
                  control={control}
                  name="castrado"
                  render={({ field: { value } }) => (
                    <Pressable
                      style={styles.checkboxRow}
                      onPress={handleToggleNeutered}
                    >
                      <View
                        style={[
                          styles.checkboxBox,
                          value && styles.checkboxBoxChecked,
                        ]}
                      >
                        {value && (
                          <MaterialIcons name="check" size={14} color="#fff" />
                        )}
                      </View>
                      <Text style={styles.checkboxLabel}>Castrado</Text>
                    </Pressable>
                  )}
                />
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
                onPress={handleFormSubmit}
                disabled={isSubmitting}
                style={[
                  styles.modalButton,
                  styles.modalPrimaryButton,
                  isSubmitting && styles.modalButtonDisabled,
                ]}
              >
                <Text
                  style={[
                    styles.modalButtonLabel,
                    styles.modalPrimaryButtonLabel,
                    isSubmitting && styles.modalButtonDisabledLabel,
                  ]}
                >
                  {isSubmitting ? "Salvando..." : "Salvar pet"}
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
