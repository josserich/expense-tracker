import { View, Text } from "react-native";
import React, { useState } from "react";

const TxtTruncate = (props) => {
  const { title = "title", lines = 2, ...rest } = props;
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Text
        numberOfLines={!expanded ? lines : undefined}
        onPress={() => setExpanded(!expanded)}
        {...rest}
      >
        {title}
      </Text>
    </>
  );
};

export default TxtTruncate;
