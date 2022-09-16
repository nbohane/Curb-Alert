import { useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";

export const HomeScreen = () => {
  const [listings, setListings] = useState([]);
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(false);

  const user = useSelector((state) => selectUser(state));

  return <SafeAreaView></SafeAreaView>;
};
