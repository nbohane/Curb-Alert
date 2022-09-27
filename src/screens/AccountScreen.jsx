import React, { useEffect, useState } from "react";

import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut, selectUser } from "../redux/authSlice";
import { CpButton } from "../components/common/CpButton";
import { appStyles, colors } from "../../config";
import { CpToggle } from "../components/common/CpToggle";
import { CpTextInput } from "../components/common/CpTextInput";
import { CpSpacer } from "../components/common/CpSpacer";
import { CpFloatingButton } from "../components/common/CpFloatingButton";
import { login, updateUser } from "../utilities/userApi";
import { setAlert } from "../redux/utilitySlice";
import { CpListing } from "../components/CpListing";

export const AccountScreen = () => {
  const user = useSelector((state) => selectUser(state));
  const [listings, setListings] = useState([]);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [defaultAddress, setDefaultAddress] = useState(user.default_address);
  const [defaultZipcode, setDefaultZipcode] = useState(user.default_zip);

  const updateInfo = () => {
    updateUser(user.id, {
      email: email,
      default_address: defaultAddress,
      default_zip: defaultZipcode,
    })
      .then((response) => {
        setEditing(false);
        let updatedUser = {
          id: user.id,
          name: name,
          email: email,
          default_address: defaultAddress,
          default_zip: defaultZipcode,
        };
        dispatch(logIn(updatedUser));
      })
      .catch((err) => {
        dispatch(setAlert(err.response.data.message));
      });
  };

  return (
    <SafeAreaView style={{ padding: appStyles.edgeMargin }}>
      {editing ? (
        <View>
          <CpTextInput value={name} onChangeText={(text) => setName(text)} />
          <CpTextInput value={email} onChangeText={(text) => setEmail(text)} />
          <CpTextInput
            value={defaultAddress}
            onChangeText={(text) => setDefaultAddress(text)}
          />
          <CpTextInput
            value={defaultZipcode}
            onChangeText={(text) => setDefaultZipcode(text)}
          />
          <View style={{ width: "50%", flexDirection: "row" }}>
            <CpButton
              text={"cancel"}
              onPress={() => setEditing(false)}
              outline
            />
            <CpButton text={"confirm"} onPress={updateInfo} />
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            paddingVertical: appStyles.edgeMargin,
          }}
        >
          <View>
            <Text>Welcome, {user.name}</Text>
            <Text>{user.email}</Text>
            <Text>{user.default_address}</Text>
            <Text>{user.default_zip}</Text>
          </View>
          <CpSpacer />
          <View>
            <CpFloatingButton
              name={"pencil"}
              backgroundColor={colors.secondary}
              onPress={() => setEditing(true)}
            />
          </View>
        </View>
      )}

      <CpButton
        text={"Log Out"}
        onPress={() => {
          dispatch(logOut());
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <Text>Notifications are: </Text>
        <CpToggle />
        <FlatList
          data={listings}
          renderItem={({ item }) => (
            <CpListing
              listing={item}
              onDelete={() => {
                setSelected(item);
                setModalVisible(true);
              }}
            />
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: appStyles.edgeMargin,
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
