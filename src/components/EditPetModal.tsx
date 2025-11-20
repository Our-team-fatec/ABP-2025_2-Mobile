import React, { useState, useEffect } from "react";
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
  Image,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";
import { formStyles } from "../styles/form";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema, type PetForm } from "../schemas/pet";
import type { Pet } from "../services/pet";
import { removePetImage } from "../services/pet";

interface EditPetModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (petId: string, data: PetForm) => Promise<boolean>;
  pet: Pet | null;
  onImageDeleted?: () => void;
}

interface ImageData {
  uri: string;
  id?: string; // ID da imagem se for uma imagem existente
}

const speciesOptions = [
  "CACHORRO",
  "GATO",
];

const sizeOptions = ["PEQUENO", "MEDIO", "GRANDE"] as const;

const EditPetModal: React.FC<EditPetModalProps> = ({
  visible,
  onClose,
  onSubmit,
  pet,
  onImageDeleted,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(petSchema),
    mode: "onBlur",
  });

  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);
  const [localSizeDropdownOpen, setLocalSizeDropdownOpen] = useState(false);
  const [isSpeciesDropdownOpen, setIsSpeciesDropdownOpen] = useState(false);

  const formData = watch();

  // Preenche o formulário quando o pet muda
  useEffect(() => {
    if (pet && visible) {
      reset({
        nome: pet.nome,
        especie: pet.especie,
        raca: pet.raca,
        genero: pet.genero,
        idade: pet.idade ? String(pet.idade) : "",
        cor: pet.cor,
        porte: pet.porte,
        images: [],
      });
      
      // Carrega imagens existentes com seus IDs
      if (pet.imagens && pet.imagens.length > 0) {
        setSelectedImages(pet.imagens.map(img => ({ uri: img.url, id: img.id })));
      } else {
        setSelectedImages([]);
      }
    }
  }, [pet, visible, reset]);

  const handleSelectSpecies = (especie: string) => {
    setValue("especie", especie);
    setIsSpeciesDropdownOpen(false);
  };

  const handleSelectSize = (porte: "PEQUENO" | "MEDIO" | "GRANDE") => {
    setValue("porte", porte);
    setLocalSizeDropdownOpen(false);
  };

  const handleSelectGender = (genero: "MACHO" | "FEMEA") => {
    setValue("genero", genero);
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permissão negada", "Você precisa permitir o acesso à câmera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImages(prev => [...prev, { uri: result.assets[0].uri }]);
    }
  };

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permissão negada", "Você precisa permitir o acesso à galeria");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset: any) => ({ uri: asset.uri }));
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageToRemove = selectedImages[index];
    
    // Se a imagem tem um ID, é uma imagem existente no servidor
    if (imageToRemove.id && pet) {
      Alert.alert(
        "Confirmar exclusão",
        "Deseja realmente excluir esta imagem?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Excluir",
            style: "destructive",
            onPress: async () => {
              try {
                await removePetImage(pet.id, imageToRemove.id!);
                setSelectedImages(prev => prev.filter((_, i) => i !== index));
                Alert.alert("Sucesso", "Imagem excluída com sucesso!");
                // Recarrega a lista de pets para atualizar o objeto pet
                if (onImageDeleted) {
                  onImageDeleted();
                }
              } catch (error) {
                console.error("Erro ao excluir imagem:", error);
                Alert.alert("Erro", "Não foi possível excluir a imagem. Tente novamente.");
              }
            }
          }
        ]
      );
    } else {
      // Imagem local, apenas remove do estado
      setSelectedImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    if (!pet) return;
    
    try {
      // Extrai apenas as URIs das imagens para enviar
      const imageUris = selectedImages.map(img => img.uri);
      const dataWithImages = { ...data, images: imageUris };
      const ok = await onSubmit(pet.id, dataWithImages);
      if (ok) {
        setSelectedImages([]);
        onClose();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar o pet. Tente novamente.");
    }
  });

  if (!pet) return null;

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
                
                {selectedImages.length > 0 ? (
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.imagesScrollView}
                  >
                    {selectedImages.map((image, index) => (
                      <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri: image.uri }} style={styles.selectedImage} />
                        <Pressable
                          style={styles.removeImageButton}
                          onPress={() => handleRemoveImage(index)}
                        >
                          <MaterialIcons name="close" size={16} color="#fff" />
                        </Pressable>
                      </View>
                    ))}
                  </ScrollView>
                ) : (
                  <View style={styles.photoCircle}>
                    <MaterialIcons
                      name="photo-camera"
                      size={32}
                      color="#9ca3af"
                    />
                  </View>
                )}
                
                <View style={styles.photoButtonsRow}>
                  <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
                    <MaterialIcons
                      name="photo-camera"
                      size={16}
                      color="#047857"
                    />
                    <Text style={styles.photoButtonLabel}>Tirar Foto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.photoButton} onPress={handlePickImage}>
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
                <Text style={styles.sectionTitleModal}>Informações Básicas</Text>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Nome do Pet *</Text>
                  <Controller
                    control={control}
                    name="nome"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={[
                          styles.modalInput,
                          errors.nome && formStyles.inputError,
                        ]}
                        placeholder="Digite o nome"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.nome && (
                    <Text style={formStyles.errorText}>
                      {errors.nome.message}
                    </Text>
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
                                    {option === "CACHORRO" ? "Cão" : "Gato"}
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
                  <Text style={styles.modalLabel}>Raça *</Text>
                  <Controller
                    control={control}
                    name="raca"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={[
                          styles.modalInput,
                          errors.raca && formStyles.inputError,
                        ]}
                        placeholder="Digite a raça"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.raca && (
                    <Text style={formStyles.errorText}>
                      {errors.raca.message}
                    </Text>
                  )}
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.modalLabel}>Sexo *</Text>
                  <View style={styles.genderRow}>
                    <Controller
                      control={control}
                      name="genero"
                      render={({ field: { value } }) => (
                        <>
                          <Pressable
                            style={[
                              styles.genderOption,
                              value === "MACHO" && styles.genderOptionActive,
                            ]}
                            onPress={() => handleSelectGender("MACHO")}
                          >
                            <MaterialIcons
                              name="male"
                              size={20}
                              color={value === "MACHO" ? "#047857" : "#6b7280"}
                            />
                            <Text style={styles.genderLabel}>Macho</Text>
                          </Pressable>
                          <Pressable
                            style={[
                              styles.genderOption,
                              value === "FEMEA" && styles.genderOptionActive,
                            ]}
                            onPress={() => handleSelectGender("FEMEA")}
                          >
                            <MaterialIcons
                              name="female"
                              size={20}
                              color={value === "FEMEA" ? "#047857" : "#6b7280"}
                            />
                            <Text style={styles.genderLabel}>Fêmea</Text>
                          </Pressable>
                        </>
                      )}
                    />
                  </View>
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
                    name="idade"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={[
                          styles.modalInput,
                          errors.idade && formStyles.inputError,
                        ]}
                        placeholder="Ex: 2 anos, 6 meses"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.idade && (
                    <Text style={formStyles.errorText}>
                      {errors.idade.message}
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
                        style={styles.modalInput}
                        placeholder="Digite a cor"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
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
                              setLocalSizeDropdownOpen(!localSizeDropdownOpen)
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
                                localSizeDropdownOpen
                                  ? "expand-less"
                                  : "expand-more"
                              }
                              size={20}
                              color="#047857"
                            />
                          </Pressable>
                          {localSizeDropdownOpen && (
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
                style={[
                  styles.modalButton,
                  styles.modalPrimaryButton,
                  isSubmitting && styles.modalButtonDisabled,
                ]}
                onPress={handleFormSubmit}
                disabled={isSubmitting}
              >
                <Text
                  style={[
                    styles.modalButtonLabel,
                    styles.modalPrimaryButtonLabel,
                    isSubmitting && styles.modalButtonDisabledLabel,
                  ]}
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
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

export default EditPetModal;
