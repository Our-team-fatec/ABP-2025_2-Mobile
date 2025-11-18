import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType, Platform, TouchableOpacity, Modal, Pressable, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@accessToken');
      await AsyncStorage.removeItem('@refreshToken');
      setIsDropdownVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' as never }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível fazer logout');
    }
  };

  return (
    <>
      <SafeAreaView style={styles.statusBarArea} edges={["top"]}>
        <StatusBar style="light" backgroundColor="#83af8a" />
      </SafeAreaView>
      <SafeAreaView style={styles.headerWrapper} edges={["bottom"]}>
        <View style={styles.container}>
           <View style={styles.leftContainer}>
             <Image source={require("../../assets/favicon.png")} style={styles.logo}  />
             <View style={styles.textContainer}>
               <Text style={styles.Text}>
                DaVinciPets
               </Text>
               <Text style={styles.subText}>
                Cuidando do seu pet
               </Text>
             </View>
           </View>
           <View style={styles.spacer} />
           <View style={styles.iconsContainer}>
             {/* <View style={styles.iconWrapper}><Ionicons name="notifications-outline" size={20} color="white" style={styles.disabledIcon} /></View> */}
             <TouchableOpacity 
               style={styles.iconWrapper}
               onPress={() => setIsDropdownVisible(!isDropdownVisible)}
             >
               <Ionicons name="settings-outline" size={20} color="white" />
             </TouchableOpacity>
           </View>
        </View>
      </SafeAreaView>

      {/* Dropdown Menu */}
      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#333" />
              <Text style={styles.dropdownText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}


const styles = StyleSheet.create({
  statusBarArea: {
    backgroundColor: "#83af8a",
    width: "100%"
  },
  headerWrapper: {
    backgroundColor: "#83af8a",
    width: "100%",
  },
  container: {
    backgroundColor: "#83af8a",
    paddingTop: 5,
    paddingHorizontal: 16,
    paddingBottom: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  spacer: {
    flex: 1,
  },
  logo: { 
    width: 20, 
    height: 20,
    marginRight: 8,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 8,
  },
  Text:{
    color: "#fff",
  },
  subText: {
    color: "#fff",
    fontSize: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    marginLeft: 15,
    padding: 4,
  },
  disabledIcon: {
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 90 : 60,
    paddingRight: 16,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  }
});