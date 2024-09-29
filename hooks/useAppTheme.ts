import { ThemeColors } from "@/constants";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useColorScheme } from "nativewind";
import { useEffect, useMemo, useState } from "react";
import { Appearance } from 'react-native';

const { dark, light } = ThemeColors;

export function useAppTheme() {
  const [_colorScheme, _setColorScheme] = useState(Appearance.getColorScheme());
  const { colorScheme, setColorScheme } = useColorScheme();
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // setBackgroundColorAsync(_colorScheme == 'dark' ? dark.bg : light.bg);
      _setColorScheme(_colorScheme);
      if (_colorScheme) setColorScheme(_colorScheme);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  const colors = useMemo(
    () => (colorScheme === "dark" ? dark : light),
    [colorScheme]
  );


  return { ...colors, colorScheme };
}
