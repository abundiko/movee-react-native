import { cls } from "@/constants";
import { paths } from "@/utils";
import { router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import {
  TBgView,
  TText,
  TTextLighter
} from "./Themed";
import { AppButton } from "./ui";
import { LinearGradient } from 'expo-linear-gradient'
import { useAppTheme } from "@/hooks";

export default function Welcome() {
  const { bg } = useAppTheme();

  return (
    <TBgView className="flex-1">
      <View className="flex-1 justify-end items-center relative">
        <Image source={require('@/assets/images/hero.png')}
          resizeMode="cover"
          className="h-full w-full absolute top-0 left-0 " />
        <LinearGradient
          className="h-full w-full absolute top-0 left-0"
          colors={['#ff343400', bg]}
        />
      </View>
      <View className="flex-1 p-4 justify-end max-w-[700px] mx-auto md:mb-20">
        <TText className="font-[500] text-4xl mb-2 leading-tight">
          We both know you are here to watch movies completely free, what are you still waiting for?!
        </TText>
        <TTextLighter className="text-sm text-center mb-4">
        </TTextLighter>
        <View className="mb-10 justify-center  gap-y-4">
          <AppButton
            onPress={() => {
              router.replace(paths.home)
            }}
            className={`${cls.btn.primaryClass} `}
          >
            <TText>Let's goooo</TText>
          </AppButton>
        </View>
      </View>
    </TBgView>
  );
}
