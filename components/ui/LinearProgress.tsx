import { useAppTheme } from '@/hooks'
import React from 'react'
import * as Progress from 'react-native-progress'

export default function LinearProgress() {
    const { primary } = useAppTheme()

    return (
        <Progress.Bar 
        // indeterminateAnimationDuration={800}
            useNativeDriver
            animationType='timing'
            indeterminate height={3} borderColor='#00000000' color={primary}
            width={null} />
    )
}