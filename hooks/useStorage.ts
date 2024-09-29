import { SupportedLocales } from "@/localization";
import { tags } from "@/utils";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColorSchemeSystem } from "nativewind/dist/style-sheet/color-scheme";

export function useStorageAccessToken() {
  const { getItem } = useAsyncStorage(tags.accessToken);
  const { data: storedAccessToken, isLoading: accessTokenLoading, error: accessTokenError, ...others } = useQuery({
    queryKey: [tags.accessToken],
    queryFn: async () => {
      return await getItem();
    },
  });


  return {
    storedAccessToken,
    accessTokenLoading,
    accessTokenError,
    ...others
  }
}

export function useStorageTheme() {
  const { getItem, setItem } = useAsyncStorage(tags.theme);

  const { data: storedTheme, isLoading: themeLoading, error: themeError, refetch: refetchTheme, ...others } = useQuery({
    queryKey: [tags.theme],
    queryFn: async () => {
      const theme = await getItem();
      if (!theme) {
        await setItem('system');
        return (await getItem()) as ColorSchemeSystem;
      }
      return theme as ColorSchemeSystem;
    },
  });


  const { mutate: updateTheme } = useMutation({
    mutationFn: async (value: ColorSchemeSystem) => {
      // console.log({ hia: value });
      await setItem(value);
      await refetchTheme();
    },
    onMutate: async () => {
      await refetchTheme();
      // console.log({ hmm: 10293, storedTheme });

    },
  })

  return {
    storedTheme,
    themeLoading,
    themeError,
    refetchTheme,
    updateTheme,
    ...others
  }
}

export function useStorageLanguage() {
  const { getItem, setItem } = useAsyncStorage(tags.language);

  const { data: storedLanguage, isLoading: languageLoading, error: languageError, refetch: refetchLanguage, ...others } = useQuery({
    queryKey: [tags.language],
    queryFn: async () => {
      const lng = await getItem();
      // console.log({lng});
      
      if (!lng) {
        await setItem('en');
        return (await getItem()) as SupportedLocales;
      }
      return lng as SupportedLocales;
    },
  });


  const { mutate: updateLanguage } = useMutation({
    mutationFn: async (value: SupportedLocales) => {
      // console.log({ hia: value });
      await setItem(value);
      await refetchLanguage();
    },
    onMutate: async () => {
      await refetchLanguage();
      // console.log({ hmm: 10293, storedLanguage });

    },
  })

  return {
    storedLanguage,
    languageLoading,
    languageError,
    refetchLanguage,
    updateLanguage,
    ...others
  }
}