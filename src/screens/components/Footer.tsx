import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType, Platform, SafeAreaView } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

export default function Footer() {
    return (
        <View style={styles.footerWrapper}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.iconWrapper}>
                        <Entypo name="heart-outlined" size={24} color="black" />
                    </View>
                    <View style={styles.iconWrapper}>
                        <FontAwesome name="stethoscope" size={24} color="black" />
                    </View>
                    <View style={styles.iconWrapper}>
                        <FontAwesome name="calendar" size={24} color="black" />
                    </View>
                    <View style={styles.iconWrapper}>
                        <AntDesign name="user-add" size={24} color="black" />
                    </View>
                    <View style={styles.iconWrapper}>
                        <Feather name="map-pin" size={24} color="black" />
                    </View>
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
})