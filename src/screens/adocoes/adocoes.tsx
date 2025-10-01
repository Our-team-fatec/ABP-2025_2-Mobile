import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import Feather from "@expo/vector-icons/Feather";

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
    paddingVertical: 12,
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
});
