import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { appStyles, colors } from "../../../config";
import { CpButton } from "./CpButton";
import Icon from "react-native-vector-icons/Ionicons";

export const CpDialog = ({
  modalVisible,
  closeModal,
  title,
  confirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}) => {
  return (
    <Modal
      style={styles.container}
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => closeModal}
    >
      <View style={styles.modal}>
        <View style={styles.card}>
          <View style={styles.bar}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={{ padding: 4 }} onPress={closeModal}>
              <Icon color={"dark"} size={24} name={"close"} />
            </TouchableOpacity>
          </View>
          <View style={styles.bar}>
            <View style={{ flex: 1 }}>
              <CpButton text={cancelLabel} outline onPress={closeModal} />
            </View>

            <View style={{ width: appStyles.elementSpacing }} />
            <View style={{ flex: 1 }}>
              <CpButton
                text={confirmLabel}
                backgroundColor={colors.error}
                onPress={confirm}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  modal: {
    padding: appStyles.edgeMargin * 2,
    flex: 1,
    backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: appStyles.edgeMargin,
    borderRadius: appStyles.cornerRadius,
    backgroundColor: colors.light,
  },
  bar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  title: { flex: 1, fontSize: 18 },
});
