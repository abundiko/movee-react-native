import { TListView, TTextLight } from "../Themed";
import React, { forwardRef } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useColorScheme } from "nativewind";
import ListTile from "../ui/ListTile";
import { AppTheme } from "@/constants/";
import { useAppTheme, useStorageTheme } from "@/hooks";
import { FlatList, View } from "react-native";

export const ThemeModal = forwardRef<
  BottomSheetModal,
  {
    closeModal: () => void;
  }
>((props, ref) => {
  const { setColorScheme } = useColorScheme();
  const { updateTheme, storedTheme } = useStorageTheme();
  // console.log({ data: storedTheme, isLoading: themeLoading });

  const { bg } = useAppTheme();

  const items = [
    {
      title: "Dark",
      icon: "moon",
      mode: "dark"
    },
    {
      title: "Light",
      icon: "sunny",
      mode: "light"
    },
    {
      title: "Device Default",
      icon: "phone-portrait",
      mode: "system",
    },
  ] as const;

  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={
        ({ style }) => (
          <View
            onTouchEnd={props.closeModal}
            style={[{ backgroundColor: "#000000aa", }, style]}
          />
        )
      }
      snapPoints={["40%", "42%"]}
      {...AppTheme.modal(bg)}
    >
      <BottomSheetView
        style={{ backgroundColor: bg, flex: 1 }}
      >
        <TTextLight className="text-lg font-[500] mb-4 mx-4">Change Theme</TTextLight>
        <TListView className="p-0 ">
          <FlatList
            scrollEnabled={false}
            data={items}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <ListTile
                {...item}
                listClassName={item.mode == storedTheme ? 'bg-primary/20' : ''}
                underline={items.indexOf(item) !== items.length - 1}
                onClick={() => {
                  setColorScheme(item.mode);
                  updateTheme(item.mode);
                  props.closeModal();
                }}
              />
            )}
          />
        </TListView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});
