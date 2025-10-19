import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
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
             <View style={styles.iconWrapper}><Ionicons name="notifications-outline" size={20} color="white" style={styles.disabledIcon} /></View>
             <View style={styles.iconWrapper}><Ionicons name="settings-outline" size={20} color="white" style={styles.disabledIcon} /></View>
           </View>
        </View>
      </SafeAreaView>
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
  }
});