import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";

interface PetStatus {
  label: string;
  type: "vacinacao" | "consulta" | "aviso" | "pendente";
}

interface PetCardProps {
  pet: {
    name: string;
    breed: string;
    gender: string;
    age: string;
    weight?: string;
    image: any;
    status?: PetStatus[];
  };
  onView: () => void;
}

export default function PetCard({ pet, onView }: PetCardProps) {
  const getStatusStyle = (status: PetStatus["type"]) => {
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
      {/* Foto do pet */}
      <Image source={pet.image} style={styles.petImage} />

      {/* Conteúdo principal */}
      <View style={{ flex: 1 }}>
        {/* Cabeçalho do card */}
        <View style={styles.petHeader}>
          <Text style={styles.petName}>{pet.name}</Text>

          <View style={styles.petActions}>
            {/* Botão Editar */}
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

            {/* Botão Compartilhar */}
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

        {/* Informações básicas */}
        <Text style={styles.petInfo}>
          {pet.breed} • {pet.gender} • {pet.age}
          {pet.weight ? ` • ${pet.weight}` : ""}
        </Text>

        {/* Lista de status */}
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

      {/* Botão "Ver" */}
      <TouchableOpacity style={styles.viewButton} onPress={onView}>
        <MaterialIcons name="description" color="#74a57f" />
        <Text style={styles.viewText}>Ver</Text>
      </TouchableOpacity>
    </View>
  );
}
