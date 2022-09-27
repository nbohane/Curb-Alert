import React from "react";

import { HomeScreen } from "../screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import {AccountScreen} from '../screens/AccountScreen';

const MainFlow = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={"Home"} component={HomeScreen} />
      <Stack.Screen name={"Account"} component={AccountScreen} />
    </Stack.Navigator>
  );
};

export default MainFlow;
