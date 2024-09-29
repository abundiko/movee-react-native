import React from "react";
import { Image, PressableProps, Text } from "react-native";
import { AppButton } from "../ui";

export type FormButtonProps = PressableProps & {
  children: React.ReactNode | string;
  childrenClassName?: string;
  loading?: boolean;
};

export default function FormButton({
  children,
  childrenClassName,
  loading = false,
  disabled,
  ...props
}: FormButtonProps) {
  
  return (
    <AppButton {...props}
    disabled={loading}
    >
      {loading ? (
        <Image
          source={require("@/assets/images/loading.gif")}
          className={`h-6 w-6 ${loading ? 'opacity-50' : ''}`}
        />
      ) : typeof children === "string" ? (
        <Text className={`${childrenClassName}`}>{children}</Text>
      ) : (
        children
      )}
    </AppButton>
  );
}
