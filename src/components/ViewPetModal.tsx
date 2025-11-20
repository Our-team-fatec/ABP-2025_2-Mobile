import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  ScrollView,
  Pressable,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";
import PetCarteirinha from "./PetCarteirinha";

import type { PetData } from '../types/pet';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.8;

interface ViewPetModalProps {
  visible: boolean;
  onClose: () => void;
  pet: PetData | null;
}

const ViewPetModal: React.FC<ViewPetModalProps> = ({ visible, onClose, pet }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCarteirinha, setShowCarteirinha] = useState(false);
  
  // Reset do índice quando o modal abre ou o pet muda
  useEffect(() => {
    if (visible) {
      setCurrentImageIndex(0);
      setShowCarteirinha(false);
    }
  }, [visible, pet]);
  
  if (!pet) return null;

  const petImages = pet.images || (pet.image ? [pet.image] : []);
  const hasImages = petImages.length > 0;

  const handleNextImage = () => {
    if (currentImageIndex < petImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
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

                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitleModal}>Foto do Pet</Text>
                  {hasImages ? (
                    <View style={styles.imageCarouselContainer}>
                      <Image
                        source={{ uri: petImages[currentImageIndex].url }}
                        style={styles.carouselImage}
                        resizeMode="cover"
                      />
                      
                      {petImages.length > 1 && (
                        <>
                          {/* Botão Anterior */}
                          {currentImageIndex > 0 && (
                            <Pressable
                              style={[styles.carouselButton, styles.carouselButtonLeft]}
                              onPress={handlePreviousImage}
                            >
                              <MaterialIcons name="chevron-left" size={32} color="#fff" />
                            </Pressable>
                          )}
                          
                          {/* Botão Próximo */}
                          {currentImageIndex < petImages.length - 1 && (
                            <Pressable
                              style={[styles.carouselButton, styles.carouselButtonRight]}
                              onPress={handleNextImage}
                            >
                              <MaterialIcons name="chevron-right" size={32} color="#fff" />
                            </Pressable>
                          )}
                          
                          {/* Indicadores */}
                          <View style={styles.carouselIndicators}>
                            {petImages.map((_, index) => (
                              <View
                                key={index}
                                style={[
                                  styles.carouselDot,
                                  index === currentImageIndex && styles.carouselDotActive,
                                ]}
                              />
                            ))}
                          </View>
                        </>
                      )}
                    </View>
                  ) : (
                    <View style={styles.photoCircle}>
                      <MaterialIcons name="pets" size={48} color="#047857" />
                    </View>
                  )}
                </View>

                {/* Informações Básicas */}
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitleModal}>Informações Básicas</Text>

                  <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>Nome do Pet</Text>
                    <Text style={styles.modalInput}>{pet.name}</Text>
                  </View>

                  <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>Espécie</Text>
                    <Text style={styles.modalInput}>{pet.species}</Text>
                  </View>

                  <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>Raça</Text>
                    <Text style={styles.modalInput}>{pet.breed}</Text>
                  </View>

                  <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>Sexo</Text>
                    <Text style={styles.modalInput}>{pet.gender === "male" ? "Macho" : pet.gender === "female" ? "Fêmea" : pet.gender}</Text>
                  </View>

                  <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>Idade</Text>
                    <Text style={styles.modalInput}>{pet.age}</Text>
                  </View>

                  {pet.size && (
                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Porte</Text>
                      <Text style={styles.modalInput}>{pet.size}</Text>
                    </View>
                  )}

                  {pet.tutor && (
                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Tutor</Text>
                      <Text style={styles.modalInput}>{pet.tutor}</Text>
                    </View>
                  )}

                  {pet.color && (
                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Cor</Text>
                      <Text style={styles.modalInput}>{pet.color}</Text>
                    </View>
                  )}
                </View>

                {/* Status do pet */}
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitleModal}>Status</Text>
                  {pet.status && pet.status.length > 0 ? (
                    pet.status.map((s, i) => {
                      const texto = typeof s === "string" ? s : s?.label ?? "Status indefinido";
                      return (
                        <Text key={i} style={[styles.petStatus, styles.petNeutral]}>
                          {texto}
                        </Text>
                      );
                    })
                  ) : (
                    <Text style={[styles.petStatus, styles.petNeutral]}>
                      Nenhum status registrado
                    </Text>
                  )}
                </View>
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalSubmitButton]}
                  onPress={() => setShowCarteirinha(true)}
                >
                  <MaterialIcons name="credit-card" size={20} color="#fff" />
                  <Text style={styles.modalButtonLabel}>
                    Exportar Carteirinha
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalCancelButton]}
                  onPress={onClose}
                >
                  <Text style={[styles.modalButtonLabel, styles.modalCancelButtonLabel]}>
                    Fechar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      
      {/* Modal da Carteirinha */}
      <PetCarteirinha
        visible={showCarteirinha}
        onClose={() => setShowCarteirinha(false)}
        pet={pet}
      />
    </Modal>
  );
};

export default ViewPetModal;
