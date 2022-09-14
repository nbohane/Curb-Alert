import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {CpTextInput} from "../common/CpTextInput";
import {appStyles, colors} from "../../../config";
import {CpLink} from "../common/CpLink";
import {useState} from "react";
import {CpPasswordInput} from "../common/CpPasswordInput";
import {CpButton} from "../common/CpButton";
import {CpSpacer} from "../common/CpSpacer";

export const LoginScreen = () => {

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState("");

        return (
            <SafeAreaView style={styles.container}>
                    <View style={styles.inputContainer}>
                            <CpTextInput
                                placeholder={"E-mail"}
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                            />
                            <CpPasswordInput onChangeText={(text) => setPassword(text)} />
                            <CpButton
                                text={"Login"}
                                backgroundColor={colors.secondary}
                            />
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
            </SafeAreaView>
        );
};
const styles = StyleSheet.create({
        container: {
                backgroundColor: colors.primary,
                paddingVertical: '75%',
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
