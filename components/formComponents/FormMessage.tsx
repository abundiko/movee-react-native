import { View, Text } from "react-native";
import React from "react";
import { SubmitResponse } from "@/hooks/useFormSubmit";
import { cls } from "@/constants/cls";

export default function FormMessage({ error, success }: SubmitResponse) {
  if (error) return <Text className={cls.message.errorClass}>{error}</Text>;
  else if (success)
    return <Text className={cls.message.successClass}>{success}</Text>;
  return <></>;
}
