import React, { useRef } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

import type { PetData } from "../types/pet";

interface PetCarteirinhaProps {
  visible: boolean;
  onClose: () => void;
  pet: PetData | null;
}

const PetCarteirinha: React.FC<PetCarteirinhaProps> = ({ visible, onClose, pet }) => {
  const viewShotRef = useRef<ViewShot>(null);

  if (!pet) return null;

  const petImage = pet.images?.[0]?.url || pet.image?.url || null;
  const currentDate = new Date().toLocaleDateString("pt-BR");
  const petId = `PET${Date.now().toString().slice(-8)}`;

  const handleExport = async () => {
    try {
      if (!viewShotRef.current) {
        Alert.alert("Erro", "Não foi possível capturar a carteirinha");
        return;
      }

      // Captura a view como imagem
      const uri = await viewShotRef.current.capture();
      
      // Mostra opções de ação
      Alert.alert(
        "Exportar Carteirinha",
        "O que você deseja fazer?",
        [
          {
            text: "Compartilhar",
            onPress: () => handleShare(uri),
          },
          {
            text: "Salvar na Galeria",
            onPress: () => handleSaveToGallery(uri),
          },
          {
            text: "Cancelar",
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao exportar carteirinha:", error);
      Alert.alert("Erro", "Não foi possível exportar a carteirinha");
    }
  };

  const handleShare = async (uri: string) => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(uri, {
          mimeType: "image/png",
          dialogTitle: `Carteirinha de ${pet.name}`,
        });
      } else {
        Alert.alert("Erro", "Compartilhamento não disponível neste dispositivo");
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      Alert.alert("Erro", "Não foi possível compartilhar a carteirinha");
    }
  };

  const handleSaveToGallery = async (uri: string) => {
    try {
      // Solicita permissão
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert(
          "Permissão Negada",
          "É necessário permitir o acesso à galeria para salvar a carteirinha"
        );
        return;
      }

      // Salva diretamente na galeria usando a URI capturada
      const asset = await MediaLibrary.createAssetAsync(uri);
      
      // Tenta criar o álbum ou adicionar à galeria
      try {
        await MediaLibrary.createAlbumAsync("Da Vinci Pets", asset, false);
      } catch (albumError) {
        // Se falhar ao criar álbum, a imagem já está salva na galeria principal
        console.log("Imagem salva na galeria principal");
      }

      Alert.alert("Sucesso!", "Carteirinha salva na galeria com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar na galeria:", error);
      Alert.alert("Erro", "Não foi possível salvar na galeria");
    }
  };

  const formatGender = (gender: string): string => {
    if (gender === "male") return "Macho";
    if (gender === "female") return "Fêmea";
    return gender;
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
        
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header do Modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Carteirinha do Pet</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#2d5f3f" />
              </TouchableOpacity>
            </View>

            {/* Carteirinha (capturável) */}
            <ViewShot
              ref={viewShotRef}
              options={{ format: "png", quality: 1.0 }}
              style={styles.viewShotContainer}
            >
              <View style={styles.carteirinha}>
                {/* Header da Carteirinha */}
                <View style={styles.carteirinhaHeader}>
                  <MaterialIcons name="pets" size={32} color="#fff" />
                  <Text style={styles.carteirinhaTitle}>CARTEIRINHA PET</Text>
                  <Text style={styles.carteirinhaSubtitle}>Da Vinci Pets - Identificação Oficial</Text>
                </View>

                {/* Corpo da Carteirinha */}
                <View style={styles.carteirinhaBody}>
                  {/* Foto do Pet */}
                  <View style={styles.photoContainer}>
                    {petImage ? (
                      <Image
                        source={{ uri: petImage }}
                        style={styles.petPhoto}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.petPhotoPlaceholder}>
                        <MaterialIcons name="pets" size={60} color="#4a9d6f" />
                      </View>
                    )}
                  </View>

                  {/* Informações */}
                  <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>NOME</Text>
                      <Text style={styles.infoValue}>{pet.name}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>ESPÉCIE</Text>
                      <Text style={styles.infoValue}>{pet.species || '-'}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>RAÇA</Text>
                      <Text style={styles.infoValue}>{pet.breed}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>IDADE</Text>
                      <Text style={styles.infoValue}>{pet.age}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>SEXO</Text>
                      <Text style={styles.infoValue}>{formatGender(pet.gender)}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>COR</Text>
                      <Text style={styles.infoValue}>{pet.color || '-'}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>PORTE</Text>
                      <Text style={styles.infoValue}>{pet.size || '-'}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>TUTOR</Text>
                      <Text style={styles.infoValue}>{pet.tutor || '-'}</Text>
                    </View>
                  </View>
                </View>

                {/* Footer da Carteirinha */}
                <View style={styles.carteirinhaFooter}>
                  <View style={styles.footerItem}>
                    <Text style={styles.footerLabel}>ID DE REGISTRO</Text>
                    <Text style={styles.footerValue}>{petId}</Text>
                  </View>
                  <View style={styles.footerItem}>
                    <Text style={styles.footerLabel}>DATA DE EXPEDIÇÃO</Text>
                    <Text style={styles.footerValue}>{currentDate}</Text>
                  </View>
                </View>
              </View>
            </ViewShot>

            {/* Botões de Ação */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.button, styles.exportButton]}
                onPress={handleExport}
              >
                <MaterialIcons name="share" size={20} color="#fff" />
                <Text style={styles.buttonText}>Exportar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    width: "90%",
    maxWidth: 500,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContent: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d5f3f",
  },
  closeButton: {
    padding: 4,
  },
  viewShotContainer: {
    backgroundColor: "#fff",
  },
  carteirinha: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#4a9d6f",
  },
  carteirinhaHeader: {
    backgroundColor: "#2d5f3f",
    padding: 20,
    alignItems: "center",
  },
  carteirinhaTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
    letterSpacing: 1,
  },
  carteirinhaSubtitle: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.9,
    marginTop: 4,
  },
  carteirinhaBody: {
    padding: 20,
    backgroundColor: "#fff",
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  petPhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#4a9d6f",
  },
  petPhotoPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#4a9d6f",
    backgroundColor: "#f0f9f4",
    justifyContent: "center",
    alignItems: "center",
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  infoItem: {
    width: "48%",
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4a9d6f",
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2d5f3f",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  carteirinhaFooter: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderTopWidth: 2,
    borderTopColor: "#4a9d6f",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerItem: {
    flex: 1,
    alignItems: "center",
  },
  footerLabel: {
    fontSize: 9,
    color: "#6c757d",
    marginBottom: 4,
    fontWeight: "600",
  },
  footerValue: {
    fontSize: 12,
    color: "#2d5f3f",
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 10,
    gap: 8,
  },
  exportButton: {
    backgroundColor: "#4a9d6f",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PetCarteirinha;
