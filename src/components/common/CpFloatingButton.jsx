import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { appStyles, colors } from "../../../config";
import Icon from "react-native-vector-icons/Ionicons";

export const CpFloatingButton = ({
  name,
  onPress,
  outline,
  fontColor = colors.light,
  backgroundColor = colors.primary,
  outlineColor = colors.primary,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        outline ? styles.outlineButton : styles.solidButton,
        {
          backgroundColor: outline ? colors.light : backgroundColor,
          borderColor: outline ? outlineColor : "transparent",
        },
      ]}
      onPress={onPress}
    >
      <Icon name={name} color={fontColor} size={36} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 64,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: appStyles.primaryTextSize,
  },
  outlineButton: {
    backgroundColor: colors.light,
    borderWidth: 1,
  },
  solidButton: {
    backgroundColor: colors.primary,
  },
  outlineText: {
    color: colors.primary,
  },
  solidText: {
    color: colors.light,
  },
});
