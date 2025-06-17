import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ReadMore = ({ children, numberOfLines = 2 }) => {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  return (
    <View>
      <Text
        numberOfLines={expanded ? undefined : numberOfLines}
        onTextLayout={(e) => {
          const lines = e.nativeEvent.lines;
          if (lines.length > numberOfLines) {
            setShowToggle(true);
          }
        }}
        className="text-base text-gray-800"
      >
        {children}
      </Text>
      {showToggle && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text className="text-sm text-[#A8884D] mt-1 font-semibold">
            {expanded ? "Tampilkan lebih sedikit" : "Baca selengkapnya"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReadMore;
