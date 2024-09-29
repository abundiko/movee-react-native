import { TListView, TTextLight } from "../Themed";
import React, { forwardRef } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useColorScheme } from "nativewind";
import ListTile from "../ui/ListTile";
import { AppTheme } from "@/constants/";
import { useAppTheme, useStorageLanguage, useStorageTheme } from "@/hooks";
import { FlatList, View } from "react-native";
import { LANGUAGES, SupportedLocales } from "@/localization";
import { useTranslation } from "react-i18next";

export const LanguageModal = forwardRef<
    BottomSheetModal,
    {
        closeModal: () => void;
    }
>((props, ref) => {
    const { i18n } = useTranslation();
    const { updateLanguage } = useStorageLanguage()
    // console.log({ data: storedTheme, isLoading: themeLoading });
    const { bg } = useAppTheme();

    const items = Object.entries(LANGUAGES).map(i => ({
        title: i[1].nativeName,
        value: i[0] as SupportedLocales,
    }))

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
            snapPoints={["50%", "80%"]}
            {...AppTheme.modal(bg)}
        >
            <BottomSheetView
                style={{ backgroundColor: bg, flex: 1 }}
            >
                <TTextLight className="text-lg font-[500] mb-4 mx-4">Select Language</TTextLight>
                <TListView className="p-0 ">
                    <FlatList
                        scrollEnabled={false}
                        data={items}
                        keyExtractor={(item) => item.title}
                        renderItem={({ item }) => (
                            <ListTile
                                {...item}
                                listClassName={item.value == i18n.resolvedLanguage ? 'bg-primary/20' : ''}
                                suffixIcon={item.value != i18n.resolvedLanguage ? false : 'checkmark'}
                                underline={items.indexOf(item) !== items.length - 1}
                                onClick={() => {
                                    i18n.changeLanguage(item.value);
                                    updateLanguage(item.value);
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
