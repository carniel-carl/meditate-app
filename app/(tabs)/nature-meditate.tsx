import { View, Text, FlatList, Pressable, ImageBackground } from "react-native";
import React from "react";
import AppGradient from "@/components/UI/AppGradient";
import { MEDITATION_DATA, MeditationType } from "@/constants/MeditationData";
import meditationImages from "@/constants/meditation-images";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const NatureMeditate = () => {
  const RendetItem = ({ item }: { item: MeditationType }) => {
    return (
      <Pressable
        onPress={() => {
          router.push(`/meditate/${item.id}`);
        }}
        className="h-48 my-3 rounded-md overflow-hidden"
      >
        <ImageBackground
          source={meditationImages[item.id - 1]}
          resizeMode="cover"
          className="rounded-lg flex-1 "
        >
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text className="text-gray-100 text-2xl font-bold">
              {item.title}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    );
  };
  return (
    <View className="flex-1">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <View className="gap-3 mb-3 ">
          <Text className="text-gray-200 text-3xl font-bold">
            Hello, Carniel
          </Text>
          <Text className="text-indigo-200 text-xl font-medium">
            Start your meditation practise today.
          </Text>
        </View>
        <View>
          <FlatList
            data={MEDITATION_DATA}
            className="mb-24"
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={RendetItem}
          />
        </View>
      </AppGradient>
    </View>
  );
};

export default NatureMeditate;
