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
  const [contato, setContato] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    console.log("EditAdocaoModal - visible:", visible, "adocao:", adocao);
    if (adocao) {
      console.log("Preenchendo campos com:", adocao.descricao, adocao.endereco, adocao.contato);
      setDescricao(adocao.descricao);
      setEndereco(adocao.endereco);
      // Formata o contato ao carregar
      setContato(adocao.contato ? formatPhone(adocao.contato) : "");
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
    if (!contato.trim()) {
      Alert.alert("Erro", "Digite um telefone de contato");
      return;
    }

    setIsLoading(true);
    try {
      // Remove formatação do telefone, mantém apenas números
      const contatoNumeros = contato.replace(/\D/g, '');
      
      await onSubmit(adocao.id, {
        descricao: descricao.trim(),
        endereco: endereco.trim(),
        contato: contatoNumeros,
      });
      // onClose é chamado no handleUpdateAdocao após sucesso
    } catch (error: any) {
      console.error("Erro no submit do modal:", error);
      const errorMessage = error.message || "Não foi possível atualizar o anúncio";
      Alert.alert("Erro", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (adocao) {
      setDescricao(adocao.descricao);
      setEndereco(adocao.endereco);
      setContato(adocao.contato ? formatPhone(adocao.contato) : "");
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
