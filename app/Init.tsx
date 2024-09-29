import { TBgView } from "@/components/Themed";
import { useAppTheme, useStorageAccessToken, useStorageLanguage, useStorageTheme } from "@/hooks";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useColorScheme } from "nativewind";
import { ReactNode, useEffect } from "react";


export default function Init({ children }: { children: ReactNode }) {
    const { setColorScheme } = useColorScheme();
    const { themeLoading, storedTheme } = useStorageTheme();
    const { accessTokenLoading } = useStorageAccessToken();
    const { storedLanguage } = useStorageLanguage();
    const { bg } = useAppTheme();

    useEffect(() => {
        if (themeLoading || !storedTheme) return;
        setColorScheme(storedTheme);
    }, [themeLoading, storedTheme]);

    useEffect(() => {
    }, [storedLanguage])


    useEffect(() => {
        setBackgroundColorAsync(bg)
    }, [bg])

    if (themeLoading || accessTokenLoading) <TBgView className="flex-1"></TBgView>;

    return children;
}