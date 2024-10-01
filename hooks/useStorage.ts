import { Movie } from "@/types";
import { tags } from "@/utils";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColorSchemeSystem } from "nativewind/dist/style-sheet/color-scheme";



export function useStorageSaved() {
  const { getItem, setItem } = useAsyncStorage(tags.saved);

  const { data: storedsaved, isLoading: savedLoading, error: savedError, refetch: refetchsaved, ...others } = useQuery({
    queryKey: [tags.saved],
    queryFn: async () => {
      const saved = await getItem();
      if (!saved) {
        await setItem(JSON.stringify([]));
        return JSON.parse((await getItem() ?? '[]')) as Movie[];
      }
      return JSON.parse(saved) as Movie[];
    },
  });


  const { mutate: updatesaved } = useMutation({
    mutationFn: async (value: Movie[]) => {
      // console.log({ hia: value });
      await setItem(JSON.stringify(value));
      await refetchsaved();
    },
    onMutate: async () => {
      await refetchsaved();
      // console.log({ hmm: 10293, storedsaved });

    },
  })

  return {
    storedsaved,
    savedLoading,
    savedError,
    refetchsaved,
    updatesaved,
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

