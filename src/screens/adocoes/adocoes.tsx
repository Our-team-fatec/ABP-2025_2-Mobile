import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';

export default function Adocoes() {
  const [selectedTab, setSelectedTab] = useState('explorar');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Central de Adoções</Text>
        <Text style={styles.subtitle}>Encontre seu novo melhor amigo</Text>
      </View>
      <View style={styles.containerCard}>
        <View style={styles.styleCardPets}>
          <View style={styles.iconCircleHeart}>
            <Feather name="heart" size={24} color="#74a57f" />
          </View>
          <Text style={styles.cardText}>{"\n"} Pets Disponíveis</Text>
        </View>
        <View style={styles.styleCardAdocoes}>
          <View style={styles.iconCircleCheck}>
            <Feather name="check-circle" size={24} color="black" />
          </View>
          <Text style={styles.cardText}>{"\n"} Minhas Adoções</Text>
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
            <FontAwesome6 name="magnifying-glass" size={16} color="#999" style={styles.icon} />
            <TextInput
              placeholder="Buscar por espécie, raça, localização, ..."
              placeholderTextColor="#999"
              selectionColor="#89b490"
              style={styles.textInput}
          />
          </View>
            <TouchableOpacity style={styles.filter}>
              <MaterialCommunityIcons name="filter-outline" size={24} color="#78a883" />
              <Text style={styles.filterText}>Filtros</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity 
            style={[
              styles.categoryButtons, 
              selectedCategory === 'todos' && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory('todos')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === 'todos' && styles.categoryButtonActiveText
            ]}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.categoryButtons,
              selectedCategory === 'caes' && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory('caes')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === 'caes' && styles.categoryButtonActiveText
            ]}>Cães</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.categoryButtons,
              selectedCategory === 'gatos' && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory('gatos')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === 'gatos' && styles.categoryButtonActiveText
            ]}>Gatos</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.petCard}>
          <View style={styles.petCardImageContainer}>
            <Image style={styles.petCardImage} source={require("../../../assets/cachorro.jpg")}/>
            
            <View style={styles.verifiedBadge}>
              <Feather name="check" size={12} color="#fff" />
              <Text style={styles.verifiedText}>Verificado</Text>
            </View>

            <TouchableOpacity style={styles.heartButton}>
              <Feather name="heart" size={20} color="#666" />
            </TouchableOpacity>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Feather name="eye" size={14} color="#fff" />
                <Text style={styles.statText}>127</Text>
              </View>
              <View style={styles.statItem}>
                <Feather name="heart" size={14} color="#fff" />
                <Text style={styles.statText}>23</Text>
              </View>
            </View>
          </View>
          <View style={styles.petCardContent}>
            <View style={styles.petCardHeader}>
              <Text style={styles.petCardName}>Luna</Text>
              <View style={styles.genderBadge}>
                <Text style={styles.genderBadgeText}>♀ Fêmea</Text>
              </View>
            </View>
  
            <View style={styles.petInfoRow}>
              <View style={styles.petInfoItem}>
                <Text style={styles.petInfoLabel}>Raça:</Text>
                <Text style={styles.petInfoValue}>Vira-lata</Text>
              </View>
              <View style={styles.petInfoItem}>
                <Text style={styles.petInfoLabel}>Idade:</Text>
                <Text style={styles.petInfoValue}>2 anos</Text>
              </View>
            </View>
            
            <View style={styles.petInfoRow}>
              <View style={styles.petInfoItem}>
                <Text style={styles.petInfoLabel}>Porte:</Text>
                <Text style={styles.petInfoValue}>Médio</Text>
              </View>
              <View style={styles.petInfoItem}>
                <Text style={styles.petInfoLabel}>Peso:</Text>
                <Text style={styles.petInfoValue}>18kg</Text>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <Feather name="map-pin" size={14} color="#666" />
              <Text style={styles.locationText}>São Paulo, SP - 3,2km de você</Text>
            </View>
            <Text style={styles.petDescription}>
              Luna é uma cadela muito carinhosa e brincalhona. Ela adora brincar com outros cães e crianças. É muito...
            </Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tagVacinado}>
                <Text style={styles.tagVacinadoText}>Vacinado</Text>
              </View>
              <View style={styles.tagCastrado}>
                <Text style={styles.tagCastradoText}>Castrado</Text>
              </View>
              <View style={styles.tagCriancas}>
                <Text style={styles.tagCriancasText}>Bom c/ crianças</Text>
              </View>
            </View>
            <View style={styles.cardButtonsRow}>
              <TouchableOpacity style={styles.verMaisButton}>
                <Feather name="eye" size={16} color="#666" />
                <Text style={styles.verMaisText}>Ver Mais</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.queroAdotarButton}>
                <Feather name="heart" size={16} color="#fff" />
                <Text style={styles.queroAdotarText}>Quero Adotar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Pressable style={styles.cadastrarPetButton}>
          <View style={styles.plusIcon}>
            <Feather name="plus" size={32} color="#74a57f" />
          </View>
          <Text style={styles.cadastrarPetTitle}>Cadastrar Pet para Adoção</Text>
          <Text style={styles.cadastrarPetSubtitle}>Ajude um pet a encontrar um novo lar</Text>
        </Pressable>
      </ScrollView>
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Arial",
    fontSize: 14,
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
  styleCardPets: {
    borderColor: "#eaf1eb",
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

  iconCircleHeart:{
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#eef7f0",
    alignItems: "center",
    justifyContent: "center",
  },

  iconCircleCheck:{
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#eaeaeb",
    alignItems: "center",
    justifyContent: "center",
  },
  styleCardAdocoes: {
    borderColor: "#dfdfe2",
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
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: "#8fb894",
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
    backgroundColor: "#74a57f",
  },
  tabText: {
    fontSize: 11,
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
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon:{
    marginRight: 8
  },
  buscar: {
    backgroundColor: "#f8f9fa",
    borderColor: "#e3ede5",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    margin: 10,
    flexDirection: "column",
    gap: 12
  },
  filter: {
    borderColor: "#d5e4d8",
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginLeft: 8,
    color: "#78a883",
  },
  filterText:{
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },

  filterContainer: {
    marginLeft: 10
  },
  categoryButtons: {
    borderColor: "#d5e4d8",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    color: "#78a883"
  },
  categoryButtonActive: {
    backgroundColor: "#74a57f",
    borderColor: "#74a57f",
  },

  categoryButtonText:{
    fontSize: 13,
    color: "#666",
    fontWeight: "500"
  },

  categoryButtonActiveText: {
    color: "#fff",
    fontWeight: "600",
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
    fontSize: 14,
    color: "#333",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  petCard:{
    backgroundColor: "#fff",
    borderColor: "#e0e0e0",
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petCardImageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  petCardImage: {
    width: "100%",
    height: "100%",
  },
  verifiedBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#74a57f",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  verifiedText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  statsContainer: {
    position: "absolute",
    bottom: 12,
    right: 12,
    flexDirection: "row",
    gap: 8,
  },
  statItem: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  petCardContent: {
    padding: 16,
  },
  petCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  petCardName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  genderBadge: {
    backgroundColor: "#fff",
    borderColor: "#74a57f",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  genderBadgeText: {
    color: "#74a57f",
    fontSize: 11,
    fontWeight: "600",
  },
  petInfoRow: {
    flexDirection: "row",
    marginBottom: 8,
    gap: 24,
  },
  petInfoItem: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
  },
  petInfoLabel: {
    fontSize: 13,
    color: "#666",
  },
  petInfoValue: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: "#666",
  },
  petDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tagVacinado: {
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagVacinadoText: {
    color: "#4caf50",
    fontSize: 11,
    fontWeight: "500",
  },
  tagCastrado: {
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagCastradoText: {
    color: "#ff9800",
    fontSize: 11,
    fontWeight: "500",
  },
  tagCriancas: {
    backgroundColor: "#fff8e1",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagCriancasText: {
    color: "#f57c00",
    fontSize: 11,
    fontWeight: "500",
  },
  cardButtonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  verMaisButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  verMaisText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  queroAdotarButton: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#74a57f",
    borderRadius: 8,
    paddingVertical: 12,
  },
  queroAdotarText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
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
    borderWidth: 2,
    borderColor: "#d0e0d3",
    borderStyle: "dashed",
    backgroundColor: "#f6fcf6",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  plusIcon: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cadastrarPetTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  cadastrarPetSubtitle: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },
});