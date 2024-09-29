import { View, ScrollView, RefreshControl } from "react-native";
import { TBgView } from "@/components/Themed";
import React, { useState } from "react";
import AppBar, { AppBarProps } from "./AppBar";
import { LinearProgress } from "../ui";
import { useAppTheme } from "@/hooks";
import color from "color";

export type AppScaffoldProps = AppBarProps & {
  children?: React.ReactNode;
  underAppbar?: React.ReactNode;
  noScroll?: boolean;
  refreshing?: boolean;
  onRefresh?: ()=>void;
};

export default function AppScaffold({
  title = "",
  children,
  underAppbar,
  noScroll = false,
  onRefresh, refreshing,
  ...appbarProps
}: AppScaffoldProps) {
  const {bg} = useAppTheme();


  return (
    <TBgView className="flex-1">
      <AppBar title={title} {...appbarProps} />
      {underAppbar}
      {refreshing && <LinearProgress />}
      <View className="flex-1">
        {
          noScroll ? children :
            <ScrollView
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
            </ScrollView>}
      </View>
    </TBgView>
  );
}
