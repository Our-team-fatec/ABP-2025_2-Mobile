import React from "react";
import { Pressable, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";

interface ActionButtonProps {
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  variant?: "default" | "danger" | "add" | "lost" | "mypet" | "adoption";
  active?: boolean;
  color?: string;
  customColor?: string;
  onPress?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  variant = "default",
  color,
  customColor,
  active = false,
  onPress,
}) => {
  const baseColor = customColor ??
    color ??
    (variant === "danger"
      ? "#b91c1c"
      : variant === "add"
      ? "#0f766e"
      : variant === "adoption"
      ? "#e07b7b"
      : "#047857");

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        variant === "danger" && styles.dangerButton,
        variant === "add" && styles.addButton,
        variant === "lost" && styles.lostButton,
        variant === "mypet" && styles.mypetButton,
        variant === "adoption" && styles.adoptionButton,
        active &&
          (variant === "lost" 
            ? styles.activeLostButton 
            : variant === "adoption"
            ? styles.activeAdoptionButton
            : styles.activeButton),
        pressed && styles.pressedButton,
      ]}
    >
      <View style={styles.actionContent}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={18}
            color={baseColor}
            style={styles.actionIcon}
          />
        )}
        <Text style={[styles.actionText, customColor && { color: baseColor }]}>{label}</Text>
      </View>
    </Pressable>
  );
};

export { ActionButton };
