import { StyleSheet, View } from "react-native";
import { LoginScreen } from "./src/components/screens/LoginScreen";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <LoginScreen />
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
