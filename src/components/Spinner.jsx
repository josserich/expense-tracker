import { ActivityIndicator, Text, View } from "react-native";

const Spinner = (props) => {
  const { size = 150, color = "#817979" } = props;
  return (
    <View className="my-2">
      <ActivityIndicator size={size} color={color} />
      <Text
        className="font-montserratsemibolditalic text-2xl tracking-wider text-center my-6"
        style={{ color }}
      >
        Please Wait..
      </Text>
    </View>
  );
};

export default Spinner;
