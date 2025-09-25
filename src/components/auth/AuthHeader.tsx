import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";

interface Props {
  logo: ImageSourcePropType;
  title: string;
  subtitle?: string;
}

export default function AuthHeader({ logo, title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 20 },
  logo: { width: 65, height: 65, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4 },
});
