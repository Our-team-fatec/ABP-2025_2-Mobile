import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Pressable, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";

import type { PetData } from '../types/pet';

interface AdocaoCardProps {
  pet: PetData;
  adocaoId?: string;
  descricao?: string;
  endereco?: string;
  onView: () => void;
  onDelete?: (adocaoId: string) => void;
  onEdit?: () => void;
  showActions?: boolean;
}

export default function AdocaoCard({ 
  pet, 
  adocaoId, 
  descricao,
  endereco,
  onView, 
  onDelete, 
  onEdit, 
  showActions = true 
}: AdocaoCardProps) {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleDeletePress = () => {
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalVisible(false);
    if (onDelete && adocaoId) {
      onDelete(adocaoId);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <View style={styles.card}>
      <Image
        source={pet.image?.url ? { uri: pet.image.url } : undefined}
        style={styles.petImage}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.petHeader}>
          <Text style={styles.petName}>{pet.name}</Text>

          {showActions && (
            <View style={styles.petActions}>
              <Pressable
                style={({ pressed, hovered }: any) => [
                  styles.iconButton,
                  styles.iconButtonFirst,
                  hovered && styles.iconButtonHover,
                  pressed && styles.iconButtonPressed,
                ]}
                hitSlop={8}
                onPress={onEdit}
              >
                <MaterialIcons name="edit" size={16} color="#111827" />
              </Pressable>
              <Pressable
                style={({ pressed, hovered }: any) => [
                  styles.iconButton,
                  hovered && styles.iconButtonHover,
                  pressed && styles.iconButtonPressed,
                ]}
                hitSlop={8}
                onPress={handleDeletePress}
              >
                <MaterialIcons name="delete" size={16} color="#ef4444" />
              </Pressable>
            </View>
          )}
        </View>

        <Text style={styles.petInfo}>
          {pet.breed} • {pet.gender} • {pet.age}
          {pet.size ? ` • ${pet.size}` : ""}
          {pet.color ? ` • ${pet.color}` : ""}
        </Text>

        {endereco && (
          <Text style={[styles.petInfo, { marginTop: 4 }]}>
            📍 {endereco}
          </Text>
        )}

        {descricao && (
          <Text style={[styles.petStatus, styles.petNeutral]} numberOfLines={2}>
            {descricao}
          </Text>
        )}
      </View>
      
      <TouchableOpacity style={styles.viewButton} onPress={onView}>
        <MaterialIcons name="description" color="#74a57f" />
        <Text style={styles.viewText}>Ver</Text>
      </TouchableOpacity>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModalContainer}>
            <MaterialIcons name="warning" size={48} color="#ef4444" style={styles.deleteModalIcon} />
            <Text style={styles.deleteModalTitle}>Excluir Anúncio</Text>
            <Text style={styles.deleteModalMessage}>
              Tem certeza que deseja excluir o anúncio de adoção de {pet.name}? Esta ação não pode ser desfeita.
            </Text>
            <View style={styles.deleteModalButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.deleteModalButton,
                  styles.deleteCancelButton,
                  pressed && styles.deleteCancelButtonPressed
                ]}
                onPress={handleCancelDelete}
              >
                <Text style={styles.deleteCancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.deleteModalButton,
                  styles.deleteConfirmButton,
                  pressed && styles.deleteConfirmButtonPressed
                ]}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.deleteConfirmButtonText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
