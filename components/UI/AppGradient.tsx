import React from "react";
import { SafeAreaView, Text } from "react-native";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";

interface AppGradientProps extends LinearGradientProps {
  children: React.ReactNode;
}

const AppGradient: React.FC<AppGradientProps> = ({
  children,
  colors,
  ...rest
}) => {
  return (
    <LinearGradient colors={colors} style={{ flex: 1 }} {...rest}>
      <SafeAreaView className="flex-1 mx-5 py-3">{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default AppGradient;
