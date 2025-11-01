import React from "react";
import { Pressable, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cadastroPetStyles as styles } from "../styles/cadastroPet";

interface ActionButtonProps {
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  variant?: "default" | "danger" | "add" | "lost" | "mypet";
  active?: boolean;
  color?: string;
  onPress?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  variant = "default",
  color,
  active = false,
  onPress,
}) => {
  const baseColor =
    color ??
    (variant === "danger"
      ? "#b91c1c"
      : variant === "add"
      ? "#0f766e"
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
        active &&
          (variant === "lost" ? styles.activeLostButton : styles.activeButton),
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
        <Text style={styles.actionText}>{label}</Text>
      </View>
    </Pressable>
  );
};

export { ActionButton };
