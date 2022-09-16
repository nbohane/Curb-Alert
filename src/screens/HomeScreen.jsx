import { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectUser } from "../redux/authSlice";
import { getFeed } from "../utilities/listingApi";

export const HomeScreen = () => {
  const [listings, setListings] = useState([]);
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(false);

  const user = useSelector((state) => selectUser(state));
  const dispatch = useDispatch();

  //TODO this is the structure to create a listing.  the listings coming in will also have an id
  let sampleListing = {
    author: 2,
    title: "Listing 2",
    description: "This is the second listing",
    address: "1 Washington St",
    zip: "01749",
  };

  useEffect(() => {
    //TODO this is working but needs to be cleaned up with the response and error handling
    getFeed(user.default_zip)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  }, []);

  return <SafeAreaView></SafeAreaView>;
};
