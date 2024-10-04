import { useGlobalStore } from '@/state'
import { Movie } from '@/types'
import { paths } from '@/utils'
import { router } from 'expo-router'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { TTextLight, TTextLighter } from '../Themed'

export default function MovieCard(props: Movie) {
    const setMovie = useGlobalStore(s => s.setMovie)
    // const urlQuery = useMemo(() => buildUrlQuery({ movie: JSON.stringify(props) }), []);
    // console.log({urlQuery});
    

    return (
        <TouchableOpacity
        activeOpacity={0.8}
            onPress={() => {
                setMovie(props);
                router.push((paths.singleMovie(props.id) as any))
            }}
            className='w-[45vw] py-4'>
            <>
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
            </>
        </TouchableOpacity>
    )
}