import { FlatList } from "react-native";
import React from "react";
import { TListView } from "../Themed";
import { paths } from "@/utils";
import { ListTile } from "../ui";
import { useBottomSheet } from "@/hooks";
import { ThemeModal } from "../modals";

export default function SettingsList() {
  const { ref: themeRef, openModal: openThemeModal, closeModal: closeThemeModal } = useBottomSheet();

  const items = [
    // {
    //   title: "Search History",
    //   subTitle: "manage search history",
    //   icon: "search",
    //   href: paths.settingsHistory,
    // },
    {
      title: "Theme",
      subTitle: "change app theme",
      icon: "invert-mode-outline",
      onClick: openThemeModal,
    },
    {
      title: "About",
      subTitle: "about movee",
      icon: "information",
      href: paths.about,
    },
  ];

  return (
    <>
      <TListView className={`flex-row items-center p-0`}>
        <FlatList
          scrollEnabled={false}
          data={items}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <ListTile
              {...item}
              underline={items.indexOf(item) !== items.length - 1}
            />
          )}
        />
      </TListView>

      <ThemeModal ref={themeRef} closeModal={closeThemeModal} />
    </>
  );
}

