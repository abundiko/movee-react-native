export const Colors = {
  white: "#fff",
  lighter: "#ededed",
  light: "#ccc",
  lightGrey: "#acacac",
  black: "#000",
  dark: "#444",
  darker: "#101010",
  darkGrey: "#777",

  primary: "#c13400",
  primaryLight: "#FF5F24",
  primaryDark: "#8E2600",

  secondary: "#3fb12e",
  secondaryLight: "#89F978",
  secondaryDark: "#0C5E00",
} as const;

export const ThemeColors = {
  light: {
    bg: Colors.lighter,
    bgPure: Colors.white,
    bgGrey: Colors.lightGrey,
    primary: Colors.primary,
    primaryActive: Colors.primaryDark,
    secondary: Colors.secondary,
    secondaryActive: Colors.secondaryDark,
    text: Colors.darker,
    textLight: Colors.dark,
    textLighter: Colors.darkGrey,
    statusBar: "dark"
  },
  dark: {
    bg: Colors.darker,
    bgPure: Colors.black,
    bgGrey: Colors.darkGrey,
    primary: Colors.primary,
    primaryActive: Colors.primaryLight,
    secondary: Colors.secondary,
    secondaryActive: Colors.secondaryLight,
    text: Colors.white,
    textLight: Colors.light,
    textLighter: Colors.lightGrey,
    statusBar: "light"
  }
}
