import { AppTheme, cls } from "@/constants";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { ReactNode, useState } from "react"
import { View, TextStyle, ViewStyle } from "react-native";
import { TTextLight, TListView, TTextLighter } from "../Themed";
import { useAppTheme, useBottomSheet } from "@/hooks";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "react-native-ui-datepicker";
import Color from "color";


export type AppDatePickerProps = {
    renderButton: (value: string) => ReactNode;
    label: string;
    value?: string;
    placeholder?: string;
}

export function AppDatePicker({
    renderButton, label, value, placeholder
}: AppDatePickerProps) {
    const [selected, setSelected] = useState(value);
    const { closeModal, openModal, ref } = useBottomSheet();
    const { bg, primary, textLighter } = useAppTheme()
    const textStyle:TextStyle = {color: textLighter}
    const containerStyle:ViewStyle = {backgroundColor: new Color(textLighter).alpha(0).hexa()}

    return (
        <>
            <TouchableOpacity
                onPress={() => openModal()}
            >
                {selected ? renderButton(selected) : <TTextLighter className={cls.btn.selectClass}>{placeholder}</TTextLighter>}
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
                snapPoints={["50%", "52%"]}
                {...AppTheme.modal(bg)}
            >
                <BottomSheetView
                    style={{ backgroundColor: bg, flex: 1 }}
                >
                    <TTextLight className="text-lg font-[500] mb-4 mx-4">{label}</TTextLight>
                    <TListView className="p-0 ">
                        <DateTimePicker
                            mode="single"
                            selectedItemColor={primary}
                            calendarTextStyle={textStyle}
                            headerTextStyle={textStyle}
                            weekDaysTextStyle={textStyle}
                            headerButtonColor={new Color(primary).alpha(.5).hexa()}
                            yearContainerStyle={containerStyle}
                            monthContainerStyle={containerStyle}
                            weekDaysContainerStyle={containerStyle}
                            date={selected ?? Date.now()}
                            onChange={(params) =>{
                                setSelected(params.date?.toString());
                                closeModal();
                            }}
                        />
                    </TListView>
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}

