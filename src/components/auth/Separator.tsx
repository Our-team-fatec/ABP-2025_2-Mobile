import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  text?: string;
}

export default function Separator({ text = "ou" }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#666",
  },
});
