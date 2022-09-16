import {useState} from "react";
import {FlatList, SafeAreaView} from "react-native";

export const HomeScreen = () => {
    const [listings, setListings] = useState([]);
    const [description, setDescription] = useState("");
    const [editing, setEditing] = useState(false);

    return (
        <SafeAreaView>
        </SafeAreaView>
    );
}
