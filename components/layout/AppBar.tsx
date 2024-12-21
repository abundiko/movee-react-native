import { TBgView, TText } from "@/components/Themed";
import { Pressable, View } from "react-native";
// import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "expo-router";
import { StatusBar } from "react-native";
import { useAppTheme } from "@/hooks";
import { ReactNode } from "react";

export type AppBarProps = {
  title?: ReactNode | string;
  icons?: ReactNode;
  hideBack?: boolean;
  appbarHeight?: number;
};

export default function AppBar({
  title = "",
  hideBack = false,
  icons: children,
  appbarHeight = 70,
}: AppBarProps) {
  const { text, statusBar } = useAppTheme();
  const n = useNavigation();
  return (
    <TBgView
      style={{
        height: appbarHeight + (StatusBar.currentHeight ?? 12),
        paddingTop: StatusBar.currentHeight ?? 12,
      }}
      className="flex-row justify-between items-center px-4 gap-x-4"
    >
      <StatusBar
        barStyle={statusBar == "dark" ? "dark-content" : "light-content"}
      />
      {!hideBack && (
        <Pressable className="p-2 rounded-lg" onPress={() => n.goBack()}>
          <Feather name="chevron-left" size={24} color={text} />
        </Pressable>
      )}
      {typeof title == "string" ? (
        <TText
          numberOfLines={2}
          className="flex-1 text-lg font-semibold line-clamp-1"
        >
          {title}
        </TText>
      ) : (
        <View className="flex-1">{title}</View>
      )}
      {children}
    </TBgView>
  );
}
