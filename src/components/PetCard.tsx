import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";

import type { PetData, PetStatusType } from '../types/pet';

interface PetCardProps {
  pet: PetData;
  onView: () => void;
}

export default function PetCard({ pet, onView }: PetCardProps) {
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

  return (
    <View style={styles.card}>
      <Image
        source={pet.image?.url ? { uri: pet.image.url } : undefined}
        style={styles.petImage}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.petHeader}>
          <Text style={styles.petName}>{pet.name}</Text>

          <View style={styles.petActions}>
            <Pressable
              style={({ pressed, hovered }: any) => [
                styles.iconButton,
                styles.iconButtonFirst,
                hovered && styles.iconButtonHover,
                pressed && styles.iconButtonPressed,
              ]}
              hitSlop={8}
              onPress={() => {}}
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
              onPress={() => {}}
            >
              <MaterialIcons name="share" size={16} color="#111827" />
            </Pressable>
          </View>
        </View>

        <Text style={styles.petInfo}>
          {pet.breed} • {pet.gender} • {pet.age}
          {pet.weight ? ` • ${pet.weight}` : ""}
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
      
      <TouchableOpacity style={styles.viewButton} onPress={onView}>
        <MaterialIcons name="description" color="#74a57f" />
        <Text style={styles.viewText}>Ver</Text>
      </TouchableOpacity>
    </View>
  );
}
