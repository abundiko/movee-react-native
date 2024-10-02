

import { Stack } from 'expo-router'
import React from 'react'

export default function MoviesLayout() {
    
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {
                ['index', 'stream'].map(i => (
                    <Stack.Screen name={i} key={i} options={{ headerShown: false }} />
                ))
            }
        </Stack>
    )
}