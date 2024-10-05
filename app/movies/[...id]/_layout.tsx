

import { Stack } from 'expo-router'
import React from 'react'

export default function MoviesLayout() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {
                ['index'].map(i => (
                    <Stack.Screen name={i} key={i} options={{
                        headerShown: false,
                        orientation: i == 'stream' ? "landscape" : undefined
                    }} />
                ))
            }
        </Stack>
    )
}