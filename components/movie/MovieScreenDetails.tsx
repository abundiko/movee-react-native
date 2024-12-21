import { cls } from "@/constants";
import { Movie, MovieDetailed } from "@/types";
import React from "react";
import { View } from "react-native";
import { TListView, TTextLight, TTextLighter } from "../Themed";
import CountryFlag from "./CountryFlag";

export default function MovieScreenDetails({
  movie,
  movieDetailed,
}: {
  movie: Movie;
  movieDetailed?: MovieDetailed | null;
}) {
  return (
    <TListView className="mt-4">
      {movieDetailed ? (
        <TTextLighter className="mb-6">{movieDetailed.desc}</TTextLighter>
      ) : (
        <View>
          <TListView className="w-[90%] mx-0" />
          <TListView className="w-[50%] mx-0" />
        </View>
      )}
      <View className="flex-row flex-wrap items-center" style={{gap: 10}}>
        <TTextLight className={`rounded-lg p-2 ${cls.bg.pureClass}`}>
          Posted: {`${movie?.postedAt}`.replace(/\s{2,}/g, " ")}
        </TTextLight>
        <TTextLight className={`rounded-lg p-2 ${cls.bg.pureClass}`}>
          {movie?.duration.replace(/\s{2,}/g, " ")}
        </TTextLight>
        <TTextLight className={`rounded-lg p-2 ${cls.bg.pureClass}`}>
          Rating: {`${movie?.rate}`.replace(/\s{2,}/g, " ")}
        </TTextLight>
        {movie.country && <CountryFlag country={movie.country} />}
      </View>
    </TListView>
  );
}
