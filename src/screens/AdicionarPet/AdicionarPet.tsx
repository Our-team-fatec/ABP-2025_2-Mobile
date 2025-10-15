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
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Configuração para o calendário ficar em Português
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt-br';

export default function AdicionarPet() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Cão', value: 'Cão'},
    {label: 'Gato', value: 'Gato'},
    {label: 'Pássaro', value: 'Pássaro'},
    {label: 'Outro', value: 'Outro'}
  ]);
  
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const [formData, setFormData] = useState({
    fotoUri: null as string | null,
    nomePet: "",
    especie: null as string | null,
    raca: "",
    sexo: "macho",
    dataNascimento: "", // Formato 'YYYY-MM-DD'
    cor: "", // <<< NOVO CAMPO ADICIONADO AO ESTADO
    castrado: false,
    peso: "",
    altura: "",
    nomeTutor: "",
    telefoneTutor: "",
    emailTutor: "",
  });

  const handleChange = (name: string, value: any) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSalvar = () => {
    if (!formData.nomePet || !formData.especie || !formData.nomeTutor) {
      Alert.alert("Erro", "Preencha os campos obrigatórios (*)");
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
  
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "Selecione a data";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Modal
          transparent={true}
          animationType="fade"
          visible={isCalendarVisible}
          onRequestClose={() => setCalendarVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPressOut={() => setCalendarVisible(false)}
          >
            <View style={styles.calendarContainer}>
              <Calendar
                current={formData.dataNascimento || new Date().toISOString().split('T')[0]}
                onDayPress={(day) => {
                  handleChange('dataNascimento', day.dateString);
                  setCalendarVisible(false);
                }}
                markedDates={{
                  [formData.dataNascimento]: { selected: true, selectedColor: '#C8754D' }
                }}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  selectedDayBackgroundColor: '#C8754D',
                  todayTextColor: '#C8754D',
                  arrowColor: '#C8754D',
                  monthTextColor: '#333',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '600',
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Novo Pet</Text>
              <Text style={styles.subtitle}>Preencha os dados do seu novo amigo</Text>
            </View>
            
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
                open={open}
                value={formData.especie}
                items={items}
                setOpen={setOpen}
                setValue={(callback) => handleChange('especie', callback(formData.especie))}
                setItems={setItems}
                placeholder="Selecione"
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                dropDownContainerStyle={styles.dropdownContainer}
                listItemLabelStyle={styles.dropdownListItem}
                selectedItemContainerStyle={styles.dropdownSelectedItemContainer}
                selectedItemLabelStyle={styles.dropdownSelectedItemLabel}
                zIndex={3000}
                zIndexInverse={1000}
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
              
              <View style={styles.labelContainer}>
                <MaterialIcons name="cake" size={16} color="#666" />
                <Text style={styles.labelText}>Data de Nascimento *</Text>
              </View>
              <TouchableOpacity style={styles.input} onPress={() => setCalendarVisible(true)}>
                <Text style={formData.dataNascimento ? styles.inputText : styles.placeholderText}>
                  {formatDateForDisplay(formData.dataNascimento)}
                </Text>
              </TouchableOpacity>
              
              {/* --- NOVO CAMPO "COR" ADICIONADO AQUI --- */}
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
              {/* --- FIM DO NOVO CAMPO --- */}

              <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleChange("castrado", !formData.castrado)}>
                <MaterialIcons name={formData.castrado ? 'check-box' : 'check-box-outline-blank'} size={24} color="#89b490" />
                <Text style={styles.labelText}>Castrado</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Medidas e Peso</Text>
              
              <View style={styles.labelContainer}>
                <MaterialIcons name="height" size={16} color="#666" />
                <Text style={styles.labelText}>Peso (kg)</Text>
              </View>
              <TextInput style={styles.input} placeholder="Ex: 25.5" value={formData.peso} onChangeText={(text) => handleChange("peso", text)} keyboardType="numeric" selectionColor="#89b490" />
              
              <View style={styles.labelContainer}>
                <MaterialIcons name="square-foot" size={16} color="#666" />
                <Text style={styles.labelText}>Altura (cm)</Text>
              </View>
              <TextInput style={styles.input} placeholder="Ex: 60" value={formData.altura} onChangeText={(text) => handleChange("altura", text)} keyboardType="numeric" selectionColor="#89b490" />
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Informações do Tutor</Text>
              
              <View style={styles.labelContainer}>
                <MaterialIcons name="person" size={16} color="#666" />
                <Text style={styles.labelText}>Nome do Tutor *</Text>
              </View>
              <TextInput style={styles.input} placeholder="João da Silva" value={formData.nomeTutor} onChangeText={(text) => handleChange("nomeTutor", text)} selectionColor="#89b490" />
              
              <View style={styles.labelContainer}>
                <MaterialIcons name="phone" size={16} color="#666" />
                <Text style={styles.labelText}>Telefone *</Text>
              </View>
              <TextInput style={styles.input} placeholder="(11) 99999-9999" value={formData.telefoneTutor} onChangeText={(text) => handleChange("telefoneTutor", text)} keyboardType="phone-pad" selectionColor="#89b490" />
              
              <View style={styles.labelContainer}>
                <MaterialIcons name="email" size={16} color="#666" />
                <Text style={styles.labelText}>Email *</Text>
              </View>
              <TextInput style={styles.input} placeholder="joao@email.com" value={formData.emailTutor} onChangeText={(text) => handleChange("emailTutor", text)} keyboardType="email-address" selectionColor="#89b490" />
            </View>

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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