import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function PasswordInput({ label, value, onChangeText }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
          <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 14, marginBottom: 4 },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9fb9a4ff",
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  icon: {
    padding: 10,
  },
});
