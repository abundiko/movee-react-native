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
import { useTranslation } from "react-i18next";

export default function Welcome() {
  const { t } = useTranslation()

  return (
    <TBgView className="flex-1">
      <View className="flex-1 justify-end items-center">
        <Image source={require('@/assets/images/hero.png')}
        className=" aspect-[1122/1855] h-[80vh] rotate-6 translate-y-20"
         />
      </View>
      <View className="flex-1 p-5 justify-end max-w-[700px] mx-auto">
        <TText className="font-semibold text-4xl text-center mb-2 leading-tight">
          {t("index.title")}
        </TText>
        <TTextLighter className="text-sm text-center mb-4">
          {t("index.subTitle")}
        </TTextLighter>
        <View className="flex-row mb-10 justify-center">
          <AppButton
            onPress={() => router.push(paths.home)}
            className={`${cls.btn.primaryClass} w-[48%]`}
          >
            <TText>{t("index.btn.login")}</TText>
          </AppButton>
          <View className="w-4" />
          <AppButton
            onPress={() => router.push(paths.register)}
            className={`${cls.btn.primaryBorderClass} w-[48%]`}
          >
            <TTextPrimary>{t("index.btn.registerNow")}</TTextPrimary>
          </AppButton>
        </View>
      </View>
    </TBgView>
  );
}
