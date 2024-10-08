import { View, Text, TextInput, TextInputProps } from "react-native";
import { cls } from "@/constants/cls";
import { useAppTheme } from "@/hooks";
import { TTextLighter } from "../Themed";
import { useState } from "react";
import Color from 'color'

export type AppInputProps = TextInputProps & {
  label?: string;
  parentClassName?: string;
  type?: "text" | "password";
  errors?: string[];
};

export type AppInputPropsWithName = AppInputProps & {
  name: string;
};

export function AppInput({
  parentClassName: className,
  type = 'text',
  label = "",
  errors,
  ...props
}: AppInputProps) {
  const { textLighter, primary, primaryActive } = useAppTheme();
  const [focused, setFocused] = useState<boolean>(!!props.autoFocus);
  

  return (
    <View className={` w-full ${className}`}>
      {label && <TTextLighter >{label}</TTextLighter>}
      <View className="mb-2">
        <TextInput
          {...props}
          selectionColor={primaryActive}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor={Color(textLighter).alpha(0.5).hexa()}
          className={` ${errors?.length ? "!bg-red-50" : ""} ${cls.input.className} `}
          secureTextEntry={type == "password"}
          style={{
            borderColor: focused? primary : undefined,
          }}
        />
        {errors?.length && (
          <Text className="text-red-500 ">{errors[0]}</Text>
        )}
      </View>
    </View>
  );
}
