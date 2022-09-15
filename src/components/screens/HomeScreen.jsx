import {useEffect, useRef, useState} from "react";
import {Animated, Dimensions, FlatList, SafeAreaView, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../redux/authSlice";
import {setAlert, setLoading} from "../../redux/utilitySlice";
import {appStyles, colors} from "../../../config";
import {useNavigation} from "@react-navigation/native";
import {CpTextInput} from "../common/CpTextInput";
import {CpFloatingButton} from "../common/CpFloatingButton";
import {CpPost} from "../common/CpPost";
import {CpDialog} from "../common/CpDialog";

export const HomeScreen = () => {

    const user = useSelector((state) => selectUser(state));

    const [listings, setListings] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [editing, setEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch();

    const newPost = () => {
        if (!message) return;
        createPost({
            name: user.id,
            title: title,
            description: description,
            address: address,
            zipcode: zipcode,
        })
            .then((response) => {
                getPostsInFeed();
                setTitle("");
            })
            .catch((err) => {
                dispatch(setAlert(err.response.data.message));
            });
    };

    const deletePostFromFeed = () => {
        if (!selected) return;
        deletePost(selected.id)
            .then((response) => {
                getPostsInFeed();
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
                            <Icon name={"person"} size={20} color={colors.light} />
                        </View>
                    </TouchableOpacity>
                );
            },
        });
    }, []);

    const getPostsInFeed = () => {
        dispatch(setLoading(true));
        getFeed(user.id, 1)
            .then((response) => {
                setListings(response.data.data);
            })
            .catch((err) => {
                dispatch(setAlert(err.response.data.message));
            })
            .finally(() => dispatch(setLoading(false)));
    };

    useEffect(() => {
        getPostsInFeed();
    }, []);

    useEffect(() => {
        slide(editing);
    }, [editing]);

    const slideAnimation = useRef(new Animated.Value(0)).current;

    const slide = (showing) => {
        showing.current = showing;
        Animated.timing(slideAnimation, {
            toValue: editing ? -100 : 0,
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
                    deletePostFromFeed();
                }}
            />
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{
                    padding: appStyles.edgeMargin,
                    paddingBottom: 96,
                }}
                data={listings}
                onRefresh={getFeed}
                refreshing={false}
                renderItem={({ item }) => (
                    <CpPost
                        post={item}
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
                        bottom: -100,
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
                            placeholder={'description of listing'}
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
                    </View>
                </Animated.View>
        </SafeAreaView>
    );
};
    );
}
