import React from 'react'
import { View } from 'react-native'
import { TTextLight } from '../Themed'


function Info({ message }: { message: string }) {
    return (
        <View className="rounded-lg p-3 bg-blue-300 my-4">
            <TTextLight className='text-sm font-light text-blue-950'>
                {message}
            </TTextLight>
        </View>
    )
}
function Danger({ message }: { message: string }) {
    return (
        <View className="rounded-lg p-3 bg-red-300 my-4">
            <TTextLight className='text-sm font-light text-red-950'>
                {message}
            </TTextLight>
        </View>
    )
}
function Warning({ message }: { message: string }) {
    return (
        <View className="rounded-lg p-3 bg-yellow-100 my-4">
            <TTextLight className='text-sm font-light text-yellow-950'>
                {message}
            </TTextLight>
        </View>
    )
}
function Success({ message }: { message: string }) {
    return (
        <View className="rounded-lg p-3 bg-green-300 my-4">
            <TTextLight className='text-sm font-light text-green-950'>
                {message}
            </TTextLight>
        </View>
    )
}

export const Message = {
    Info,
    Success,
    Warning,
    Danger
}