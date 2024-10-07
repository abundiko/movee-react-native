

import { isRunningInExpoGo } from 'expo'
import { Stack } from 'expo-router'
import React, { useMemo } from 'react'

export default function MoviesLayout() {

    const screens = useMemo(() => {
        let list = ["index"];
        if (!isRunningInExpoGo) list.push('stream')
        return list;
    }, [])


    return (
        <Stack screenOptions={{ headerShown: false }}>
            {
                screens.map(i => (
                    <Stack.Screen name={i} key={i} options={{
                        headerShown: false,
                        orientation: i == 'stream' ? "landscape" : undefined
                    }} />
                ))
            }
        </Stack>
    )
}