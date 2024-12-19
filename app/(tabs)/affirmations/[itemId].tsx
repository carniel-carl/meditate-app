import AppGradient from "@/components/UI/AppGradient";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";

const AffirmationPractise = () => {
  const { itemId } = useLocalSearchParams();

  console.log(itemId);

  const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
  const [sentences, setSentences] = useState<string[]>([]);

  useEffect(() => {
    for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
      const affirmationData = AFFIRMATION_GALLERY[idx].data;
      const affirmationStart = affirmationData.find(
        (a) => a.id === Number(itemId)
      );
      if (affirmationStart) {
        setAffirmation(affirmationStart);

        const affirmationArray = affirmationStart.text.split(".");

        if (affirmationArray[affirmationArray.length - 1] === "") {
          affirmationArray.pop();
        }
        setSentences(affirmationArray);

        return;
      }
    }
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={affirmation?.image}
        resizeMode="cover"
        className="flex-1 "
      >
        <AppGradient colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.9)"]}>
          <Pressable
            onPress={() => router.back()}
            className="relative top-0 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={38} color="white" />
          </Pressable>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mt-12 h-full justify-center">
              <View className="h-4/5 justify-center">
                {sentences.map((sentence, index) => (
                  <Text
                    key={index}
                    className="text-white text-2xl text-center font-bold mb-12"
                  >
                    {sentence}.
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffirmationPractise;
