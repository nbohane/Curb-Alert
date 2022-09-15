import React from "react";

import {LoginScreen} from "../components/screens/LoginScreen";
import {RegisterScreen} from "../components/screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthFlow = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Login"}
        component={LoginScreen}
      />
      <Stack.Screen name={"Register"} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthFlow;
