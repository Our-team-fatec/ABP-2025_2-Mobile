import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  title: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}

export default function SocialButton({ title, icon, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {icon && <MaterialIcons name={icon} size={20} color="#000" style={{ marginRight: 8 }} />}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 14,
    color: "#000",
  },
});
