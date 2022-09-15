import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { appStyles, colors } from "../../../config";
import { CpSpacer } from "../common/CpSpacer";
import { CpTextInput } from "../common/CpTextInput";
import { CpButton } from "../common/CpButton";
import { CpLink } from "../common/CpLink";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../redux/authSlice";
import {setAlert} from "../../redux/utilitySlice";

export const RegisterScreen = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const attemptRegister = () => {
    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === "" ||
        address === "" ||
        zipcode === ""
    ) {
      dispatch(
          setAlert({ level: "error", message: "All fields are required" })
      );
      return;
    }
    if (password !== confirmPassword) {
      dispatch(
          setAlert({
            level: "error",
            message: "Password does not match confirm password",
          })
      );
      return;
    }
    register(name, email, password, zipcode, address)
        .then((response) => {
          dispatch(
              setAlert({
                level: "success",
                message: "Registration successful! Please log in",
              })
          );
          navigation.navigate("Login");
        })
        .catch((error) => {
          dispatch(
              setAlert({ level: "error", message: error.response.data.message })
          );
          console.log(error.response.data.message);
        });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CpSpacer />
      <View style={styles.inputContainer}>
        <CpTextInput
          placeholder={"display name"}
          onChangeText={(text) => setName(text)}
        />
        <CpTextInput
          placeholder={"email"}
          onChangeText={(text) => setEmail(text)}
        />
        <CpTextInput
          placeholder={"address"}
          onChangeText={(text) => setAddress(text)}
          secureTextEntry
        />
        <CpTextInput
          placeholder={"zipcode"}
          onChangeText={(text) => setZipcode(text)}
          secureTextEntry
        />
        <CpTextInput
          placeholder={"password"}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <CpTextInput
          placeholder={"confirm password"}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
        <CpButton text={"Register"} onPress={attemptRegister} backgroundColor={colors.secondary} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={{ color: colors.light }}>
          Already have an account? Login{" "}
        </Text>
        <CpLink text={"here"} onPress={() => navigation.navigate("Login")} />
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
  loginContainer: { flexDirection: "row", alignSelf: "center" },
});
