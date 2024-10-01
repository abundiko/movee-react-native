import { cls } from "@/constants";
import { paths } from "@/utils";
import { router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import {
  TBgView,
  TText,
  TTextLighter,
  TTextPrimary
} from "./Themed";
import { AppButton } from "./ui";

export default function Welcome() {

  return (
    <TBgView className="flex-1">
      <View className="flex-1 justify-end items-center">
        {/* <Image source={require('@/assets/images/hero.png')}
        className=" aspect-[1122/1855] h-[80vh] rotate-6 translate-y-20"
         /> */}
      </View>
      <View className="flex-1 p-5 justify-end max-w-[700px] mx-auto">
        <TText className="font-semibold text-4xl mb-2 leading-tight">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam et sapiente adipisci? Eos sunt exercitationem
        </TText>
        <TTextLighter className="text-sm text-center mb-4">
        </TTextLighter>
        <View className="mb-10 justify-center  gap-y-4">
          <AppButton
            onPress={() => router.push(paths.home)}
            className={`${cls.btn.primaryClass} `}
          >
            <TText>Enter for Free</TText>
          </AppButton>
          {/* <AppButton
            onPress={() => router.push(paths.register)}
            className={`${cls.btn.primaryBorderClass} flex-1`}
          >
            <TTextPrimary>hello</TTextPrimary>
          </AppButton> */}
        </View>
      </View>
    </TBgView>
  );
}
