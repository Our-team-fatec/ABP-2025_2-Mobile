import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

interface Props {
  label: string;
  href: string;
}

export default function AuthLink({ label, href }: Props) {
  return (
    <Link href={href} asChild>
      <Pressable>
        <Text style={styles.link}>{label}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    color: "green",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 8,
  },
});
