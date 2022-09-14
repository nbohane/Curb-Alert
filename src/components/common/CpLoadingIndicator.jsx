import React from "react";

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../config";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/utilitySlice";

const CpLoadingIndicator = () => {
  const loading = useSelector((state) => selectLoading(state));

  if (!loading) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={colors.secondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CpLoadingIndicator;
