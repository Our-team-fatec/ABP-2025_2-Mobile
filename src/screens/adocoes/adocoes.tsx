import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';

export default function Adocoes() {
  const [selectedTab, setSelectedTab] = useState('explorar');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Central de Adoções</Text>
        <Text style={styles.subtitle}>Encontre seu novo melhor amigo</Text>
      </View>
      <View style={styles.containerCard}>
        <View style={styles.styleCard}>
          <Feather name="heart" size={24} color="black" />
          <Text style={styles.cardText}>Pets{"\n"}Disponíveis</Text>
        </View>
        <View style={styles.styleCard}>
          <Feather name="check-circle" size={24} color="black" />
          <Text style={styles.cardText}>Minhas{"\n"}Adoções</Text>
        </View>
      </View>
      <View style={styles.containerBar}>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            styles.leftTab,
            selectedTab === 'explorar' && styles.activeTab
          ]}
          onPress={() => setSelectedTab('explorar')}
        >
          <Text style={[
            styles.tabText, 
            selectedTab === 'explorar' && styles.activeTabText
          ]}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            styles.middleTab,
            selectedTab === 'candidaturas' && styles.activeTab
          ]}
          onPress={() => setSelectedTab('candidaturas')}
        >
          <Text style={[
            styles.tabText, 
            selectedTab === 'candidaturas' && styles.activeTabText
          ]}>Minhas Candidaturas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            styles.rightTab,
            selectedTab === 'anuncios' && styles.activeTab
          ]}
          onPress={() => setSelectedTab('anuncios')}
        >
          <Text style={[
            styles.tabText, 
            selectedTab === 'anuncios' && styles.activeTabText
          ]}>Meus Anúncios</Text>
        </TouchableOpacity>
      </View>
      <View style= {styles.buscar}>
        <View style={styles.searchRow}>
          <View style={styles.inputContainer}>
            <FontAwesome6 name="magnifying-glass" size={16} color="#5a5959ff" style={styles.icon} />
            <TextInput
              placeholder="Buscar por espécie, raça, localização, ..."
              placeholderTextColor="#666"
              selectionColor="#89b490"
              style={styles.textInput}
          />
          </View>
          <View style={styles.filterContainer}><TouchableOpacity style={styles.filter}><MaterialCommunityIcons name="filter-outline" size={24} color="#78a883" />
          Filtros
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.buttons}>
            Todos
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            Cães
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            Gatos
          </TouchableOpacity>
        </View>
        <View style={styles.petCard}>
          <View>
             <Image style={styles.petCardImage} source={require("../../../assets/cachorro.jpg")}/>
          </View>
          <View style={styles.petCardTexts}>
            <Text style={styles.petCardTextName}>Luna</Text>
            <View style={styles.petCardSubTexts}>
              <Text>Raça:</Text>
              <Text>Porte:</Text>
              <Text>Idade:</Text>
              <Text>Peso:</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.cadastrarPetButton}>
          Cadastrar Pet para adoção
          <View style = {styles.plusIcon}>
          <Entypo name="plus" size={60} color="black" />
          </View>
          Ajude um pet a encontrar um novo lar
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fafcfa",
  },
  container: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Arial",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Arial",
    fontSize: 16,
    fontWeight: "300",
    color: "#666",
    textAlign: "center",
  },
  containerCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  styleCard: {
    borderColor: "#ddd",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    flex: 1,
    width: 100,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontFamily: "Arial",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
    marginTop: 8,
    lineHeight: 16,
  },
  containerBar: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 8,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#8fb894",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0,
  },
  leftTab: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  middleTab: {
    // Sem bordas arredondadas para o botão do meio
  },
  rightTab: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderRightWidth: 1,
  },
  activeTab: {
    backgroundColor: "#7CB342",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },
  inputContainer: {
    borderColor: "#d5e4d8",
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon:{
    marginRight: 8
  },
  buscar: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 120,
    margin: 10,
    flexDirection: "column",
    gap: 12
  },
  filter: {
    borderColor: "#d5e4d8",
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    width: 80,
    flexDirection: "row",
    alignItems: "center",
    color: "#78a883",
  },
  filterContainer: {
    marginLeft: 10
  },
  buttons: {
    borderColor: "#d5e4d8",
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    color: "#78a883"
  },
  buttonsRow:{
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  searchRow:{
    flexDirection: "row",
  },
  textInput:{
    flex: 1,
  },
  petCard:{
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 2,
    marginTop: 20,
  },
  petCardImage: {
    flex: 1,
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  petCardTextName: {
    fontFamily: "Arial",
    fontSize: 24,
  },
  petCardSubTexts: {
    flexDirection: "column",
    fontSize: 20,
  },
  petCardTexts:{
    margin: 8,
  },
  cadastrarPetButton:{
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 8,
    textAlign: "center",
  },
  plusIcon: {
    alignItems: "center"
  }
});
