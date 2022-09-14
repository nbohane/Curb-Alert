import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

export const CpToggle = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setToggled(!toggled)}>
        <Text>{toggled ? "off" : "on"}</Text>
      </TouchableOpacity>
    </View>
  );
};
