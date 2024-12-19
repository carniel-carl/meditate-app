import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import React from "react";

import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/UI/CustomButton";
import { useRouter } from "expo-router";
import AppGradient from "@/components/UI/AppGradient";

const BgImage = require("@/assets/meditation-images/beach.webp");

const HomeScreen = () => {
  const router = useRouter();
  return (
    <ImageBackground source={BgImage} resizeMode="cover" className="flex-1">
      <AppGradient colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}>
        <SafeAreaView className="flex-1 px-1 justify-between">
          <View className="items-center">
            <Text className="text-white font-bold text-4xl">MEDITATION</Text>
            <Text className="text-white text-xl mt-2">
              Simply Meditation for Everyone
            </Text>
          </View>
          <View>
            <CustomButton
              onPress={() => router.push("/nature-meditate")}
              title="Get Started"
            />
          </View>
          <StatusBar style="light" />
        </SafeAreaView>
      </AppGradient>
    </ImageBackground>
  );
};

export default HomeScreen;
