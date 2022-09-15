import React from "react";

import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthFlow from "./AuthFlow";
import MainFlow from "./MainFlow";
import CpAlert from "../components/common/CpAlert";
import CpLoadingIndicator from "../components/common/CpLoadingIndicator";
import {selectLoggedIn} from "../redux/authSlice";

const Navigation = () => {
  const loggedIn = useSelector((state) => selectLoggedIn(state));

  return (
    <NavigationContainer>
      <CpLoadingIndicator />
      <CpAlert />
      {loggedIn ? <MainFlow /> : <AuthFlow />}
    </NavigationContainer>
  );
};

export default Navigation;
