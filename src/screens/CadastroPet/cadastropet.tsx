import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Image,Pressable,ScrollView} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

interface ActionButtonProps {
label: string;
icon?: keyof typeof MaterialIcons.glyphMap;
variant?: "default" | "danger" | "add" | "lost" | "mypet";
active?: boolean;
color?: string;
onPress?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
label,
icon,
variant = "default",
color,
active = false,
onPress,
}) => {
  const baseColor =
    color ??
    (variant === "danger"
      ? "#b91c1c"
      : variant === "add"
      ? "#0f766e"
      : "#047857");
return (
  
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.actionButton,
      variant === "danger" && styles.dangerButton,
      variant === "add" && styles.addButton,
      variant === "lost" && styles.lostButton,
      variant === "mypet" && styles.mypetButton,
      active &&
        (variant === "lost" ? styles.activeLostButton : styles.activeButton),
      pressed && styles.pressedButton,
    ]}
  >
    <View style={styles.actionContent}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={18}
            color={baseColor}
            style={styles.actionIcon}
          />
        )}
        <Text style={styles.actionText}>{label}</Text>
    </View>
  </Pressable>
);
};

export default function CadastroPet() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [isAddHover, setIsAddHover] = useState(false);

  const getStatusStyle = (status: "vacinacao" | "consulta" | "aviso" | "pendente") => {
    switch (status) {
      case "vacinacao":
        return styles.petSucess;
      case "consulta":
        return styles.petNeutral;
      case "aviso":
        return styles.petAlert;
      case "pendente":
        return styles.petPendente;
    }
  }


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
            icon="favorite-border"
            variant="mypet"
            active={activeIndex === 0}
            onPress={() => setActiveIndex(0)}
          />
          <ActionButton
            label="Registros"
            icon="description"
            active={activeIndex === 1}
            onPress={() => setActiveIndex(1)}
          />
          <ActionButton
            label="Pet Perdido"
            icon="warning-amber"
            color="danger"
            variant="lost"
            active={activeIndex === 2}
            onPress={() => setActiveIndex(2)}
          />
          <ActionButton
            label="Adicionar"
            icon="add"
            variant="add"
            active={activeIndex === 3}
            onPress={() => setActiveIndex(3)}
          />
        </View>

        {/* Cards */}
        <View style={styles.card}>
          <Image
            source={require("../../../assets/buddy.jpg")}
            style={styles.petImage}
          />
          <View style={{ flex: 1 }}>
            <View style={styles.petHeader}>
              <Text style={styles.petName}>Buddy</Text>
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
            <Text style={styles.petInfo}>Golden Retriever • Macho • 2 anos e 8 meses • 25kg</Text>
            <Text style={[styles.petStatus, getStatusStyle("vacinacao")]}>✅ Vacinação em dia</Text>
            <Text style={[styles.petStatus, getStatusStyle("aviso")]}>Consulta Agendada 31/01/2025</Text>
            <Text style={[styles.petStatus, getStatusStyle("consulta")]}>Última Consulta 01/12/2024</Text>
          </View>
          <TouchableOpacity style={styles.viewButton} onPress={() => {}}>
            <MaterialIcons name="description" color="#74a57f" />
            <Text style={styles.viewText}>Ver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Image
            source={require("../../../assets/neguinho.jpg")}
            style={styles.petImage}
          />
          <View style={{ flex: 1 }}>
            <View style={styles.petHeader}>
              <Text style={styles.petName}>Luna</Text>
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
            <Text style={styles.petInfo}>SRD • Fêmea • 6 meses • 3kg</Text>
            <Text style={[styles.petStatus, getStatusStyle("pendente")]}>⚠️ Vacina pendente</Text>
            <Text style={[styles.petStatus, getStatusStyle("consulta")]}>Última consulta 01/12/2024</Text>
          </View>
          <TouchableOpacity style={styles.viewButton} onPress={() => {}}>
            <MaterialIcons name="description" color="#74a57f" />
            <Text style={styles.viewText}>Ver</Text>
          </TouchableOpacity>
        </View>

        {/* Adicionar Pet */}
        <Pressable
          style={[styles.addPetButton, isAddHover && styles.addPetButtonHover]}
          onPress={() => {Alert.alert("Adicionar Pet", "Funcionalidade ainda não implementada.");}}
          onHoverIn={() => setIsAddHover(true)}
          onHoverOut={() => setIsAddHover(false)}
        >
          <MaterialIcons name="add" size={26} color={"#74a57e"}/>
          <Text style={styles.addPetText}>Adicionar Pet</Text>
          <Text style={styles.addPetSubtitle}>Cadastre um novo pet</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafcfa",
    padding: 16,
    paddingTop: 20,
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
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
},
  sectionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
    textAlign: "center"
  },
  actionContent:{
    flexDirection:"column",
    alignItems: "center",
    gap: 6,
  },
  actionIcon:{
    marginRight: 2,
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
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
  backgroundColor: "#f1fff8ff",
  },
  activeLostButton: {
    backgroundColor: "rgba(250, 235, 232, 1)"
  },
  activeRegisterButton: {
    backgroundColor: "#bbbbbbff",
  },
  dangerButton: {
    backgroundColor: "#fdd7d7ff",
  },
  lostButton:{
    backgroundColor: "#ffffffff",
    borderColor: "#f5e6de"
  },
  mypetButton: {
    backgroundColor: "#f1fff8ff",
    borderColor: "#d8fce9ff"
  },
  addButton: {
    backgroundColor: "#ffffffff",
    borderColor: "#d7ffecff"
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
    borderColor:"#00ff88ff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  petImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    resizeMode: "cover",
  },
  petHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  petActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  petName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconButton: {
    padding: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  iconButtonFirst: {
    marginLeft: 0,
  },
  iconButtonHover: {
    backgroundColor: "#e5e7eb",
  },
  iconButtonPressed: {
    backgroundColor: "#f3f4f6",
  },
  petInfo: {
    fontSize: 12,
    color: "#6b7280",
  },
  petStatus: {
    fontSize: 11,
    marginTop: 2,
  },
  viewButton: {
    marginLeft: 18,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e3ede5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "#ffffffff",
  },
  viewText: {
    paddingLeft: 6,
    fontSize: 12,
    color: "#74a57f",
  },
  addPetButton: {
    borderWidth: 2,
    borderColor: "#d0e0d3",
    borderStyle: "dashed",
    backgroundColor: "#f6fcf6ff",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 10,

  },
  addPetButtonHover:{
    borderColor: "#d0e0d3",
    backgroundColor: "#ff0000ff"
  },
  addPetText: {
    fontWeight: "600",
    fontSize: 14,
  },
  addPetSubtitle: {
    fontWeight: "400",
    color: "#6b7280",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 12,
  },
  petSucess: {
    color: "#059669"
  },
  petNeutral: {
    color: "#5f6674ff"
  },
  petAlert: {
    color: "#bc5d2e"
  },
  petPendente: {
    color: "#f4d35e"
  }
});
