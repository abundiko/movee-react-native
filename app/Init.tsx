import { fetchSuggestions } from "@/actions/fetchSuggestions";
import { TTextLight, TTextLighter } from "@/components/Themed";
import { APP_VERSION } from "@/constants";
import { useAppTheme, useStorageSaved, useStorageTheme } from "@/hooks";
import { paths } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useColorScheme } from "nativewind";
import { ReactNode, useEffect, useState } from "react";
import { Image, View } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";

export default function Init({ children }: { children: ReactNode }) {
  const { setColorScheme } = useColorScheme();
  const { themeLoading, storedTheme } = useStorageTheme();
  const { savedLoading, updatesaved, storedsaved } = useStorageSaved();
  const { bg } = useAppTheme();
  const [initializing, setInitializing] = useState(true);

  useQuery({
    queryKey: ["suggestions"],
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    queryFn: async () => {
      const res = await fetchSuggestions();
      if (!res) throw new Error("Connection Error");
      return res;
    },
  });

  useEffect(() => {
    if (themeLoading || !storedTheme) return;
    setColorScheme(storedTheme);
  }, [themeLoading, storedTheme]);

  useEffect(() => {
    setBackgroundColorAsync(bg);
  }, [bg]);

  useEffect(() => {
    // initialize stored saved movies
    if (storedsaved && storedsaved.length > 0)
      updatesaved([...storedsaved.filter((i) => !!i)]);
  }, [storedsaved]);

  if (themeLoading || savedLoading || initializing)
    return (
      <Animated.View
        exiting={FadeOut}
        style={{ backgroundColor: bg }}
        className="flex-1 justify-center items-center"
      >
        {(() => {
          setTimeout(() => {
            setInitializing(false);
          }, 1500);
          return <></>;
        })()}
        <Image
          source={require("@/assets/images/icon.png")}
          className="h-40 rounded-3xl w-40 mt-[30vh]"
        />
        <View className="h-[40vh]" />
        <TTextLight className="text-sm mt-2 font-semibold">
          Movee • by Abundiko
        </TTextLight>
        <TTextLighter className="text-sm mt-2">
          version {APP_VERSION}
        </TTextLighter>
      </Animated.View>
    );
  else {
    return <Redirect href={paths.home} />;
  }
}
