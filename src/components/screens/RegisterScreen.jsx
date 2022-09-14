import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {appStyles, colors} from "../../../config";
import {CpSpacer} from "../common/CpSpacer";
import {CpTextInput} from "../common/CpTextInput";
import {CpButton} from "../common/CpButton";
import {CpLink} from "../common/CpLink";
import {useState} from "react";

export const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                    onChangeText={(text) => setAdress(text)}
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
            <CpButton
                text={"Register"}
                backgroundColor={colors.secondary}
            /></View>
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
        backgroundColor: colors.primary,
        paddingVertical: '45%',

    },
    inputContainer: {
        padding: appStyles.edgeMargin,
    },
    loginContainer: { flexDirection: "row", alignSelf: "center" },
});
