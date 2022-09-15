import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CpTextInput } from "../common/CpTextInput";
import { appStyles, colors } from "../../../config";
import { CpLink } from "../common/CpLink";
import { useState } from "react";
import { CpPasswordInput } from "../common/CpPasswordInput";
import { CpButton } from "../common/CpButton";
import { CpSpacer } from "../common/CpSpacer";
import {useDispatch, useSelector} from "react-redux";
import {logIn, selectUser} from "../../redux/authSlice";
import {setAlert, setLoading} from "../../redux/utilitySlice";

export const LoginScreen = ({ navigation }) => {
  const user = useSelector((state) => selectUser(state));

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const attemptLogin = () => {
    if (email === "" || password === "") {
      dispatch(
          setAlert({ level: "error", message: "All fields are required" })
      );
      return;
    }
    dispatch(setLoading(true));
    login(email, password)
        .then((response) => dispatch(logIn(response.data)))
        .catch((error) => {
          dispatch(
              setAlert({ level: "error", message: error.response.data.message })
          );
          console.log(error.response.data.message);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
  };

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
        <CpButton text={"Login"} onPress={attemptLogin} backgroundColor={colors.secondary} />
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
