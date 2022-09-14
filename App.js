import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {LoginScreen} from '././src/components/screens/LoginScreen';
import {RegisterScreen} from "./src/components/screens/RegisterScreen";

export default function App() {
  return (
      <View >
        <RegisterScreen/>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
