import { cls } from "@/constants";
import { useGlobalStore } from "@/state";
import { MovieDetailed } from "@/types";
import { paths } from "@/utils";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { TTextLight, TTextLighter } from "../Themed";

export default function MovieScreenSeriesDetails({
  movieDetailed: data,
}: {
  movieDetailed?: MovieDetailed;
}) {
  const { movie, setMovie } = useGlobalStore();

  if (!data || !data.seriesDetails) return;
  const currentSeason = data.seriesDetails.seasons.find((i) => i.isCurrent);
  return (
    <>
      <View className="my-0">
        <View className="mb-3">
          <ScrollView horizontal>
            <View className={`mb-3 flex-row rounded-md ${cls.bg.opacified} mx-5 p-1`}>
              {data.seriesDetails.seasons.map((item, i) => {
                return (
                  <TTextLighter
                    key={i}
                    onPress={() => {
                      if (item.urlId) {
                        setMovie({
                          ...movie!,
                          duration: `S${item.num}E01`,
                          postedAt: data.meta.posted,
                          rate: data.meta.rate,
                        });
                        router.replace(paths.singleMovie(item.urlId) as any);
                      }
                    }}
                   className={`font-semibold px-4 py-2 rounded ${
                  item.isCurrent
                    ? "text-primary " + cls.bg.pureClass
                    : "border-transparent"
                }`}
                  >
                    Season {item.num}
                  </TTextLighter>
                );
              })}
            </View>
          </ScrollView>
          <View className="mx-4 flex-row flex-wrap">
            {data.seriesDetails.episodes.map((item, i) => {
              return (
                <TTextLight
                  key={i}
                  onPress={() => {
                    if (item.urlId) {
                      setMovie({
                        ...movie!,
                        duration: `S${currentSeason?.num}E${item.num}`,
                        postedAt: data.meta.posted,
                        rate: data.meta.rate,
                      });
                      router.replace(paths.singleMovie(item.urlId) as any);
                    }
                  }}
                  className={`rounded-lg  p-2 mr-2 mb-2 ${
                    item.isCurrent
                      ? "text-primary bg-white dark:bg-black"
                      : cls.bg.opacified
                  }`}
                >
                  Ep. {item.num}
                </TTextLight>
              );
            })}
          </View>
        </View>
      </View>

      <View className={`${cls.bg.opacified} h-[1px] my-4`} />
    </>
  );
}
