import React from "react";
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
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";

import type { PetData } from '../types/pet';

interface ViewPetModalProps {
  visible: boolean;
  onClose: () => void;
  pet: PetData | null;
}

const ViewPetModal: React.FC<ViewPetModalProps> = ({ visible, onClose, pet }) => {
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

                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitleModal}>Foto do Pet</Text>
                  {pet.image?.url ? (
                    <View style={styles.photoCircle}>
                      <Image
                        source={{ uri: pet.image.url }}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                        resizeMode="cover"
                      />
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

                  {pet.weight && (
                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Peso</Text>
                      <Text style={styles.modalInput}>{pet.weight}</Text>
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
};

export default ViewPetModal;
