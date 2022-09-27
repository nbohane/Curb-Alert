import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectUser } from "../redux/authSlice";
import {
  createListing,
  deleteListing,
  getFeed,
  updateListing,
} from "../utilities/listingApi";
import { setAlert, setLoading } from "../redux/utilitySlice";
import { appStyles, colors } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { CpDialog } from "../components/common/CpDialog";
import { CpListing } from "../components/CpListing";
import { CpFloatingButton } from "../components/common/CpFloatingButton";
import { CpTextInput } from "../components/common/CpTextInput";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { CpButton } from "../components/common/CpButton";

export const HomeScreen = () => {
  const user = useSelector((state) => selectUser(state));

  const [listings, setListings] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState(user.default_address);
  const [zipcode, setZipcode] = useState(user.default_zip);
  const [editing, setEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const openEditingWindow = (listing) => {
    setEditing(true);
    setTitle(listing.title);
    setDescription(listing.description);
    setAddress(listing.address);
    setZipcode(listing.zip);
  };

  const saveListing = () => {
    if (!title) return;

    if (selected) {
      updateListing(selected.id, {
        title: title,
        description: description,
        address: address,
        zip: zipcode,
      })
        .then((response) => {
          getListingsInFeed();
          setEditing(false);
        })
        .catch((error) => {
          dispatch(setAlert("error", error.response.data.message));
        });
    } else {
      createListing({
        author: user.id,
        title: title,
        description: description,
        address: address,
        zip: zipcode,
      })
        .then((response) => {
          getListingsInFeed();
          setEditing(false);
        })
        .catch((err) => {
          dispatch(setAlert(err.response.data.message));
        });
    }
  };

  const deleteListingFromFeed = () => {
    if (!selected) return;
    deleteListing(selected.id)
      .then((response) => {
        getListingsInFeed();
      })
      .catch((err) => {
        dispatch(setAlert(err.response.data.message));
      })
      .finally(() => setSelected(null));
  };

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ padding: 4 }}
            onPress={() => navigation.navigate("Account")}
          >
            <View
              style={{
                backgroundColor: colors.primary,
                padding: 4,
                borderRadius: 24,
              }}
            >
              <UserCircleIcon size={20} color={colors.light} />
            </View>
          </TouchableOpacity>
        );
      },
    });
  }, []);

  const getListingsInFeed = () => {
    dispatch(setLoading(true));
    getFeed(user.default_zip, 1)
      .then((response) => {
        setListings(response.data.data);
      })
      .catch((err) => {
        dispatch(setAlert(err.response.data.message));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  useEffect(() => {
    getListingsInFeed();
  }, []);

  useEffect(() => {
    slide(editing);
    if (!editing) {
      setTitle("");
      setDescription("");
      setAddress(user.default_address);
      setZipcode(user.default_zip);
      setSelected(null);
    }
  }, [editing]);

  const slideAnimation = useRef(new Animated.Value(0)).current;

  const slide = (showing) => {
    showing.current = showing;
    Animated.timing(slideAnimation, {
      toValue: editing ? -387 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CpDialog
        modalVisible={modalVisible}
        title={"Delete this post?"}
        closeModal={() => setModalVisible(false)}
        confirmLabel={"Delete"}
        confirm={() => {
          setModalVisible(false);
          deleteListingFromFeed();
        }}
      />
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: appStyles.edgeMargin,
          paddingBottom: 96,
        }}
        data={listings}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getListingsInFeed} />
        }
        renderItem={({ item }) => (
          <CpListing
            listing={item}
            onEdit={() => {
              setSelected(item);
              openEditingWindow(item);
            }}
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
      <Animated.View
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: -387,
          transform: [
            {
              translateY: slideAnimation,
            },
          ],
        }}
      >
        <View
          style={{
            padding: appStyles.edgeMargin,
            alignSelf: "flex-end",
          }}
        >
          <CpFloatingButton
            name={editing ? "close-outline" : "add"}
            onPress={() => setEditing(!editing)}
          />
        </View>

        <View
          style={{
            padding: appStyles.edgeMargin,
            backgroundColor: "white",
            borderTopRightRadius: appStyles.cornerRadius * 2,
            borderTopLeftRadius: appStyles.cornerRadius * 2,
            borderColor: colors.separator,
            borderWidth: 2,
            width: Dimensions.get("window").width + 4,
            alignSelf: "center",
          }}
        >
          <CpTextInput
            placeholder={"title of listing"}
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <CpTextInput
            placeholder={"description of listing"}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
          <CpTextInput
            placeholder={"address"}
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
          <CpTextInput
            placeholder={"zipcode"}
            onChangeText={(text) => setZipcode(text)}
            value={zipcode}
          />
          <CpButton text={"Save Listing"} onPress={saveListing} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};
