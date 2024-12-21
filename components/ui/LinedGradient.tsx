import React, { useState } from "react";
import { View, ViewProps } from "react-native";

export type LinedGradientProps = {
  from: string;
  to: string;
  subDivisions?: number;
} & ViewProps;

export default function LinedGradient({
  from,
  to,
  children,
  subDivisions = 5,
  ...props
}: LinedGradientProps) {
  const [height, setHeight] = useState(0);
  const lines = Array.from(
    { length: height / subDivisions },
    (_, line) => line + 1
  );

  return (
    <View
      onLayout={(ev) => {
        setHeight(ev.nativeEvent.layout.height);
      }}
      className={`relative flex-1 ${props.className}`}
      style={{ backgroundColor: from }}
      {...props}
    >
      <View className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
        {lines.map((line, i) => (
          <View
            key={i}
            style={{
              backgroundColor: to,
              height: subDivisions,
              opacity: line / lines.length,
            }}
          />
        ))}
      </View>
      <View className="relative flex-1">{children}</View>
    </View>
  );
}
