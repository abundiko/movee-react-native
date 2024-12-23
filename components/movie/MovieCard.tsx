import { useGlobalStore } from "@/state";
import { Movie } from "@/types";
import { paths } from "@/utils";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { TTextLight, TTextLighter } from "../Themed";
import { LinedGradient } from "../ui";
import { Ionicons } from "@expo/vector-icons";

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
        <View className="relative rounded-lg overflow-hidden">
          <Image
            source={{
              uri: props.imgUrl,
            }}
            className="aspect-[3/4] rounded-lg w-full mb-2"
          />
          {/* {props.movieType == "Series" && (
            <Text className="bg-dark/70 text-white px-3 py-1 rounded-md absolute top-6 left-2">
              series
            </Text>
          )} */}
          {/* {!!props.rate && (
            <Text className="bg-dark/70 text-white px-3 py-1 rounded-md absolute bottom-6 right-2">
              {props.rate}
            </Text>
          )} */}
          <View className="absolute bottom-0 left-0 right-0 h-12">
            <LinedGradient from="#0000" to="#000">
              <View className="flex-row justify-between items-center px-2 flex-1">
                <View className="flex-row items-center" style={{ gap: 5 }}>
                  <Ionicons name="star" size={18} color="#ffc107" />
                  <Text className=" text-white">{props.rate}</Text>
                </View>
                {props.movieType == "Series" && (
                  <Text className=" text-white">series</Text>
                )}
              </View>
            </LinedGradient>
          </View>
        </View>
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
