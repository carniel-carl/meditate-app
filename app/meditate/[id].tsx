import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import meditationImages from "@/constants/meditation-images";
import AppGradient from "@/components/UI/AppGradient";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "@/components/UI/CustomButton";
import { Audio } from "expo-av";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/MeditationData";
import { TimerContext } from "@/context/TimerContext";

const Meditate = () => {
  const { duration: secondsRemaining, setDuration } = useContext(TimerContext);
  const { id } = useLocalSearchParams();

  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setAudioSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (secondsRemaining === 0) {
      setIsMeditating(false);
      audioSound?.unloadAsync();
      setIsPlayingAudio(false);
      return;
    }
    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(secondsRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating, audioSound]);

  useEffect(() => {
    return () => {
      setDuration(10);
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) setDuration(10);

    setIsMeditating(!isMeditating);
    await toggleSound();
  };

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();
    router.push("/(modal)/adjust-meditation-duration");
  };

  // SUB : toggle sound
  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initialiseSound();
    const status = await sound?.getStatusAsync();
    if (status?.isLoaded && !isPlayingAudio) {
      await sound?.playAsync();
      setIsPlayingAudio(true);
    } else {
      await sound?.pauseAsync();
      setIsPlayingAudio(false);
    }
  };

  // SUB : Initializer
  const initialiseSound = async () => {
    const audioFile = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFile]);
    setAudioSound(sound);
    return sound;
  };

  //HDR: format time remaining to two digits
  const formattedMinute = String(Math.floor(secondsRemaining / 60)).padStart(
    2,
    "0 "
  );
  const formattedSeconds = String(Math.floor(secondsRemaining % 60)).padStart(
    2,
    "0 "
  );

  return (
    <View className="flex-1">
      <ImageBackground
        source={meditationImages[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8) "]}>
          <Pressable
            onPress={() => router.back()}
            className="relative top-0 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={38} color="white" />
          </Pressable>
          <View className="flex-1 justify-center ">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl font-rmono">
                {formattedMinute}:{formattedSeconds}
              </Text>
            </View>
          </View>
          <View className="mb-5">
            <CustomButton
              onPress={toggleMeditationSessionStatus}
              title={isMeditating ? "Stop" : "Start Meditation"}
            />
          </View>
          <View className="">
            <CustomButton
              onPress={handleAdjustDuration}
              title="Adjust Duration"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
