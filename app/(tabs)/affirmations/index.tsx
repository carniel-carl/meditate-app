import GuidedAffirmationGallery from "@/components/general/GuidedAffirmationGallery";
import AppGradient from "@/components/UI/AppGradient";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import { View, Text, ScrollView } from "react-native";

const AffirmationScreen = () => {
  return (
    <View className="flex-1">
      <AppGradient colors={["#2e1f58", "#54426b", "#a790af"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-zinc-50 text-2xl font-bold mb-2">
            Change your beliefs with affirmations
          </Text>
          <View>
            {AFFIRMATION_GALLERY.map((g) => (
              <GuidedAffirmationGallery
                key={g.title}
                title={g.title}
                previews={g.data}
              />
            ))}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  );
};

export default AffirmationScreen;
