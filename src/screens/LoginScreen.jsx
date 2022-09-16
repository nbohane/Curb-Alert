import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CpTextInput } from "../components/common/CpTextInput";
import { appStyles, colors } from "../../config";
import { CpLink } from "../components/common/CpLink";
import { useEffect, useState } from "react";
import { CpPasswordInput } from "../components/common/CpPasswordInput";
import { CpButton } from "../components/common/CpButton";
import { CpSpacer } from "../components/common/CpSpacer";
import { login } from "../utilities/userApi";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    //TODO this is working, but it shouldn't be in an effect hook
    login("jay@baffoni5.com", "password")
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CpSpacer />
      <View style={styles.inputContainer}>
        <CpTextInput
          placeholder={"E-mail"}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <CpPasswordInput onChangeText={(text) => setPassword(text)} />
        <CpButton text={"Login"} backgroundColor={colors.secondary} />
        <View style={styles.register}>
          <Text style={{ color: colors.light }}>
            Don't have an account? Register{" "}
          </Text>
          <CpLink
            text={"here"}
            onPress={() => {
              navigation.navigate("Register");
            }}
          />
        </View>
      </View>
      <CpSpacer />
      <CpSpacer />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  inputContainer: {
    padding: appStyles.edgeMargin,
  },
  register: {
    alignSelf: "center",
    flexDirection: "row",
  },
});
export default LoginScreen;
