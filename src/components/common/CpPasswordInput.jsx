import React, { useState } from "react";
import { CpTextInput } from "./CpTextInput";

export const CpPasswordInput = ({
  placeholder = "Password",
  onChangeText,
  value,
  size = 24,
  color,
}) => {
  const [isSecure, setSecure] = useState(true);

  return (
    <CpTextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      color={color}
      size={size}
      secureTextEntry={isSecure}
      iconName={isSecure ? "eye" : "eye-off"}
      onPress={() => setSecure(!isSecure)}
    />
  );
};
