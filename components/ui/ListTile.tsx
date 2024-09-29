import { TTextLight, TTextLighter } from "@/components/Themed";
import { Pressable, PressableProps, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/hooks";

type ListTileProps = PressableProps & {
  title: string;
  subTitle?: string;
  icon?: string;
  suffixIcon?: string | false;
  href?: string;
  underline?: boolean;
  onClick?: () => void;
  listClassName?: string;
};

export default function ListTile({ listClassName, suffixIcon, ...item }: ListTileProps) {
  const { textLight, textLighter } = useAppTheme();
  // console.log(listClassName);

  return (
    <Pressable
      onPress={
        item.onClick
          ? item.onClick
          : item.href
            ? () => router.push(item.href as any)
            : undefined
      }
      className={`px-4 py-4 flex-row items-center relative overflow-hidden ${listClassName} ${item.underline
        ? "border-b border-b-dark/30 dark:border-b-light/30"
        : ""
        }
        `}
    >
      {item.icon && <Ionicons name={item.icon as any} size={20} color={textLight} style={{ marginRight: 20 }} />}
      <View className="flex-1">
        <TTextLight className="text-base ">{item.title}</TTextLight>
        {item.subTitle && <TTextLighter className="text-xs flex-1 font-light opacity-80">{item.subTitle}</TTextLighter>}
      </View>
      {suffixIcon != false && <Ionicons name={(suffixIcon as any) ?? "chevron-forward"} color={textLighter} />}
    </Pressable>
  );
}
