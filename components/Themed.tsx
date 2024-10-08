import { cls } from "@/constants";
import { useAppTheme } from "@/hooks";
import { StatusBar, StatusBarProps, TextProps, View, ViewProps, Text } from "react-native";

/**
 * All Themed components are prefixed with an underscore to avoid naming conflicts with the native View component
 */
export const TListView = ({ className, ...props }: ViewProps) => (
  <View className={`${cls.bg.opacified} ${className} mx-4 mb-4 rounded-xl p-4 overflow-hidden`} {...props} />
);
export const TBgView = ({ className, ...props }: ViewProps) => (
  <View className={`${cls.bg.class} ${className}`} {...props} />
);
export const TBgPureView = ({ className, ...props }: ViewProps) => (
  <View className={`${cls.bg.pureClass} ${className}`} {...props} />
);
export const TBgGreyView = ({ className, ...props }: ViewProps) => (
  <View className={`${cls.bg.greyClass} ${className}`} {...props} />
);
export const TText = ({ className, ...props }: TextProps) => (
  <Text className={`${cls.text.class} ${className}`} {...props} />
);
export const TTextLight = ({ className, ...props }: TextProps) => (
  <Text className={`${cls.text.lightClass} ${className}`} {...props} />
);
export const TTextLighter = ({ className, ...props }: TextProps) => (
  <Text className={`${cls.text.lighterClass} ${className}`} {...props} />
);
export const TTextPrimary = ({ className, ...props }: TextProps) => (
  <Text className={`${cls.text.primaryClass} ${className}`} {...props} />
);
export const TTextSecondary = ({ className, ...props }: TextProps) => (
  <Text className={`${cls.text.secondaryClass} ${className}`} {...props} />
);
export function TStatusBar(props: StatusBarProps) {
  const { statusBar } = useAppTheme();
  return (
    <StatusBar
      {...props}
      barStyle={statusBar == "light" ? "light-content" : "dark-content"}
    />
  );
}
