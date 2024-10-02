import { TTextLight, TTextLighter } from "@/components/Themed";
import { APP_VERSION } from "@/constants";
import { useAppTheme, useStorageSaved, useStorageTheme } from "@/hooks";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useColorScheme } from "nativewind";
import { ReactNode, useEffect, useState } from "react";
import { Image, View } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";


export default function Init({ children }: { children: ReactNode }) {
    const { setColorScheme } = useColorScheme();
    const { themeLoading, storedTheme } = useStorageTheme();
    const { savedLoading } = useStorageSaved();
    const { bg } = useAppTheme();
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        if (themeLoading || !storedTheme) return;
        setColorScheme(storedTheme);
    }, [themeLoading, storedTheme]);


    useEffect(() => {
        setBackgroundColorAsync(bg)
    }, [bg])

    if (themeLoading || savedLoading || initializing) return <Animated.View
        exiting={FadeOut}
        style={{ backgroundColor: bg }}
        className="flex-1 justify-center items-center">
        {(() => {
            setTimeout(() => {
                setInitializing(false);
            }, 10000);
            return <></>
        })()}
        <Image source={require('@/assets/images/icon.png')}
            className='h-40 rounded-3xl w-40 mt-[30vh]'
        />
        <View className="h-[40vh]" />
        <TTextLight className='text-sm mt-2 font-semibold'>Movee • by Abundiko</TTextLight>
        <TTextLighter className='text-sm mt-2'>version {APP_VERSION}</TTextLighter>

    </Animated.View>;

    return children;
}