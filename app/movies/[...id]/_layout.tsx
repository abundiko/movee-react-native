

import { Stack } from 'expo-router';
import React from 'react';

export default function MoviesLayout() {

    const screens = ['index', 'stream']


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