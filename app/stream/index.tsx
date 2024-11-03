import { TBgPureView } from '@/components/Themed'
import { AppButton } from '@/components/ui'
import { useAppTheme, useStoredMovies } from '@/hooks'
import { useGlobalStore } from '@/state'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'

export default function Stream() {
  const videoSource = useGlobalStore(s => s.stream)
  const [playing, setPlaying] = useState(false);
  const [hasSeeked, setHasSeeked] = useState(false);
  const { text } = useAppTheme();
  const { setData: updateStoredMovies, data: storedMovies } = useStoredMovies()

  const ref = useRef<VideoView>(null);
  const player = useVideoPlayer(videoSource, player => {
    player.play();
  });

  // play state change
  useEffect(() => {
    const subscription = player.addListener('playingChange', isPlaying => {
      setPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  useEffect(() => {
    if (!playing) return;
    const int = setInterval(() => {
      const currentTime = player.currentTime;
      updateStoredMovies(v => ({ ...v, [videoSource]: currentTime }))
    }, 5000)

    return clearInterval(int);
  }, [playing]);

  useEffect(() => {
    if (!playing || hasSeeked) return;

    player.seekBy(storedMovies ? storedMovies[videoSource] : 0)
    setHasSeeked(true);

  }, [playing, hasSeeked]);


  return (
    <TBgPureView style={styles.contentContainer}>

      <VideoView
        ref={ref}
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        className=' w-full h-full top-4 left-0 absolute m-auto justify-center items-center'
      />
      {
        !playing &&
        <AppButton
          onPress={() => router.back()}
          className={"rounded-full w-12 h-12 justify-center items-center bg-light/50 dark:bg-dark/50 absolute top-4 left-4"}
        >
          <Ionicons size={20} color={text} name='chevron-back' />
        </AppButton>
      }
    </TBgPureView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: "relative"
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
});