import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType, Platform, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  return (
    <>
      <SafeAreaView style={styles.statusBarArea}>
        <StatusBar style="light" backgroundColor="#83af8a" />
      </SafeAreaView>
      <View style={styles.headerWrapper}>
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
             <View style={styles.iconWrapper}><Ionicons name="notifications-outline" size={20} color="white" /></View>
             <View style={styles.iconWrapper}><Ionicons name="settings-outline" size={20} color="white" /></View>
           </View>
        </View>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  statusBarArea: {
    backgroundColor: "#83af8a",
  },
  headerWrapper: {
    backgroundColor: "#f8f8f8",
    paddingTop: 20,
    paddingBottom: 8,
  },
  container: {
    backgroundColor: "#83af8a",
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
  }
});
