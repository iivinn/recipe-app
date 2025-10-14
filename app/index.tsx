import { predictFood } from "@/utils/predictFood";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    predictFood(
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen!</Text>
    </View>
  );
}
