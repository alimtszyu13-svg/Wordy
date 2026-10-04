import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  text: string;
  compact?: boolean;
};

export default function WordySpeechBubble({
  text,
  compact = false,
}: Props) {
  const appear = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    appear.setValue(0);

    Animated.spring(appear, {
      toValue: 1,
      stiffness: 235,
      damping: 17,
      mass: 0.72,
      useNativeDriver: true,
    }).start();
  }, [text, appear]);

  const scale = appear.interpolate({
    inputRange: [0, 1],
    outputRange: [0.84, 1],
  });

  const translateY = appear.interpolate({
    inputRange: [0, 1],
    outputRange: [7, 0],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.bubble,
        compact && styles.compactBubble,
        {
          opacity: appear,
          transform: [{ scale }, { translateY }],
        },
      ]}
    >
      <View style={styles.softHighlight} />

      <Text
        style={[
          styles.text,
          compact && styles.compactText,
        ]}
      >
        {text}
      </Text>

      <View style={styles.tailBorder} />
      <View style={styles.tail} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: 260,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECE4DA",
    shadowColor: "#806A54",
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 5,
    overflow: "visible",
  },

  compactBubble: {
    maxWidth: 190,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 15,
  },

  softHighlight: {
    position: "absolute",
    left: 10,
    right: 10,
    top: 1,
    height: 1,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.9)",
  },

  text: {
    color: "#37322D",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    textAlign: "center",
  },

  compactText: {
    fontSize: 11,
    lineHeight: 15,
  },

  tailBorder: {
    position: "absolute",
    width: 14,
    height: 14,
    bottom: -7.5,
    right: 30,
    backgroundColor: "#ECE4DA",
    transform: [{ rotate: "45deg" }],
  },

  tail: {
    position: "absolute",
    width: 12,
    height: 12,
    bottom: -5.8,
    right: 31,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "45deg" }],
  },
});
