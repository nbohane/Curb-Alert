import { StyleSheet, View } from "react-native";
import { LoginScreen } from "./src/screens/LoginScreen";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RegisterScreen } from "./src/screens/RegisterScreen";
import Navigation from "./src/flow/Navigation";
import {HomeScreen} from "./src/screens/HomeScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
