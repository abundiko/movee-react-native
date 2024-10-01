import { Movie } from '@/types'
import React from 'react'
import { Image, View } from 'react-native'
import { TTextLight, TTextLighter } from '../Themed'
import { AppButton } from '../ui'
import { router } from 'expo-router'
import { paths } from '@/utils'
import { useGlobalStore } from '@/state'

export default function MovieCard(props: Movie) {
    const setMovie = useGlobalStore(s => s.setMovie)

    return (
        <AppButton
            onPress={() => {
                setMovie(props);
                router.push(paths.singleMovie(props.id))
            }}
            className='w-[45vw] py-4'>
            <Image source={{
                uri: props.imgUrl,
            }}
                className='aspect-[3/4] rounded-lg w-full mb-2'
            />
            <TTextLight className='text-lg line-clamp-2'>{props.title}</TTextLight>
            <View className="flex-row justify-between items-center mt-1">
                <TTextLighter>{props.postedAt}</TTextLighter>
                <TTextLighter>{props.year}</TTextLighter>
            </View>
        </AppButton>
    )
}