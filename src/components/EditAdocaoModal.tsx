import React, { useState, useEffect } from "react";
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
import { cadastroPetStyles as styles } from "../styles/cadastroPet";
import type { Adocao, UpdateAdocaoRequest } from "../services/adocao";

interface EditAdocaoModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (adocaoId: string, data: UpdateAdocaoRequest) => Promise<void>;
  adocao: Adocao | null;
}

export function EditAdocaoModal({ visible, onClose, onSubmit, adocao }: EditAdocaoModalProps) {
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("EditAdocaoModal - visible:", visible, "adocao:", adocao);
    if (adocao) {
      console.log("Preenchendo campos com:", adocao.descricao, adocao.endereco);
      setDescricao(adocao.descricao);
      setEndereco(adocao.endereco);
    }
  }, [adocao, visible]);

  const handleSubmit = async () => {
    if (!adocao) return;

    // Validação
    if (!descricao.trim()) {
      Alert.alert("Erro", "Digite uma descrição para o anúncio");
      return;
    }
    if (!endereco.trim()) {
      Alert.alert("Erro", "Digite um endereço");
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(adocao.id, {
        descricao: descricao.trim(),
        endereco: endereco.trim(),
      });
      // onClose é chamado no handleUpdateAdocao após sucesso
    } catch (error) {
      console.error("Erro no submit do modal:", error);
      Alert.alert("Erro", "Não foi possível atualizar o anúncio");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (adocao) {
      setDescricao(adocao.descricao);
      setEndereco(adocao.endereco);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible && adocao !== null}
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
                <Text style={[styles.sectionTitle, { marginBottom: 16, fontSize: 18, fontWeight: '600' }]}>
                  Editar Anúncio de Adoção
                </Text>

                {/* Descrição */}
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitleModal}>Descrição *</Text>
                  <TextInput
                    style={[styles.modalInput, styles.modalTextArea]}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Ex: Rex é um cachorro muito dócil e amigável..."
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
                      Salvar
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
