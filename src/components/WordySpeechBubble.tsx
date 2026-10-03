import React from "react";
import {
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
  return (
    <View
      pointerEvents="none"
      style={[
        styles.bubble,
        compact && styles.compactBubble,
      ]}
    >
      <Text
        style={[
          styles.text,
          compact && styles.compactText,
        ]}
      >
        {text}
      </Text>

      <View style={styles.tail} />
    </View>
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

    shadowOpacity: 0.08,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,
  },

  compactBubble: {
    maxWidth: 190,

    paddingHorizontal: 13,
    paddingVertical: 9,

    borderRadius: 15,
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

  tail: {
    position: "absolute",

    width: 14,
    height: 14,

    bottom: -7,
    right: 30,

    backgroundColor: "#FFFFFF",

    borderRightWidth: 1,
    borderBottomWidth: 1,

    borderColor: "#ECE4DA",

    transform: [{ rotate: "45deg" }],
  },
});