
import { StyleSheet, View } from "react-native";
import { LoginScreen } from "./src/components/screens/LoginScreen";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {LoginScreen} from '././src/components/screens/LoginScreen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {

    const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name="Login" component={LoginScreen} />
              </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
