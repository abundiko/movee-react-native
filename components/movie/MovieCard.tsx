import { useGlobalStore } from "@/state";
import { Movie } from "@/types";
import { paths } from "@/utils";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { TTextLight, TTextLighter } from "../Themed";

export default function MovieCard(
  props: Movie & {
    small?: boolean;
  }
) {
  const setMovie = useGlobalStore((s) => s.setMovie);
  // const urlQuery = useMemo(() => buildUrlQuery({ movie: JSON.stringify(props) }), []);
  // console.log({urlQuery});

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        setMovie(props);
        router.push(paths.singleMovie(props.id) as any);
      }}
      className={`${
        props.small ? "w-[150px]" : "w-[45vw] sm:w-[200] lg:w-[220] "
      } py-4 relative`}
    >
      <>
        <Image
          source={{
            uri: props.imgUrl,
          }}
          className="aspect-[3/4] rounded-lg w-full mb-2"
        />
        {props.movieType == "Series" && (
          <Text className="bg-dark/70 text-white px-3 py-1 rounded-md absolute top-6 left-2">
            series
          </Text>
        )}
        <TTextLight className={`${props.small ? "text-sm" : "text-lg"}`}>
          {props.title}
        </TTextLight>
        <View className="flex-row justify-between items-center mt-1">
          <TTextLighter>{props.postedAt}</TTextLighter>
          <TTextLighter>{props.year}</TTextLighter>
        </View>
      </>
    </TouchableOpacity>
  );
}
