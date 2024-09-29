import { View } from 'react-native'
import React, { ReactNode } from 'react'
import { TBgGreyView, TTextLight, TTextLighter } from '../Themed';

export type InfoLineProps = {
    title: ReactNode;
    value: ReactNode;
}

export default function InfoLine({ title, value }: InfoLineProps) {
    return (
        <View className='flex-row items-end my-2'>
            {
                typeof title === 'string' ? <TTextLighter>{title}</TTextLighter> : title
            }
            <TBgGreyView className='flex-1 h-[1px] mx-2' />
            {
                typeof value === 'string' ? <TTextLight>{value}</TTextLight> : value
            }
        </View>
    )
}