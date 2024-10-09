import { AppScaffold } from '@/components/layout'
import { TText, TTextLight, TTextLighter } from '@/components/Themed'
import { AppButton } from '@/components/ui'
import { APP_VERSION, isRunningInExpoGo } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, Linking, View } from 'react-native'

export default function AboutScreen() {
    return (
        <AppScaffold title="About Movee"
            noScroll
        >
            <View className='items-center flex-1'>
                <Image source={require('@/assets/images/icon.png')}
                    className='h-40 rounded-3xl w-40 mt-[10vh]'
                />
                <TText className='text-3xl mt-4'>Movee</TText>
                <TTextLight className='text-sm mt-3 font-semibold'>Designed and developed by abundiko</TTextLight>
                <TTextLighter className='text-sm mt-3'>version {APP_VERSION} {isRunningInExpoGo}</TTextLighter>
                <View className='flex-row mt-10 gap-x-4'>
                    <AppButton
                    className={"bg-black rounded-3xl p-4"}
                        onPress={() => Linking.openURL("https://instagram.com/abundiko")}
                    >
                        <Ionicons name='logo-instagram' size={24} color={'white'} />
                    </AppButton>
                    <AppButton
                    className={"bg-black rounded-3xl p-4"}
                        onPress={() => Linking.openURL("https://github.com/abundiko")}
                    >
                        <Ionicons name='logo-github' size={24} color={'white'} />
                    </AppButton>
                    <AppButton
                    className={"bg-black rounded-3xl p-4"}
                        onPress={() => Linking.openURL("https://x.com/abundiko")}
                    >
                        <Ionicons name='logo-twitter' size={24} color={'white'} />
                    </AppButton>
                    <AppButton
                    className={"bg-black rounded-3xl p-4"}
                        onPress={() => Linking.openURL("https://wa.me/2347031594603")}
                    >
                        <Ionicons name='logo-whatsapp' size={24} color={'white'} />
                    </AppButton>
                </View>
            </View>
        </AppScaffold>
    )
}