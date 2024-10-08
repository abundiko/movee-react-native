import { fetchSingleMovie } from '@/actions';
import { FormButton } from '@/components/formComponents';
import { HomeMovies } from '@/components/home';
import { AppScaffold } from '@/components/layout';
import { CountryFlag, ReferenceButton } from '@/components/movie';
import { TListView, TTextLight, TTextLighter } from '@/components/Themed';
import { AppButton } from '@/components/ui';
import { cls } from '@/constants';
import { useAppTheme, useStorageSaved } from '@/hooks';
import { useGlobalStore } from '@/state';
import { MovieDetailed } from '@/types';
import { paths } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { memo, useMemo, useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, View } from 'react-native';
import { WebView } from 'react-native-webview';


export default function SingleMovie() {
    const { id: _id } = useLocalSearchParams();
    const id = useMemo(() => [_id].flat().join('/'), [_id]);
    const { text } = useAppTheme();
    const { storedsaved, updatesaved } = useStorageSaved();
    const [tabIndex, setTabIndex] = useState(0);
    const [downloadVideo, setDownloadVideo] = useState(false);
    const [downloadSub, setDownloadSub] = useState(false);
    const { width } = Dimensions.get('window')

    const setStream = useGlobalStore(s => s.setStream);
    const mv = useGlobalStore(s => s.movie);
    const movie = useMemo(() => mv!, []);
    const country = useMemo(() => movie?.country, []);
    const saved = useMemo(() => storedsaved ? !!(storedsaved).find(i => i.id == movie.id) : false, [storedsaved]);
    const { data, isLoading } = useQuery({
        queryKey: [id, "single_movie"],
        queryFn: async () => {
            const _id = typeof id == 'string' ? id : id[0];
            return await fetchSingleMovie(_id);
        }
    });

    if (!movie || !storedsaved) return null;
    // console.log({datas:data});


    return (
        <AppScaffold
            title={data?.title ?? movie?.title}
            refreshing={isLoading}
            icons={
                <View className='flex-row'>
                    {data && <AppButton
                        onPress={() => {
                            setStream(data?.download.video + "?redirect=true");
                            router.push(paths.singleMovieStream(movie.id))
                        }}
                    ><Ionicons name={"play"} size={24} color={text} />
                    </AppButton>}
                    <View className='mx-2' />
                    <AppButton
                        onPress={() => {
                            if (saved) updatesaved([...storedsaved.filter(i => i.id != movie.id)]);
                            else updatesaved([...storedsaved, movie]);
                        }}
                    ><Ionicons name={saved ? 'heart' : 'heart-outline'} size={24} color={saved ? 'red' : text} />
                    </AppButton>
                </View>
                // <></>
            }
            underBody={
                width <= 768 && <DownloadButtons
                    downloadSub={downloadSub}
                    setDownloadSub={setDownloadSub}
                    downloadVideo={downloadVideo}
                    setDownloadVideo={setDownloadVideo}
                    data={data}
                />
            }
        >
            {downloadSub && <WebView
                className='h-0 bg-red-300'
                onError={() => {
                    setDownloadSub(false);
                }}
                onFileDownload={() => {
                    console.log('downloading');
                }}
                downloadingMessage={`Downloading subtitle for ${data?.title}`}
                source={{
                    uri: data!.download.subtitle + "?redirect=true", headers: {
                        'Content-Type': "text/srt"
                    }
                }} />}
            {downloadVideo && <WebView

                className='h-0 bg-red-300'
                onError={() => {
                    setDownloadVideo(false);
                }}
                onFileDownload={() => {
                    console.log('downloading');
                }}
                downloadingMessage={`Downloading ${data?.title}`}
                source={{
                    uri: data!.download.video + "?redirect=true", headers: {
                        'Content-Type': "video/x-matroska"
                    }
                }} />}
            <View className={`${width > 768 ? "flex-row p-2 gap-x-4" : 'flex-col'}`}>
                <View className={`${width > 768 ? "flex-1" : ''}`}>
                    <MovieImage data={data} movie={movie} />
                    {width > 768 &&
                        <>
                            <View className='py-2' />
                            <DownloadButtons
                                downloadSub={downloadSub}
                                setDownloadSub={setDownloadSub}
                                downloadVideo={downloadVideo}
                                setDownloadVideo={setDownloadVideo}
                                data={data}
                            />
                        </>
                    }
                </View>
                <View className={`${width > 768 ? "flex-1" : ''}`}>
                    <MovieDetails movie={movie} country={country} data={data} />
                    {!!data && <>
                        <TListView>
                            <TTextLighter>
                                {data.desc}
                            </TTextLighter>
                        </TListView>
                        <GenreList data={data} />
                        <View className={`${cls.bg.opacified} h-[1px] my-4`} />
                        <ReferenceList data={data} />
                        <View className={`${cls.bg.opacified} h-[1px] my-4`} />
                    </>}
                </View>
            </View>
            {!!data && <>
                <SeasonsView data={data} />
                <View className={`${cls.bg.opacified} h-[1px] my-4`} />
                <TabNavigation tabIndex={tabIndex} setTabIndex={setTabIndex} data={data} />
            </>}
        </AppScaffold>
    );
}

interface DownloadButtonsProps {
    downloadSub: boolean;
    setDownloadSub: React.Dispatch<React.SetStateAction<boolean>>;
    downloadVideo: boolean;
    setDownloadVideo: React.Dispatch<React.SetStateAction<boolean>>;
    data: any; // Replace 'any' with the actual type if available
}

const DownloadButtons: React.FC<DownloadButtonsProps> = ({ downloadSub, setDownloadSub, downloadVideo, setDownloadVideo, data }) => (
    <View className="mx-4 my-2 flex-row">
        <View className="flex-1">
            <FormButton
                loading={downloadSub}
                onPress={() => {
                    setDownloadSub(true);
                    setTimeout(() => {
                        setDownloadSub(false);
                    }, 10 * 1000);
                }}
                className={cls.btn.primaryAltClass}>
                <TTextLight>Download Subtitle</TTextLight>
            </FormButton>
        </View>
        <View className='p-2' />
        <View className="flex-1">
            <FormButton
                loading={downloadVideo}
                onPress={() => {
                    setDownloadVideo(true);
                    setTimeout(() => {
                        setDownloadVideo(false);
                    }, 10 * 1000);
                }}
                className={cls.btn.primaryClass}>
                <TTextLight className='text-white dark:text-light'>Download Video</TTextLight>
            </FormButton>
        </View>
    </View>
);

interface MovieImageProps {
    data: any; // Replace 'any' with the actual type if available
    movie: any; // Replace 'any' with the actual type if available
}

const MovieImage: React.FC<MovieImageProps> = memo(({ data, movie }) => {


    return (
        <View className='relative w-full' style={{ aspectRatio: 5 / 3 }}>
            <Image source={{
                uri: data?.imgUrl ?? movie?.imgUrl,
            }}
                className='h-full rounded-lg w-full mb-2'
            />
            <View className='absolute p-4 top-0 left-0 w-full h-full bg-light/80 dark:bg-dark/80'>
                {!!data && (
                    Platform.OS == 'web' ?
                        <iframe 
                        style={{
                            height: 300
                        }}
                        className="w-screen h-[300px]" src={`https://www.youtube.com/embed/${data.trailer}`} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                        :
                        <WebView
                            allowsFullscreenVideo
                            source={{ uri: `https://movee.vercel.app/iframe/${data?.trailer}` }}
                        />)}
            </View>
        </View>
    )
});

interface MovieDetailsProps {
    movie: any; // Replace 'any' with the actual type if available
    country: string | undefined;
    data: any; // Replace 'any' with the actual type if available
}

const MovieDetails: React.FC<MovieDetailsProps> = memo(({ movie, country, data }) => {


    return (<View className="p-4 flex-row flex-wrap items-center">
        <TTextLight className={`rounded-lg p-2 mr-2 ${cls.bg.opacified}`}>
            Posted: {movie?.postedAt}
        </TTextLight>
        <TTextLight className={`rounded-lg p-2 mr-2 ${cls.bg.opacified}`}>
            {movie?.duration.replace(/\s{2,}/g, ' ')}
        </TTextLight>
        <TTextLight className={`rounded-lg p-2 mr-2 ${cls.bg.opacified}`}>
            Rating: {movie?.rate}
        </TTextLight>
        {country && <CountryFlag country={country} />}
    </View>
    )
});

interface GenreListProps {
    data: any; // Replace 'any' with the actual type if available
}

const GenreList: React.FC<GenreListProps> = memo(({ data }) => (
    <View className='mx-4'>
        <TTextLighter className='font-semibold text-sm mb-3'>Genre</TTextLighter>
        <View className='flex-row'>
            {data.details.genre?.map((gen: any, i: number) => ( // Replace 'any' with the actual type if available
                <TTextLight key={i} className={`rounded-lg p-2 mr-2 ${cls.bg.opacified}`}>
                    {gen.name}
                </TTextLight>
            ))}
        </View>
    </View>
));

interface ReferenceListProps {
    data: any; // Replace 'any' with the actual type if available
}

const ReferenceList: React.FC<ReferenceListProps> = memo(({ data }) => (
    <View className='mx-4'>
        <TTextLighter className='font-semibold text-sm mb-3'>References</TTextLighter>
        <View className='flex-row flex-wrap'>
            {data.details.references?.map((ref: any, i: number) => ( // Replace 'any' with the actual type if available
                <ReferenceButton key={i} {...ref} />
            ))}
        </View>
    </View>
));

interface TabNavigationProps {
    tabIndex: number;
    setTabIndex: React.Dispatch<React.SetStateAction<number>>;
    data: any; // Replace 'any' with the actual type if available
}

const TabNavigation: React.FC<TabNavigationProps> = memo(({ tabIndex, setTabIndex, data }) => (
    <View className='my-4'>
        <View className='mb-3 flex-row'>
            {["Related", "Cast"].map((item, i) => {
                const isActive = tabIndex === i;
                return <TTextLighter key={i}
                    onPress={() => setTabIndex(i)}
                    className={`font-semibold px-4 py-2 border-b ${isActive ? "text-primary border-primary" : 'border-transparent'}`}>{item}</TTextLighter>
            })}
        </View>
        {tabIndex === 0 ? <HomeMovies movies={data.related} />
            : tabIndex === 1 ? <View className='flex-row flex-wrap p-4'>
                {data.details.cast?.map((cast: any, i: number) => ( // Replace 'any' with the actual type if available
                    <TTextLight key={i} className={`rounded-lg ${cls.bg.opacified} p-2 mr-2 mb-2`}>
                        {cast.name}
                    </TTextLight>
                ))}
            </View>
                : null}
    </View>
));

const SeasonsView: React.FC<{ data: MovieDetailed }> = memo(({ data }) => {
    const { movie, setMovie } = useGlobalStore();

    if (!data.seriesDetails) return;
    const currentSeason = data.seriesDetails.seasons.find(i => i.isCurrent);
    return (
        <View className='my-0'>
            <View className='mb-3'>
                <ScrollView
                    horizontal
                >
                    <View className="flex-row mb-2">
                        {data.seriesDetails.seasons.map((item, i) => {
                            return <TTextLighter key={i}
                                onPress={() => {
                                    if (item.urlId) {
                                        setMovie({ ...movie!, duration: `S${item.num}E01`, postedAt: data.meta.posted, rate: data.meta.rate })
                                        router.replace(paths.singleMovie(item.urlId) as any)
                                    }
                                }}
                                className={`font-semibold px-4 py-2 border-b ${item.isCurrent ? "text-primary border-primary" : 'border-transparent'}`}>Season {item.num}</TTextLighter>
                        })}
                    </View>
                </ScrollView>
                <View className="mx-4 flex-row flex-wrap">
                    {data.seriesDetails.episodes.map((item, i) => {
                        return <TTextLight key={i}
                            onPress={() => {
                                if (item.urlId) {
                                    setMovie({ ...movie!, duration: `S${currentSeason?.num}E${item.num}`, postedAt: data.meta.posted, rate: data.meta.rate })
                                    router.replace(paths.singleMovie(item.urlId) as any)
                                }
                            }}
                            className={`rounded-lg  p-2 mr-2 mb-2 ${item.isCurrent ? 'text-primary bg-white dark:bg-black' : cls.bg.opacified}`}>
                            Ep. {item.num}
                        </TTextLight>
                    })}
                </View>
            </View>

        </View>
    );
})

