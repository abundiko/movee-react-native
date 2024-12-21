import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { Movie, MovieDetailed } from "@/types";
import { cls } from "@/constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import Color from "color";
import { TText, TTextLighter } from "../Themed";
import { LinedGradient, AppButton } from "../ui";
import { useAppTheme } from "@/hooks";
import { router } from "expo-router";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import MovieScreenTrailer from "./MovieScreenTrailer";

export default function MovieScreenHeader({
  movie,
  movieDetailed,
}: {
  movie?: Movie;
  movieDetailed?: MovieDetailed | null;
}) {
  const [showTrailer, setShowTrailer] = useState(false);
  const { text, bg } = useAppTheme();

  return (
    <View className="relative" style={{
      height: 300,
      marginBottom: showTrailer ? 40 : 0
    }}>
      <Image source={{ uri: movie?.imgUrl }} className="h-full w-full mb-2" />
      <View className="absolute top-0 left-0 h-full w-full">
        <LinedGradient
          from={Color(bg).alpha(0.7).hexa()}
          to={bg}
          subDivisions={10}
        >
          <View className=" px-5 relative">
            <View
              className="flex-row items-center mt-10 mb-4 w-full"
              style={{ gap: 10 }}
            >
              <Pressable
                className={cls.btn.iconClass}
                onPress={() => router.back()}
              >
                <Feather name="chevron-left" size={24} color={text} />
              </Pressable>
                {showTrailer && <TText className="text-xl flex-1">{movie?.title}</TText>}
            </View>
            {showTrailer && !!movieDetailed ? (
              <MovieScreenTrailer data={movieDetailed} />
            ) : (
              <Animated.View
                entering={FadeInDown}
                exiting={FadeOutUp}
                className="flex-row items-center"
              >
                <Image
                  source={{ uri: movie?.imgUrl }}
                  style={{ height: 180, width: 120 }}
                  className="bg-green-400 rounded-md"
                />
                <View
                  className="justify-center flex-1 items-start"
                  style={{ paddingLeft: 20, gap: 10 }}
                >
                  <TText
                    style={{
                      fontSize: 24,
                    }}
                    className="text-xl font-semibold"
                  >
                    {movie?.title}
                  </TText>
                  <AppButton
                    className={`${cls.btn.primaryClass} py-2 px-3`}
                    style={{ width: 140 }}
                    onPress={() => setShowTrailer(true)}
                  >
                    <Ionicons name="play" size={16} color="#fff" />
                    <TTextLighter className="text-white">
                      Watch Trailer
                    </TTextLighter>
                  </AppButton>
                </View>
              </Animated.View>
            )}
          </View>
        </LinedGradient>
      </View>
    </View>
  );
}
