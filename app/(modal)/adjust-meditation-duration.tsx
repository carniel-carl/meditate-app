import AppGradient from "@/components/UI/AppGradient";
import CustomButton from "@/components/UI/CustomButton";
import { TimerContext } from "@/context/TimerContext";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";
import { View, Text, Pressable } from "react-native";

const AdjustMeditationDuration = () => {
  const { setDuration } = useContext(TimerContext);

  const handlePress = (duration: number) => {
    setDuration(duration);
    router.back();
  };
  return (
    <View className="flex-1 relative">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <Pressable
          onPress={() => router.back()}
          className="absolute top-8  left-6 z-10"
        >
          <AntDesign name="leftcircleo" size={38} color="white" />
        </Pressable>
        <View className="justify-center h-4/5 mt-12">
          <Text className="mb-8 text-white text-center text-3xl font-bold">
            Adjust your meditation duration
          </Text>

          <View>
            <CustomButton
              title="10 Seconds"
              onPress={() => handlePress(10)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="5 Minutes"
              onPress={() => handlePress(5 * 60)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="10 Minutes"
              onPress={() => handlePress(10 * 60)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="15 Minutes"
              onPress={() => handlePress(15 * 60)}
              containerStyles="mb-5"
            />
          </View>
        </View>
      </AppGradient>
    </View>
  );
};

export default AdjustMeditationDuration;
