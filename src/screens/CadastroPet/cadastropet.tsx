import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Image,Pressable,ScrollView} from "react-native";

/**
 * OBS: coloque as imagens em /assets (na raiz do projeto)
 * nomes esperados: buddy.png, luna.png
*/

interface ActionButtonProps {
label: string;
variant?: "default" | "danger" | "add";
active?: boolean;
onPress?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
label,
variant = "default",
active = false,
onPress,
}) => {
return (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.actionButton,
      variant === "danger" && styles.dangerButton,
      variant === "add" && styles.addButton,
      active && styles.activeButton,
      pressed && styles.pressedButton,
    ]}
  >
    <Text style={styles.actionText}>{label}</Text>
  </Pressable>
);
};

export default function CadastroPet() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Título */}
        <Text style={styles.sectionTitle}>Meus Pets</Text>
        <Text style={styles.sectionSubtitle}>
          Gerencie o RG Digital dos seus pets
        </Text>

        {/* campo de busca */}
        <TextInput
          style={styles.input}
          placeholder="Buscar pet..."
          value={search}
          onChangeText={setSearch}
        />

        {/* Botões de ação */}
        <View style={styles.actionsRow}>
          <ActionButton
            label="Meus Pets"
            active={activeIndex === 0}
            onPress={() => setActiveIndex(0)}
          />
          <ActionButton
            label="Registros"
            active={activeIndex === 1}
            onPress={() => setActiveIndex(1)}
          />
          <ActionButton
            label="Pet Perdido"
            variant="danger"
            active={activeIndex === 2}
            onPress={() => setActiveIndex(2)}
          />
          <ActionButton
            label="Adicionar"
            variant="add"
            active={activeIndex === 3}
            onPress={() => setActiveIndex(3)}
          />
        </View>

        {/* Cards */}
        <View style={styles.card}>
          <Image
            source={require("../../assets/buddy.jpg")}
            style={styles.petImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.petName}>Buddy</Text>
            <Text style={styles.petInfo}>Golden Retriever • Macho</Text>
            <Text style={styles.petInfo}>2 anos e 8 meses • 25kg</Text>
            <Text style={styles.petStatus}>
              ✅ Vacinação em dia • Consulta 15/12/2024
            </Text>
          </View>
          <TouchableOpacity style={styles.viewButton} onPress={() => {}}>
            <Text style={styles.viewText}>Ver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Image
            source={require("../../assets/neguinho.jpg")}
            style={styles.petImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.petName}>Luna</Text>
            <Text style={styles.petInfo}>SRD • Fêmea</Text>
            <Text style={styles.petInfo}>6 meses • 3kg</Text>
            <Text style={styles.petStatus}>
              ⚠️ Vacina pendente • Última consulta 01/12/2024
            </Text>
          </View>
          <TouchableOpacity style={styles.viewButton} onPress={() => {}}>
            <Text style={styles.viewText}>Ver</Text>
          </TouchableOpacity>
        </View>

        {/* Adicionar Pet */}
        <TouchableOpacity
          style={styles.addPetButton}
          onPress={() => {
            Alert.alert("Adicionar Pet", "Funcionalidade ainda não implementada.");
          }}
        >
          <Text style={styles.addPetText}>+ Adicionar Pet</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafcfa",
    padding: 16,
  },
  header: {
    backgroundColor: "#a7e0b3",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#064e3b",
  },
  notification: {
    backgroundColor: "red",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  notificationText: {
    color: "#fff",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "#d1fae5",
  },
  dangerButton: {
    backgroundColor: "#fee2e2",
  },
  addButton: {
    backgroundColor: "#ecfdf5",
  },
  pressedButton: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  actionText: {
    fontSize: 12,
    color: "#111827",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  petImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    resizeMode: "cover",
  },
  petName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  petInfo: {
    fontSize: 12,
    color: "#6b7280",
  },
  petStatus: {
    fontSize: 11,
    color: "#059669",
    marginTop: 2,
  },
  viewButton: {
    borderWidth: 1,
    borderColor: "#bbf7d0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#ecfdf5",
  },
  viewText: {
    fontSize: 12,
    color: "#047857",
  },
  addPetButton: {
    borderWidth: 2,
    borderColor: "#bbf7d0",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },
  addPetText: {
    color: "#047857",
    fontWeight: "600",
  },
});
