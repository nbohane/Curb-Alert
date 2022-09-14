import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../config";

export const CpLink = ({ text, onPress, color = colors.secondary }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={[{ fontWeight: "bold", color: color }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
