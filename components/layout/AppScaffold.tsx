import { TBgView } from "@/components/Themed";
import { useAppTheme } from "@/hooks";
import color from "color";
import React from "react";
import { RefreshControl, ScrollView, ScrollViewProps, View } from "react-native";
import { LinearProgress } from "../ui";
import AppBar, { AppBarProps } from "./AppBar";

export type AppScaffoldProps = AppBarProps & {
  children?: React.ReactNode;
  underAppbar?: React.ReactNode;
  underBody?: React.ReactNode;
  noScroll?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  scrollProps?: ScrollViewProps;
};

export default function AppScaffold({
  title = "",
  children,
  underAppbar,
  underBody,
  noScroll = false,
  onRefresh, refreshing,
  scrollProps,
  ...appbarProps
}: AppScaffoldProps) {
  const { bg } = useAppTheme();


  return (
    <TBgView className="flex-1">
      <AppBar title={title} {...appbarProps} />
      {underAppbar}
      {refreshing && <LinearProgress />}
      <View className="flex-1">
        {
          noScroll ? children :
            <ScrollView
            {...scrollProps}
            scrollEventThrottle={30}
              refreshControl={
                <RefreshControl
                  refreshing={false} // Use refreshing state
                  onRefresh={onRefresh} // Attach onRefresh function
                  progressViewOffset={!!onRefresh ? -50 : -400}
                  progressBackgroundColor={color(bg).lighten(10).hexa()}
                />
              }
              keyboardShouldPersistTaps="always"
              className="flex-1">
              <View className="h-3" />
              {children}
              <View className="h-6" />
            </ScrollView>}
      </View>
      {underBody}
    </TBgView>
  );
}
