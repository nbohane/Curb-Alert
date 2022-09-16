import { StyleSheet, Text, View } from "react-native";
import { appStyles, colors } from "../../../config";
import moment from "moment";
import { CpLink } from "./CpLink";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";

export const CpPost = ({ post, onEdit, onDelete }) => {
  const user = useSelector((state) => selectUser(state));
  let currentTime = new Date(post.timestamp);
  let timestamp = moment(currentTime).fromNow();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.author}>{post.name}</Text>
        <View>
          <Text style={styles.timestamp}>
            {timestamp}
            {post.edited === 1 && " (edited)"}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            paddingVertical: 4,
            fontSize: appStyles.primaryTextSize,
            color: colors.dark,
          }}
        >
          {post.title}
        </Text>
        <Text
          style={{
            paddingVertical: 4,
            fontSize: appStyles.primaryTextSize,
            color: colors.dark,
          }}
        >
          {post.description}
        </Text>
      </View>
      {post.name === user.id && (
        <View style={{ flexDirection: "row" }}>
          <CpLink color={colors.primary} text={"Edit"} onPress={onEdit} />
          <View style={{ width: 16 }} />
          <CpLink color={colors.error} text={"Delete"} onPress={onDelete} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: appStyles.cornerRadius,
    padding: appStyles.edgeMargin,
    borderColor: colors.separator,
    borderWidth: 2,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  author: {
    flex: 1,
    fontSize: appStyles.primaryTextSize,
    color: colors.primary,
    fontWeight: "bold",
  },
  timestamp: {
    color: colors.gray,
    fontSize: appStyles.smallTextSize,
  },
});
