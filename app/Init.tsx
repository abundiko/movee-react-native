import { TBgView } from "@/components/Themed";
import { useAppTheme, useStorageSaved, useStorageTheme } from "@/hooks";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useColorScheme } from "nativewind";
import { ReactNode, useEffect } from "react";


export default function Init({ children }: { children: ReactNode }) {
    const { setColorScheme } = useColorScheme();
    const { themeLoading, storedTheme } = useStorageTheme();
    const { savedLoading } = useStorageSaved();
    const { bg } = useAppTheme();

    useEffect(() => {
        if (themeLoading || !storedTheme) return;
        setColorScheme(storedTheme);
    }, [themeLoading, storedTheme]);


    useEffect(() => {
        setBackgroundColorAsync(bg)
    }, [bg])

    if (themeLoading || savedLoading) <TBgView className="flex-1"></TBgView>;

    return children;
}