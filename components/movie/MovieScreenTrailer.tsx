import { MovieDetailed } from "@/types";
import React from "react";
import { Platform } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import WebView from "react-native-webview";

export default function MovieScreenTrailer({ data }: { data: MovieDetailed }) {
  return (
    <Animated.View
      entering={FadeInDown}
      className=" w-full aspect-[5/3] bg-light/80 dark:bg-dark/80 rounded-xl overflow-hidden"
    >
      {!!data &&
        (Platform.OS == "web" ? (
          <iframe
            style={{
              height: 300,
            }}
            className="w-screen h-[300px]"
            src={`https://www.youtube.com/embed/${data.trailer}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        ) : (
          <WebView
            allowsFullscreenVideo
            source={{ uri: `https://movee.vercel.app/iframe/${data?.trailer}` }}
          />
        ))}
    </Animated.View>
  );
}
