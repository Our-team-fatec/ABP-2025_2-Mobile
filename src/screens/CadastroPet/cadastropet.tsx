import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Image,Pressable,ScrollView,Modal,KeyboardAvoidingView,Platform} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

interface ActionButtonProps {
label: string;
icon?: keyof typeof MaterialIcons.glyphMap;
variant?: "default" | "danger" | "add" | "lost" | "mypet";
active?: boolean;
color?: string;
onPress?: () => void;
}

type PetGender = "male" | "female" | "";

type NewPetForm = {
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  color: string;
  gender: PetGender;
  isNeutered: boolean;
  notes: string;
};

const initialNewPetData: NewPetForm = {
  name: "",
  species: "",
  breed: "",
  birthDate: "",
  color: "",
  gender: "",
  isNeutered: false,
  notes: "",
};

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
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newPetData, setNewPetData] = useState<NewPetForm>(initialNewPetData);
  const [isSpeciesDropdownOpen, setIsSpeciesDropdownOpen] = useState(false);

  const speciesOptions = [
    "Canino",
    "Felino",
    "Ave",
    "Peixe",
    "Roedor",
    "Réptil",
    "Outro",
  ];

  const handleOpenAddModal = () => {
    setIsAddModalVisible(true);
    setIsAddHover(false);
    setIsSpeciesDropdownOpen(false);
  };

  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
    setIsAddHover(false);
    setIsSpeciesDropdownOpen(false);
  };

  const handleNewPetChange = <K extends keyof NewPetForm>(
    field: K,
    value: NewPetForm[K]
  ) => {
    setNewPetData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectSpecies = (option: string) => {
    handleNewPetChange("species", option);
    setIsSpeciesDropdownOpen(false);
  };

  const handleSelectGender = (gender: PetGender) => {
    handleNewPetChange("gender", gender);
  };

  const handleToggleNeutered = () => {
    setNewPetData((prev) => ({ ...prev, isNeutered: !prev.isNeutered }));
  };

  const handleTakePhoto = () => {
    Alert.alert("Foto do pet", "Captura de foto será adicionada em breve.");
  };

  const handleOpenGallery = () => {
    Alert.alert("Galeria", "Seleção de imagens será adicionada em breve.");
  };

  const handleSubmitNewPet = () => {
    if (!isFormValid) {
      Alert.alert(
        "Cadastro de Pet",
        "Preencha os campos obrigatórios: nome, espécie, sexo e data de nascimento."
      );
      return;
    }

    Alert.alert(
      "Cadastro de Pet",
      `${newPetData.name} cadastrado com sucesso!`
    );
    setNewPetData(initialNewPetData);
    setIsSpeciesDropdownOpen(false);
    handleCloseAddModal();
  };

  const isFormValid =
    newPetData.name.trim().length > 0 &&
    newPetData.species.trim().length > 0 &&
    newPetData.gender !== "" &&
    newPetData.birthDate.trim().length > 0;

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
          onPress={handleOpenAddModal}
          onHoverIn={() => setIsAddHover(true)}
          onHoverOut={() => setIsAddHover(false)}
        >
          <MaterialIcons name="add" size={26} color={"#74a57e"}/>
          <Text style={styles.addPetText}>Adicionar Pet</Text>
          <Text style={styles.addPetSubtitle}>Cadastre um novo pet</Text>
        </Pressable>
      </ScrollView>

      <Modal
          visible={isAddModalVisible}
          transparent
          animationType="slide"
          onRequestClose={handleCloseAddModal}
        >
          <View style={styles.modalOverlay}>
            <Pressable style={styles.modalBackdrop} onPress={handleCloseAddModal} />
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.modalContainer}
            >
              <View style={styles.modalSheet}>
                <View style={styles.modalCard}>
                  <ScrollView
                    style={styles.modalFormScroll}
                    contentContainerStyle={styles.modalFormContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator
                  >
                    <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitleModal}>Foto do Pet</Text>
                    <View style={styles.photoCircle}>
                      <MaterialIcons name="photo-camera" size={32} color="#9ca3af" />
                    </View>
                    <View style={styles.photoButtonsRow}>
                      <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
                        <MaterialIcons name="photo-camera" size={16} color="#047857" />
                        <Text style={styles.photoButtonLabel}>Tirar Foto</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.photoButton} onPress={handleOpenGallery}>
                        <MaterialIcons name="photo-library" size={16} color="#047857" />
                        <Text style={styles.photoButtonLabel}>Galeria</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitleModal}>Informações Básicas</Text>

                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Nome do Pet *</Text>
                      <TextInput
                        style={styles.modalInput}
                        placeholder="Ex: Buddy"
                        value={newPetData.name}
                        onChangeText={(text) => handleNewPetChange("name", text)}
                      />
                    </View>

                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Espécie *</Text>
                      <View style={styles.selectContainer}>
                        <Pressable
                          style={styles.selectTrigger}
                          onPress={() => setIsSpeciesDropdownOpen((prev) => !prev)}
                        >
                          <Text
                            style={[
                              styles.selectTriggerText,
                              !newPetData.species && styles.selectPlaceholder,
                            ]}
                          >
                            {newPetData.species || "Selecione"}
                          </Text>
                          <MaterialIcons
                            name={isSpeciesDropdownOpen ? "expand-less" : "expand-more"}
                            size={20}
                            color="#047857"
                          />
                        </Pressable>
                        {isSpeciesDropdownOpen && (
                          <View style={styles.selectDropdown}>
                            {speciesOptions.map((option) => (
                              <Pressable
                                key={option}
                                style={[
                                  styles.selectOption,
                                  newPetData.species === option && styles.selectOptionActive,
                                ]}
                                onPress={() => handleSelectSpecies(option)}
                              >
                                <Text
                                  style={[
                                    styles.selectOptionText,
                                    newPetData.species === option && styles.selectOptionTextActive,
                                  ]}
                                >
                                  {option}
                                </Text>
                              </Pressable>
                            ))}
                          </View>
                        )}
                      </View>
                    </View>

                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Raça</Text>
                      <TextInput
                        style={styles.modalInput}
                        placeholder="Ex: Golden Retriever"
                        value={newPetData.breed}
                        onChangeText={(text) => handleNewPetChange("breed", text)}
                      />
                    </View>

                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Sexo *</Text>
                      <View style={styles.genderRow}>
                        <Pressable
                          style={[
                            styles.genderOption,
                            newPetData.gender === "male" && styles.genderOptionActive,
                          ]}
                          onPress={() => handleSelectGender("male")}
                        >
                          <View
                            style={[
                              styles.genderRadio,
                              newPetData.gender === "male" && styles.genderRadioActive,
                            ]}
                          />
                          <Text style={styles.genderLabel}>Macho</Text>
                        </Pressable>
                        <Pressable
                          style={[
                            styles.genderOption,
                            newPetData.gender === "female" && styles.genderOptionActive,
                          ]}
                          onPress={() => handleSelectGender("female")}
                        >
                          <View
                            style={[
                              styles.genderRadio,
                              newPetData.gender === "female" && styles.genderRadioActive,
                            ]}
                          />
                          <Text style={styles.genderLabel}>Fêmea</Text>
                        </Pressable>
                      </View>
                    </View>

                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Data de Nascimento *</Text>
                      <View style={styles.inputWithIcon}>
                        <MaterialIcons name="event" size={18} color="#6b7280" />
                        <TextInput
                          style={styles.inputWithIconText}
                          placeholder="Selecione a data"
                          value={newPetData.birthDate}
                          onChangeText={(text) => handleNewPetChange("birthDate", text)}
                        />
                      </View>
                    </View>

                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Cor</Text>
                      <TextInput
                        style={styles.modalInput}
                        placeholder="Ex: Dourado"
                        value={newPetData.color}
                        onChangeText={(text) => handleNewPetChange("color", text)}
                      />
                    </View>

                    <Pressable style={styles.checkboxRow} onPress={handleToggleNeutered}>
                      <View
                        style={[
                          styles.checkboxBox,
                          newPetData.isNeutered && styles.checkboxBoxChecked,
                        ]}
                      >
                        {newPetData.isNeutered && (
                          <MaterialIcons name="check" size={14} color="#ffffff" />
                        )}
                      </View>
                      <Text style={styles.checkboxLabel}>Castrado</Text>
                    </Pressable>

                    <View style={styles.modalField}>
                      <Text style={styles.modalLabel}>Observações</Text>
                      <TextInput
                        style={[styles.modalInput, styles.modalTextArea]}
                        placeholder="Vacinas, cuidados especiais..."
                        value={newPetData.notes}
                        multiline
                        numberOfLines={4}
                        onChangeText={(text) => handleNewPetChange("notes", text)}
                      />
                    </View>
                  </View>

                  </ScrollView>
                  <View style={styles.modalActions}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.modalCancelButton]}
                      onPress={handleCloseAddModal}
                    >
                      <Text style={[styles.modalButtonLabel, styles.modalCancelButtonLabel]}>
                        Cancelar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleSubmitNewPet}
                      disabled={!isFormValid}
                      style={[
                        styles.modalButton,
                        styles.modalPrimaryButton,
                        !isFormValid && styles.modalButtonDisabled,
                      ]}
                    >
                      <Text
                        style={[
                          styles.modalButtonLabel,
                          styles.modalPrimaryButtonLabel,
                          !isFormValid && styles.modalButtonDisabledLabel,
                        ]}
                      >
                        Salvar pet
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
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
    backgroundColor: "#eefaf1",
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: "center",
  },
  modalSheet: {
    width: "100%",
    maxWidth: 420,
    maxHeight: "80%",
    alignSelf: "center",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    width: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  modalFormScroll: {
    flexGrow: 0,
    width: "100%",
  },
  modalFormContent: {
    paddingBottom: 24,
    gap: 14,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    padding: 16,
    gap: 14,
    backgroundColor: "#f9fafb",
  },
  modalHeader: {
    gap: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#064e3b",
    textAlign: "center"
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#4b5563",
  },
  sectionTitleModal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  photoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  photoButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#cde7d6",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
  },
  photoButtonLabel: {
    fontSize: 13,
    color: "#047857",
    fontWeight: "600",
  },
  modalField: {
    gap: 6,
  },
  modalLabel: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#f9fafb",
    fontSize: 14,
    color: "#111827",
  },
  modalTextArea: {
    minHeight: 96,
    textAlignVertical: "top",
  },
  selectContainer: {
    position: "relative",
  },
  selectTrigger: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectTriggerText: {
    fontSize: 14,
    color: "#111827",
  },
  selectPlaceholder: {
    color: "#9ca3af",
  },
  selectDropdown: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  selectOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  selectOptionActive: {
    backgroundColor: "#ecfdf5",
  },
  selectOptionText: {
    fontSize: 14,
    color: "#111827",
  },
  selectOptionTextActive: {
    color: "#047857",
    fontWeight: "600",
  },
  modalRow: {
    flexDirection: "row",
    gap: 12,
  },
  genderRow: {
    flexDirection: "row",
    gap: 12,
  },
  genderOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
  },
  genderOptionActive: {
    borderColor: "#047857",
    backgroundColor: "#ecfdf5",
  },
  genderRadio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#9ca3af",
  },
  genderRadioActive: {
    borderColor: "#047857",
    backgroundColor: "#047857",
  },
  genderLabel: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  inputWithIconText: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9ca3af",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxBoxChecked: {
    backgroundColor: "#047857",
    borderColor: "#047857",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#111827",
  },
  modalRowItem: {
    flex: 1,
    gap: 6,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 4,
  },
  modalButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonLabel: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  modalCancelButton: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  modalCancelButtonLabel: {
    color: "#374151",
  },
  modalPrimaryButton: {
    backgroundColor: "#10b981",
  },
  modalPrimaryButtonLabel: {
    color: "#fff",
  },
  modalButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  modalButtonDisabledLabel: {
    color: "#e5e7eb",
  },
});
