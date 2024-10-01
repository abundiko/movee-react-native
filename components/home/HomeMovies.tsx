import { Movie } from '@/types'
import React from 'react'
import { View } from 'react-native'
import { MovieCard } from '../movie'

export default function HomeMovies({ movies }: { movies: Movie[] }) {
    return (
        <View className='px-4 flex-row flex-wrap justify-between'>
            {movies.map((movie, i) => <MovieCard {...movie} key={i} />)}
        </View>
    )
}