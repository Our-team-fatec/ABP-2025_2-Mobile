import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// Mantenha o DropDownPicker
import DropDownPicker from 'react-native-dropdown-picker';
// Remova as importações do Calendário

export default function AdicionarPet() {
  // Estados para os DropDownPickers
  const [especieOpen, setEspecieOpen] = useState(false);
  const [especieItems, setEspecieItems] = useState([
    {label: 'Cachorro', value: 'Cachorro'}, // Opções alteradas
    {label: 'Gato', value: 'Gato'}      // Opções alteradas
  ]);

  const [porteOpen, setPorteOpen] = useState(false); // Novo estado para o Porte
  const [porteItems, setPorteItems] = useState([ // Novas opções para o Porte
    {label: 'Pequeno', value: 'Pequeno'},
    {label: 'Médio', value: 'Médio'},
    {label: 'Grande', value: 'Grande'}
  ]);

  // Estado principal do formulário, ajustado conforme solicitado
  const [formData, setFormData] = useState({
    fotoUri: null as string | null,
    nomePet: "",
    especie: null as string | null,
    raca: "",
    sexo: "macho",
    idade: "", // Substitui dataNascimento
    porte: null as string | null, // Novo campo
    cor: "",
    castrado: false,
    // peso e altura removidos
    // campos do tutor removidos
  });

  const handleChange = (name: string, value: any) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Validação ajustada no handleSalvar
  const handleSalvar = () => {
    if (!formData.nomePet || !formData.especie || !formData.idade || !formData.porte) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios (*)");
      return;
    }
    Alert.alert("Sucesso", "Pet salvo com sucesso!", [{ text: "OK" }]);
    console.log(formData);
  };

  const handleCancelar = () => {
    Alert.alert("Ação cancelada.");
  };

  const handleTakePhoto = () => {
    Alert.alert("Tirar Foto", "Funcionalidade de câmera a ser implementada.");
  };

  const handleOpenGallery = () => {
    Alert.alert("Abrir Galeria", "Funcionalidade de galeria a ser implementada.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Modal do Calendário Removido */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Novo Pet</Text>
              <Text style={styles.subtitle}>Preencha os dados do seu novo amigo</Text>
            </View>
            
            {/* --- SEÇÃO FOTO DO PET (Mantida) --- */}
            <View style={styles.formContainer}>
                <Text style={styles.sectionTitleCentered}>Foto do Pet</Text>
                <TouchableOpacity style={styles.photoCircle} onPress={handleOpenGallery}>
                    {formData.fotoUri ? (
                        <Image source={{ uri: formData.fotoUri }} style={styles.photoImage} />
                    ) : (
                        <MaterialIcons name="photo-camera" size={40} color="#888" />
                    )}
                </TouchableOpacity>
                <View style={styles.photoButtonsContainer}>
                    <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
                        <MaterialIcons name="camera-alt" size={20} color="#555" />
                        <Text style={styles.photoButtonText}>Tirar Foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoButton} onPress={handleOpenGallery}>
                        <MaterialIcons name="photo-library" size={20} color="#555" />
                        <Text style={styles.photoButtonText}>Galeria</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- INFORMAÇÕES BÁSICAS (Ajustadas) --- */}
            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Informações Básicas</Text>

              <View style={styles.labelContainer}>
                <MaterialIcons name="pets" size={16} color="#666" />
                <Text style={styles.labelText}>Nome do Pet *</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Ex: Buddy"
                value={formData.nomePet}
                onChangeText={(text) => handleChange("nomePet", text)}
                selectionColor="#89b490"
              />
              
              <View style={styles.labelContainer}>
                <MaterialIcons name="category" size={16} color="#666" />
                <Text style={styles.labelText}>Espécie *</Text>
              </View>
              <DropDownPicker
                open={especieOpen}
                value={formData.especie}
                items={especieItems}
                setOpen={setEspecieOpen}
                setValue={(callback) => handleChange('especie', callback(formData.especie))}
                setItems={setEspecieItems}
                placeholder="Selecione"
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                dropDownContainerStyle={styles.dropdownContainer}
                listItemLabelStyle={styles.dropdownListItem}
                selectedItemContainerStyle={styles.dropdownSelectedItemContainer}
                selectedItemLabelStyle={styles.dropdownSelectedItemLabel}
                zIndex={3000} // Prioridade para este dropdown
                zIndexInverse={1000}
                listMode="SCROLLVIEW" // Evita problemas de renderização em Android
              />

              <View style={styles.labelContainer}>
                <MaterialIcons name="pets" size={16} color="#666" />
                <Text style={styles.labelText}>Raça</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Ex: Golden Retriever"
                value={formData.raca}
                onChangeText={(text) => handleChange("raca", text)}
                selectionColor="#89b490"
              />

              <View style={styles.labelContainer}>
                <MaterialIcons name="wc" size={16} color="#666" />
                <Text style={styles.labelText}>Sexo *</Text>
              </View>
              <View style={styles.radioGroup}>
                <TouchableOpacity style={styles.radioOption} onPress={() => handleChange("sexo", "macho")}>
                  <MaterialIcons name={formData.sexo === 'macho' ? 'radio-button-checked' : 'radio-button-unchecked'} size={24} color="#89b490" />
                  <Text style={styles.radioText}>Macho</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioOption} onPress={() => handleChange("sexo", "femea")}>
                  <MaterialIcons name={formData.sexo === 'femea' ? 'radio-button-checked' : 'radio-button-unchecked'} size={24} color="#89b490" />
                  <Text style={styles.radioText}>Fêmea</Text>
                </TouchableOpacity>
              </View>
              
              {/* --- CAMPO IDADE (Substitui Data de Nascimento) --- */}
              <View style={styles.labelContainer}>
                <MaterialIcons name="cake" size={16} color="#666" />
                <Text style={styles.labelText}>Idade (anos) *</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Ex: 2"
                value={formData.idade}
                onChangeText={(text) => handleChange("idade", text)}
                keyboardType="numeric" // Teclado numérico
                selectionColor="#89b490"
              />

              {/* --- NOVO CAMPO PORTE --- */}
              <View style={styles.labelContainer}>
                <MaterialIcons name="straighten" size={16} color="#666" />
                <Text style={styles.labelText}>Porte *</Text>
              </View>
              <DropDownPicker
                open={porteOpen}
                value={formData.porte}
                items={porteItems}
                setOpen={setPorteOpen}
                setValue={(callback) => handleChange('porte', callback(formData.porte))}
                setItems={setPorteItems}
                placeholder="Selecione"
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                dropDownContainerStyle={styles.dropdownContainer}
                listItemLabelStyle={styles.dropdownListItem}
                selectedItemContainerStyle={styles.dropdownSelectedItemContainer}
                selectedItemLabelStyle={styles.dropdownSelectedItemLabel}
                zIndex={2000} // Menor prioridade que espécie
                zIndexInverse={2000}
                listMode="SCROLLVIEW"
              />
              
              <View style={styles.labelContainer}>
                <MaterialIcons name="color-lens" size={16} color="#666" />
                <Text style={styles.labelText}>Cor</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Ex: Dourado, Preto e Branco"
                value={formData.cor}
                onChangeText={(text) => handleChange("cor", text)}
                selectionColor="#89b490"
              />

              <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleChange("castrado", !formData.castrado)}>
                <MaterialIcons name={formData.castrado ? 'check-box' : 'check-box-outline-blank'} size={24} color="#89b490" />
                <Text style={styles.labelText}>Castrado</Text>
              </TouchableOpacity>
            </View>

            {/* --- SEÇÃO MEDIDAS E PESO (Removida) --- */}

            {/* --- SEÇÃO INFORMAÇÕES DO TUTOR (Removida) --- */}

            <TouchableOpacity style={styles.button} onPress={handleSalvar}>
              <Text style={styles.buttonText}>Salvar Pet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fafcfa",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  container: {
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontFamily: "Arial",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontFamily: "Arial",
    fontSize: 16,
    color: "#666",
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionTitleCentered: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  labelText: {
    fontFamily: "Arial",
    fontSize: 14,
    marginLeft: 6,
    color: '#333',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 15,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F7F8FA",
    justifyContent: 'center',
    minHeight: 50,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  dropdown: {
    backgroundColor: '#F7F8FA',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 50,
    marginBottom: 15, // Adiciona espaço após o dropdown
  },
  dropdownPlaceholder: {
    color: "#999",
    fontSize: 16,
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownListItem: {
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
  },
  dropdownSelectedItemContainer: {
    backgroundColor: '#C8754D',
  },
  dropdownSelectedItemLabel: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  radioText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  photoButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  button: {
    backgroundColor: "#89b490",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: 'underline',
  },
});
