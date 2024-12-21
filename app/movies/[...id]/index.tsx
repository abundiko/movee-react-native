import { fetchSingleMovie } from "@/actions";
import {
  MovieScreenActionButtons,
  MovieScreenDetails,
  MovieScreenGenres,
  MovieScreenHeader,
  MovieScreenReferences,
  MovieScreenSeriesDetails,
  MovieScreenTabs,
} from "@/components/movie";
import { TBgView } from "@/components/Themed";
import { cls } from "@/constants";
import { useGlobalStore } from "@/state";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

export default function SingleMovie() {
  const { id: _id } = useLocalSearchParams();
  const id = useMemo(() => [_id].flat().join("/"), [_id]);
  const [tabIndex, setTabIndex] = useState(0);
  const mv = useGlobalStore((s) => s.movie);
  const movie = useMemo(() => mv!, []);
  const { data } = useQuery({
    queryKey: [id, "single_movie"],
    queryFn: async () => {
      const _id = typeof id == "string" ? id : id[0];
      return await fetchSingleMovie(_id);
    },
  });

  if (!movie) return null;

  return (
    <ScrollView className={`flex-1 ${cls.bg.class}`}>
      <TBgView className="flex-1 min-h-screen">
        <MovieScreenHeader movie={movie} movieDetailed={data} />
        <MovieScreenActionButtons
          movie={movie!}
          movieDetailed={data ?? undefined}
        />
        <MovieScreenDetails movie={movie!} movieDetailed={data ?? undefined} />
        <MovieScreenGenres movieDetailed={data} />
        <View className={`${cls.bg.opacified} h-[1px] my-4`} />
        <MovieScreenReferences movieDetailed={data} />
        <View className={`${cls.bg.opacified} h-[1px] my-4`} />
        <MovieScreenSeriesDetails movieDetailed={data ?? undefined} />
        <MovieScreenTabs
          movieDetailed={data ?? undefined}
          setTabIndex={setTabIndex}
          tabIndex={tabIndex}
        />
      </TBgView>
    </ScrollView>
  );
}
