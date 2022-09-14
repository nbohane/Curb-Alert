import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { appStyles, colors } from "../../../config";

export const CpButton = ({
  text,
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
      <Text
        style={[
          styles.text,
          outline ? styles.outlineText : styles.solidText,
          { color: outline ? outlineColor : fontColor },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: appStyles.cornerRadius,
    width: "100%",
    marginTop: appStyles.elementSpacing,
    marginBottom: appStyles.elementSpacing,
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
