import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";
import type { PetData } from "../types/pet";

interface ViewAdocaoModalProps {
  visible: boolean;
  onClose: () => void;
  pet: PetData | null;
  descricao: string;
  endereco: string;
  contato?: string;
  criado_em?: string;
}

export default function ViewAdocaoModal({
  visible,
  onClose,
  pet,
  descricao,
  endereco,
  contato,
  criado_em,
}: ViewAdocaoModalProps) {
  const formatPhone = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (visible) {
      setCurrentImageIndex(0);
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
                          {currentImageIndex > 0 && (
                            <Pressable
                              style={[styles.carouselButton, styles.carouselButtonLeft]}
                              onPress={handlePreviousImage}
                            >
                              <MaterialIcons name="chevron-left" size={32} color="#fff" />
                            </Pressable>
                          )}
                          
                          {currentImageIndex < petImages.length - 1 && (
                            <Pressable
                              style={[styles.carouselButton, styles.carouselButtonRight]}
                              onPress={handleNextImage}
                            >
                              <MaterialIcons name="chevron-right" size={32} color="#fff" />
                            </Pressable>
                          )}
                          
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

                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitleModal}>Informações do Pet</Text>
                  
                  <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>Nome</Text>
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
                    <Text style={styles.modalLabel}>Gênero</Text>
                    <Text style={styles.modalInput}>{pet.gender}</Text>
                  </View>

                  <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>Idade</Text>
                    <Text style={styles.modalInput}>{pet.age}</Text>
                  </View>

                  {pet.color && (
                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Cor</Text>
                      <Text style={styles.modalInput}>{pet.color}</Text>
                    </View>
                  )}

                  {pet.weight && (
                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Porte</Text>
                      <Text style={styles.modalInput}>{pet.weight}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitleModal}>Sobre o Anúncio</Text>
                  <View style={styles.modalField}>
                    <Text style={styles.modalInput}>{descricao}</Text>
                  </View>
                </View>

                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitleModal}>Localização</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <MaterialIcons name="location-on" size={20} color="#74a57e" />
                    <Text style={styles.modalInput}>{endereco}</Text>
                  </View>
                </View>

                {contato && (
                  <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitleModal}>Contato</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <MaterialIcons name="phone" size={20} color="#74a57e" />
                      <Text style={styles.modalInput}>{formatPhone(contato)}</Text>
                    </View>
                  </View>
                )}

                {criado_em && (
                  <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitleModal}>Anunciado em</Text>
                    <Text style={styles.modalInput}>
                      {new Date(criado_em).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </Text>
                  </View>
                )}
              </ScrollView>

              <View style={styles.modalActions}>
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
    </Modal>
  );
}
