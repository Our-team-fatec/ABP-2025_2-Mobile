import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Pressable, Modal, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";

import type { PetData, PetStatusType } from '../types/pet';

interface PetCardProps {
  pet: PetData;
  petId?: string;
  onView: () => void;
  onDelete?: (petId: string) => void;
  onEdit?: () => void;
  showActions?: boolean; // Controla se mostra os botões de editar/excluir
  hasAdocao?: boolean; // Se o pet tem anúncio de adoção
  onCreateAdocao?: () => void; // Criar anúncio de adoção
  onEditAdocao?: () => void; // Editar anúncio de adoção
  onDeleteAdocao?: () => void; // Deletar anúncio de adoção
}

export default function PetCard({ 
  pet, 
  petId, 
  onView, 
  onDelete, 
  onEdit, 
  showActions = true,
  hasAdocao = false,
  onCreateAdocao,
  onEditAdocao,
  onDeleteAdocao
}: PetCardProps) {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const getStatusStyle = (status: PetStatusType | undefined) => {
    switch (status) {
      case "vacinacao":
        return styles.petSucess;
      case "consulta":
        return styles.petNeutral;
      case "aviso":
        return styles.petAlert;
      case "pendente":
        return styles.petPendente;
      default:
        return {};
    }
  };

  const handleDeletePress = () => {
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalVisible(false);
    if (onDelete && petId) {
      onDelete(petId);
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

        {pet.status && pet.status.length > 0 ? (
          pet.status.map((s, i) => (
            <Text key={i} style={[styles.petStatus, getStatusStyle(s.type)]}>
              {s.label}
            </Text>
          ))
        ) : (
          <Text style={[styles.petStatus, styles.petNeutral]}>
            Nenhum status registrado
          </Text>
        )}
      </View>
      
      {/* Botões de Adoção */}
      {(onCreateAdocao || onEditAdocao || onDeleteAdocao) && (
        <View style={styles.cardActions}>
          {!hasAdocao && onCreateAdocao && (
            <TouchableOpacity 
              style={styles.adocaoButton} 
              onPress={onCreateAdocao}
            >
              <MaterialIcons name="favorite" size={16} color="#fff" />
              <Text style={styles.adocaoButtonText}>Anunciar</Text>
            </TouchableOpacity>
          )}
          
          {hasAdocao && onEditAdocao && (
            <TouchableOpacity 
              style={styles.adocaoButton} 
              onPress={onEditAdocao}
            >
              <MaterialIcons name="edit" size={16} color="#fff" />
              <Text style={styles.adocaoButtonText}>Editar Adoção</Text>
            </TouchableOpacity>
          )}
          
          {hasAdocao && onDeleteAdocao && (
            <TouchableOpacity 
              style={styles.deleteAdocaoButton} 
              onPress={onDeleteAdocao}
            >
              <MaterialIcons name="delete" size={16} color="#fff" />
              <Text style={styles.deleteAdocaoButtonText}>Remover</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      
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
            <Text style={styles.deleteModalTitle}>Excluir Pet</Text>
            <Text style={styles.deleteModalMessage}>
              Tem certeza que deseja excluir {pet.name}? Esta ação não pode ser desfeita.
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
