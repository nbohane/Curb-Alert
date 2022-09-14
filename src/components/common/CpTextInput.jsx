import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { appStyles, colors } from "../../../config";

export const CpTextInput = ({
  placeholder,
  onChangeText,
  secureTextEntry,
  onPress,
  value,
  iconName,
  size,
  color = colors.secondary,
  iconColor = colors.primary,
}) => {
  return (
    <View style={[styles.container, { borderColor: color }]}>
      <TextInput
        autoCapitalize={"none"}
        style={styles.input}
        placeholderTextColor={"black"}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        value={value}
      />
      {iconName && (
        <TouchableOpacity onPress={onPress}>
          <Icon
            style={styles.buttonText}
            name={iconName}
            size={size}
            color={iconColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderWidth: 2,
    borderRadius: appStyles.cornerRadius,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: appStyles.elementSpacing,
    marginBottom: appStyles.elementSpacing,
    alignItems: "center",
  },
  input: {
    color: "black",
    flex: 1,
    padding: 12,
    fontSize: appStyles.primaryTextSize,
  },
  buttonText: {
    paddingRight: 16,
    paddingLeft: 16,
  },
});
