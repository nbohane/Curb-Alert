import React, { useEffect, useRef, useState } from "react";

import { Animated, View, Dimensions } from "react-native";
import { appStyles } from "../../../config";

const CpSlider = ({
  location = "top",
  showing,
  content,
  contentSizeEstimate = Dimensions.get("window").height,
}) => {
  const [contentHeight, setContentHeight] = useState(contentSizeEstimate);

  useEffect(() => {
    slide(showing);
  }, [showing]);

  const slideAnimation = useRef(new Animated.Value(0)).current;

  const slide = (showing) => {
    showing.current = showing;
    Animated.timing(slideAnimation, {
      toValue: showing
        ? 0
        : location === "top"
        ? (contentHeight + appStyles.edgeMargin * 2) * -1
        : contentHeight + appStyles.edgeMargin * 2,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  let containerStyle = {
    position: "absolute",
    left: appStyles.edgeMargin,
    right: appStyles.edgeMargin,
    zIndex: 1,
  };
  if (location === "top") containerStyle.top = appStyles.edgeMargin;
  if (location === "bottom") containerStyle.bottom = appStyles.edgeMargin;

  return (
    <Animated.View
      style={[
        containerStyle,
        {
          transform: [
            {
              translateY: slideAnimation,
            },
          ],
        },
      ]}
    >
      <View
        onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
      >
        {content}
      </View>
    </Animated.View>
  );
};

export default CpSlider;
