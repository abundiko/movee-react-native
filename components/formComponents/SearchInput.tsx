import { cls } from "@/constants/cls";
import { useAppTheme } from "@/hooks";
import { AntDesign } from "@expo/vector-icons";
import Color from "color";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { AppInputProps } from ".";
import { TTextLighter } from "../Themed";

export function SearchInput({
  parentClassName: className,
  type = "text",
  label = "",
  errors,
  ...props
}: AppInputProps) {
  const { textLighter, primary, primaryActive } = useAppTheme();
  const [focused, setFocused] = useState<boolean>(!!props.autoFocus);
  const [value, setValue] = useState(props.value);

  return (
    <View className={`${className} w-full`}>
      {label && <TTextLighter>{label}</TTextLighter>}
      <View className="mb-2 relative">
        <TextInput
          {...props}
          value={value}
          onChangeText={(v) => {
            setValue(v);
            props.onChangeText?.(v);
          }}
          selectionColor={primaryActive}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor={Color(textLighter).alpha(0.5).hexa()}
          className={`${className} ${cls.input.searchClassName} pr-10`}
          style={{
            borderColor: focused ? primary : undefined,
          }}
        />
        {value && (
          <Pressable
            onPress={() => {
              setValue("");
              props.onChangeText?.("");
            }}
            className="absolute right-2 top-3 pr-1"
          >
            <AntDesign name="closecircle" size={24} color={textLighter} />
          </Pressable>
        )}
        {errors?.length && <Text className="text-red-500 ">{errors[0]}</Text>}
      </View>
    </View>
  );
}
