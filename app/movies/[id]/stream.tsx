import { TBgPureView } from '@/components/Themed'
import { useGlobalStore } from '@/state'
import { useVideoPlayer, VideoView } from 'expo-video'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import * as Orientation from 'expo-screen-orientation';
import { AppButton } from '@/components/ui'
import { Ionicons } from '@expo/vector-icons'
import { useAppTheme } from '@/hooks'

export default function Stream() {
  const videoSource = useGlobalStore(s => s.stream)
  const [playing, setPlaying] = useState(false);
  const { text } = useAppTheme();

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

  // Orientation 
  useEffect(() => {
    // Lock to portrait
    Orientation.lockAsync(Orientation.OrientationLock.LANDSCAPE);

    // Cleanup function to unlock orientation when the component unmounts
    return () => {
      Orientation.lockAsync(Orientation.OrientationLock.PORTRAIT);
    };
  }, [])

  return (
    <TBgPureView style={styles.contentContainer}>
      {
        playing &&
        <AppButton
          className={"rounded-full w-16 h-16 justify-center items-center bg-light dark:bg-dark absolute top-4 left-4"}
        >
          <Ionicons size={20} color={text} name='chevron-back' />
        </AppButton>
      }
      <VideoView
        ref={ref}
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />

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
  },
});