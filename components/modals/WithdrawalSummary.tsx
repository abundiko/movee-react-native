import { AppTheme, cls } from "@/constants/";
import { formatNumber } from "@/functions/number";
import { useAppTheme } from "@/hooks";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { View } from "react-native";
import { TText, TTextLight } from "../Themed";
import { AppButton, InfoLine, Message } from "../ui";

export type WithdrawalSummary = {
    amount: number;
    bankName: string;
    bankAccountNumber: string;
    bankAccountName: string;
}

export const WithdrawalSummaryModal = forwardRef<
    BottomSheetModal,
    {
        closeModal: () => void;
        summary: WithdrawalSummary;
    }
>((props, ref) => {
    const { bg } = useAppTheme();
    const { summary } = props;

    return (
        <BottomSheetModal
            ref={ref}
            backdropComponent={
                ({ style }) => (
                    <View
                        style={[{ backgroundColor: "#000000aa", }, style]}
                    />
                )
            }
            snapPoints={["50%", "50%"]}
            {...AppTheme.modal(bg)}
        >
            <BottomSheetView
                style={{ backgroundColor: bg, flex: 1 }}
            >
                <TTextLight className="text-lg font-[500] mb-4 mx-4">Withdrawal Summary</TTextLight>
                <View className="mx-4">
                    <InfoLine title={"Account Name"} value={summary.bankAccountName} />
                    <InfoLine title={"Account Number"} value={summary.bankAccountNumber} />
                    <InfoLine title={"Bank Name"} value={summary.bankName} />
                    <InfoLine title={"Withdrawal Amount"} value={formatNumber(summary.amount, true)} />
                    <Message.Warning message="Your withdrawal will be processed and approved (typically within 3 hours)" />
                    <AppButton className={cls.btn.primaryClass}>
                        <TText>Place Withdrawal</TText>
                    </AppButton>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});
