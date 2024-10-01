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
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, View } from 'react-native';
import { WebView, } from 'react-native-webview';

export default function SingleMovie() {
    const { id } = useLocalSearchParams();
    const { text } = useAppTheme()
    const { storedsaved, updatesaved } = useStorageSaved();
    const [tabIndex, setTabIndex] = useState(0);
    const [downloadVideo, setDownloadVideo] = useState(false);
    const [downloadSub, setDownloadSub] = useState(false);
    const mv = useGlobalStore(s => s.movie);
    const movie = useMemo(()=>mv, []);
    const country = useMemo(()=>movie?.country, []);
    const { data, isLoading } = useQuery({
        queryKey: [id, "single_movie"],
        queryFn: async () => {
            const _id = typeof id == 'string' ? id : id[0];
            return await fetchSingleMovie(_id)
        }
    })

    if (!movie || !storedsaved) return;
    return (
        <AppScaffold
            title={data?.title ?? movie?.title}
            refreshing={isLoading}
            icons={
                <AppButton
                    onPress={() => {
                        if (!!storedsaved.find(i => i.id == movie.id))
                            updatesaved([...storedsaved.filter(i => i.id != movie.id)])
                        else
                            updatesaved([...storedsaved, movie])
                    }
                    }
                >
                    {
                        (() => {
                            const saved = !!storedsaved.find(i => i.id == movie.id);
                            return <Ionicons name={saved ? 'heart' : 'heart-outline'} size={24} color={saved ? 'red' : text} />
                        })()
                    }
                </AppButton>
            }
            underBody={
                !!data && <View className="mx-4 my-2 flex-row">
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
                    <View className='w-2' />
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
            }
        >
            {downloadSub && <WebView
                className='h-0 bg-red-300'
                onError={() => {
                    setDownloadSub(false);
                }}
                onFileDownload={() => {
                    console.log('downloading')
                }}
                downloadingMessage={`Downloading subtitle for ${data?.title}`}
                source={{ uri: data!.download.subtitle + "?redirect=true" }} />}
            {downloadVideo && <WebView
                className='h-0 bg-red-300'
                onError={() => {
                    setDownloadVideo(false);
                }}
                onFileDownload={() => {
                    console.log('downloading')
                }}
                downloadingMessage={`Downloading ${data?.title}`}
                source={{ uri: data!.download.video + "?redirect=true" }} />}
            <View className='relative aspect-[5/3]'>
                <Image source={{
                    uri: data?.imgUrl ?? movie?.imgUrl,
                }}
                    className='h-full rounded-lg w-full mb-2'
                />
                <View className='absolute p-4 top-0 left-0 w-full h-full bg-light/80 dark:bg-dark/80'>
                    {!!data && <WebView
                        allowsFullscreenVideo
                        source={{ uri: `https://movee.vercel.app/iframe/${data?.trailer}` }}
                    />}
                </View>
            </View>
            <View className="p-4 flex-row flex-wrap items-center">
                <TTextLight className="rounded-lg bg-neutral-500/10 p-2 mr-2">
                    Posted: {data?.meta.posted ?? movie?.postedAt}
                </TTextLight>
                <TTextLight className="rounded-lg bg-neutral-500/10 p-2 mr-2">
                    {data?.meta.duration ?? movie?.duration.replace(/\s{2,}/g, ' ')}
                </TTextLight>
                <TTextLight className="rounded-lg bg-neutral-500/10 p-2 mr-2">
                    Rating: {data?.meta.rate ?? movie?.rate}
                </TTextLight>

                {country && <CountryFlag country={country} />}
            </View>
            {
                !!data && <>
                    <TListView>
                        <TTextLighter>
                            {data.desc}
                        </TTextLighter>
                    </TListView>
                    <View className='mx-4'>
                        <TTextLighter className='font-semibold text-sm mb-3'>Genre</TTextLighter>
                        <View className='flex-row'>
                            {data.details.genre?.map((gen, i) => (
                                <TTextLight key={i} className="rounded-lg bg-neutral-500/10 p-2 mr-2">
                                    {gen.name}
                                </TTextLight>
                            ))}
                        </View>
                    </View>
                    <View className="bg-neutral-600/50 h-[1px] my-4" />

                    <View className='mx-4'>
                        <TTextLighter className='font-semibold text-sm mb-3'>References</TTextLighter>
                        <View className='flex-row flex-wrap'>
                            {data.details.references?.map((ref, i) => (
                                <ReferenceButton key={i} {...ref} />
                            ))}
                        </View>
                    </View>
                    <View className="bg-neutral-600/50 h-[1px] my-4" />

                    <View className='my-4'>
                        <View className='mb-3 flex-row'>
                            {
                                ["Related", "Cast"].map((item, i) => {
                                    const isActive = tabIndex === i;
                                    return <TTextLighter key={i}
                                        onPress={() => setTabIndex(i)}
                                        className={`font-semibold px-4 py-2 border-b-2 ${isActive ? "text-primary border-primary" : 'border-transparent'}`}>{item}</TTextLighter>
                                })
                            }
                        </View>
                        {
                            tabIndex == 0 ? <HomeMovies movies={data.related} />
                                : tabIndex == 1 ? <View className='flex-row flex-wrap p-4'>
                                    {data.details.cast?.map((cast, i) => (
                                        <TTextLight key={i} className="rounded-lg bg-neutral-500/10 p-2 mr-2 mb-2">
                                            {cast.name}
                                        </TTextLight>
                                    ))}
                                </View>
                                    : null
                        }

                    </View>


                </>
            }
        </AppScaffold>
    )
}