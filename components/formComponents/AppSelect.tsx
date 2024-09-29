import { AppTheme } from "@/constants";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { ReactNode, useState } from "react"
import { View, FlatList, useWindowDimensions } from "react-native";
import { TTextLight, TListView } from "../Themed";
import { ListTile } from "../ui";
import { useAppTheme, useBottomSheet } from "@/hooks";
import { TouchableOpacity } from "react-native-gesture-handler";

export type AppSelectOptions = string | {
    title: string;
    value: string;
}

export type AppSelectProps<T = AppSelectOptions> = {
    renderButton: (value: T) => ReactNode;
    options: T[];
    label: string;
    value?: T;
    scrollable?: boolean;
    snapPoints?: [string, string];
}

export function AppSelect<T extends AppSelectOptions>({
    renderButton, options, label, value, scrollable = false, snapPoints
}: AppSelectProps<T>) {
    const [selected, setSelected] = useState(value);
    const { closeModal, openModal, ref } = useBottomSheet();
    const { bg } = useAppTheme()
    const w = useWindowDimensions();

    return (
        <>
            <TouchableOpacity
                onPress={() => openModal()}
            >
                {selected && renderButton(selected)}
            </TouchableOpacity>
            <BottomSheetModal
                ref={ref}
                backdropComponent={
                    ({ style }) => (
                        <View
                            onTouchEnd={closeModal}
                            style={[{ backgroundColor: "#000000aa", }, style]}
                        />
                    )
                }
                snapPoints={snapPoints ?? ["40%", "42%"]}
                enableDynamicSizing={scrollable}
                maxDynamicContentSize={(w.height * 90) / 100}
                enableContentPanningGesture={!scrollable}
                {...AppTheme.modal(bg)}
            >
                <BottomSheetView
                    style={{ backgroundColor: bg, flex: 1 }}
                >
                    <TTextLight className="text-lg font-[500] mb-4 mx-4">{label}</TTextLight>
                    <TListView className="p-0">
                        <FlatList
                            data={options}
                            keyExtractor={(item) => typeof item === 'string' ? item : item.value}
                            renderItem={({ item }) => (
                                <ListTile
                                    title={typeof item === 'string' ? item : item.title}
                                    listClassName={`${item == selected ? 'bg-primary/20' : ''} py-3`}
                                    underline={options.indexOf(item) !== options.length - 1}
                                    onClick={() => {
                                        setSelected(item);
                                        closeModal();
                                    }}
                                    suffixIcon={item == selected ? "checkmark" : false}
                                />
                            )}
                        />
                    </TListView>
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}