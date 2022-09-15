import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {LoginScreen} from '././src/components/screens/LoginScreen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {

    const Stack = createNativeStackNavigator();

  return (
      <View style={styles.container}>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name="Login" component={LoginScreen} />
              </Stack.Navigator>
          </NavigationContainer>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
