import React, { useEffect, useRef, useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { appStyles, colors } from "../../../config";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectAlert, setAlert } from "../../redux/utilitySlice";
import CpSlider from "./CpSlider";

const CpAlert = ({ location = "top" }) => {
  const alert = useSelector((state) => selectAlert(state));
  const dispatch = useDispatch();
  const [tempAlert, setTempAlert] = useState(alert);

  const [isShowing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(alert !== null);
    if (alert) {
      if (isShowing) return;
      setTempAlert(alert);
      useRef.current = setTimeout(
        () => {
          dispatch(setAlert(null));
        },
        3500,
        useRef.current + 1
      );
    }
  }, [alert]);

  const clear = () => {
    clearTimeout(useRef.current);
    dispatch(setAlert(null));
  };

  return (
    <CpSlider
      location={location}
      showing={isShowing}
      content={
        tempAlert && (
          <View
            style={[
              styles.container,
              { backgroundColor: colors[tempAlert.level] },
            ]}
          >
            <Text style={styles.text}>{tempAlert.message}</Text>
            <TouchableOpacity style={{ padding: 4 }} onPress={clear}>
              <XCircleIcon size={24} color={"white"} />
            </TouchableOpacity>
          </View>
        )
      }
      contentSizeEstimate={100}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: appStyles.cornerRadius,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: appStyles.largeText,
    flex: 1,
    paddingLeft: 4,
  },
});

export default CpAlert;
