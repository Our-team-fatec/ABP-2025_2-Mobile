import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";

interface CustomInputProps extends TextInputProps {
  label: string;
}

export default function CustomInput({ label, ...rest }: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    height: 50,
    borderColor: "#9fb9a4ff",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f8f9fa",
  },
});
