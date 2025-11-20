import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";
import type { Pet } from "../services/pet";
import type { CreateAdocaoRequest } from "../services/adocao";

interface AddAdocaoModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAdocaoRequest) => Promise<void>;
  pets: Pet[];
}

export function AddAdocaoModal({ visible, onClose, onSubmit, pets }: AddAdocaoModalProps) {
  const [petId, setPetId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPetDropdownOpen, setIsPetDropdownOpen] = useState(false);
  const [petSearch, setPetSearch] = useState("");

  const selectedPet = pets.find(p => p.id === petId);
  const filteredPets = pets.filter(pet => 
    pet.nome.toLowerCase().includes(petSearch.toLowerCase().trim())
  );

  const formatPhone = (text: string) => {
    // Remove tudo que não é número
    const numbers = text.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limited = numbers.slice(0, 11);
    
    // Formata: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    if (limited.length <= 2) {
      return limited;
    } else if (limited.length <= 6) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    } else if (limited.length <= 10) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
    } else {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
    }
  };

  const handleSubmit = async () => {
    // Validação
    if (!petId) {
      Alert.alert("Erro", "Selecione um pet para anunciar");
      return;
    }
    if (!descricao.trim()) {
      Alert.alert("Erro", "Digite uma descrição para o anúncio");
      return;
    }
    if (!endereco.trim()) {
      Alert.alert("Erro", "Digite um endereço");
      return;
    }
    if (!contato.trim()) {
      Alert.alert("Erro", "Digite um telefone de contato");
      return;
    }

    setIsLoading(true);
    try {
      // Remove formatação do telefone, mantém apenas números
      const contatoNumeros = contato.replace(/\D/g, '');
      
      await onSubmit({
        pet_id: petId,
        descricao: descricao.trim(),
        endereco: endereco.trim(),
        contato: contatoNumeros,
      });
      
      // Limpar formulário
      setPetId("");
      setDescricao("");
      setEndereco("");
      setContato("");
      setPetSearch("");
      onClose();
    } catch (error: any) {
      console.error("Erro ao criar adoção:", error);
      const errorMessage = error.message || "Não foi possível criar o anúncio de adoção";
      Alert.alert("Erro", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setPetId("");
    setDescricao("");
    setEndereco("");
    setContato("");
    setIsPetDropdownOpen(false);
    setPetSearch("");
    onClose();
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
                {/* Seletor de Pet */}
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitleModal}>Selecionar Pet *</Text>
                  
                  <View style={{ position: 'relative', zIndex: 1000 }}>
                    <Pressable
                      onPress={() => setIsPetDropdownOpen(!isPetDropdownOpen)}
                      style={({ pressed }) => [
                        styles.dropdownButton,
                        isPetDropdownOpen && { borderColor: "#74a57e", borderWidth: 2 },
                        pressed && { backgroundColor: "#f9fafb" }
                      ]}
                    >
                      <Text style={[
                        styles.dropdownButtonText,
                        selectedPet && { color: "#111827", fontWeight: "500" },
                        !selectedPet && { color: "#9ca3af" }
                      ]}>
                        {selectedPet ? `🐾 ${selectedPet.nome} - ${selectedPet.especie}` : "Selecione um pet..."}
                      </Text>
                      <MaterialIcons
                        name={isPetDropdownOpen ? "expand-less" : "expand-more"}
                        size={24}
                        color={isPetDropdownOpen ? "#74a57e" : "#6b7280"}
                      />
                    </Pressable>

                    {isPetDropdownOpen && (
                      <View style={[
                        styles.dropdownMenu,
                        {
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          marginTop: 8,
                          zIndex: 1001,
                        }
                      ]}>
                        <View style={{
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                          borderBottomWidth: 1,
                          borderBottomColor: "#e5e7eb",
                          backgroundColor: "#f9fafb"
                        }}>
                          <TextInput
                            style={[styles.modalInput, { marginBottom: 0, fontSize: 15 }]}
                            value={petSearch}
                            onChangeText={setPetSearch}
                            placeholder="🔍 Buscar pet por nome..."
                            placeholderTextColor="#9ca3af"
                            autoFocus
                          />
                        </View>
                        <ScrollView style={{ maxHeight: 240 }} nestedScrollEnabled>
                          {filteredPets.length === 0 ? (
                            <Text style={styles.dropdownEmptyText}>
                              {petSearch ? "Nenhum pet encontrado" : "Nenhum pet disponível"}
                            </Text>
                          ) : (
                            filteredPets.map((pet, index) => (
                              <Pressable
                                key={pet.id}
                                style={({ pressed }) => [
                                  styles.dropdownOption,
                                  petId === pet.id && styles.dropdownOptionSelected,
                                  pressed && { backgroundColor: "#f3f4f6" },
                                  index === filteredPets.length - 1 && { borderBottomWidth: 0 }
                                ]}
                                onPress={() => {
                                  setPetId(pet.id);
                                  setIsPetDropdownOpen(false);
                                  setPetSearch("");
                                }}
                              >
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                  <Text style={{ fontSize: 18 }}>
                                    {pet.especie === "CACHORRO" ? "🐕" : "🐈"}
                                  </Text>
                                  <View style={{ flex: 1 }}>
                                    <Text style={[
                                      styles.dropdownOptionText,
                                      petId === pet.id && { fontWeight: "600", color: "#047857" }
                                    ]}>
                                      {pet.nome}
                                    </Text>
                                    <Text style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
                                      {pet.raca} • {pet.genero === "MACHO" ? "Macho" : "Fêmea"}
                                    </Text>
                                  </View>
                                  {petId === pet.id && (
                                    <MaterialIcons name="check-circle" size={20} color="#047857" />
                                  )}
                                </View>
                              </Pressable>
                            ))
                          )}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </View>

                {/* Descrição */}
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitleModal}>Descrição *</Text>
                  <TextInput
                    style={[styles.modalInput, styles.modalTextArea]}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Ex: Rex é um cachorro muito dócil e amigável, ideal para famílias com crianças..."
                    placeholderTextColor="#9ca3af"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                {/* Endereço */}
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitleModal}>Endereço *</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={endereco}
                    onChangeText={setEndereco}
                    placeholder="Ex: São Paulo, SP"
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                {/* Contato */}
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitleModal}>Telefone de Contato *</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={contato}
                    onChangeText={(text) => setContato(formatPhone(text))}
                    placeholder="(00) 00000-0000"
                    placeholderTextColor="#9ca3af"
                    keyboardType="phone-pad"
                    maxLength={15}
                  />
                </View>
              </ScrollView>

              {/* Botões */}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalCancelButton]}
                  onPress={handleCancel}
                  disabled={isLoading}
                >
                  <Text style={[styles.modalButtonLabel, styles.modalCancelButtonLabel]}>
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.modalSubmitButton]}
                  onPress={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Text style={[styles.modalButtonLabel, styles.modalSubmitButtonLabel]}>
                      Salvando...
                    </Text>
                  ) : (
                    <Text style={[styles.modalButtonLabel, styles.modalSubmitButtonLabel]}>
                      Criar Anúncio
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

