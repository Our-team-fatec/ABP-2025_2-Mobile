import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

export default function Footer() {
    const navigation = useNavigation();

    const handleNavigateToHome = () => {
        navigation.navigate("Home" as never);
    };

    const handleNavigateToCadastroPet = () => {
        navigation.navigate("CadastroPet" as never);
    };

    const handleNavigateToAdocaoPet = () => {
        navigation.navigate("AdocaoPet" as never);
    };

    return (
        <View style={styles.footerWrapper}>
            <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
                <View style={styles.container}>
                    <TouchableOpacity 
                        style={styles.iconWrapper}
                        onPress={handleNavigateToHome}
                    >
                        <AntDesign name="home" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.iconWrapper}
                        onPress={handleNavigateToCadastroPet}
                    >
                        <MaterialCommunityIcons name="dog" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.iconWrapper}
                        onPress={handleNavigateToAdocaoPet}
                    >
                        <Entypo name="heart-outlined" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.iconWrapper}>
                        <Entypo name="chat" size={24} color="black" style={styles.disabledIcon} />
                    </View>
                    {/* <View style={styles.iconWrapper}>
                        <FontAwesome name="stethoscope" size={24} color="black" style={styles.disabledIcon} />
                    </View>
                    <View style={styles.iconWrapper}>
                        <Feather name="map-pin" size={24} color="black" style={styles.disabledIcon} />
                    </View> */}
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    footerWrapper: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#83af8a",
    },
    safeArea: {
        backgroundColor: "#83af8a",
    },
    container: {
        backgroundColor: "#fff",
        borderColor: "#000",
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    iconWrapper: {
        padding: 8,
        borderRadius: 8,
        minWidth: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        marginLeft: 8,
        fontSize: 14,
        fontWeight: "500",
    },
    disabledIcon: {
        opacity: 0.5,
    }
})