import { cls } from "@/constants";
import { MovieDetailed } from "@/types";
import React from "react";
import { View } from "react-native";
import { TTextLight, TTextLighter } from "../Themed";
import { find } from "@/app/home/(tabs)/search";

export default function MovieScreenGenres({
  movieDetailed,
}: {
  movieDetailed?: MovieDetailed | null;
}) {
  if (movieDetailed)
    return (
      <View className="mx-4">
        <TTextLighter className="font-semibold text-sm mb-3">
          Genre
        </TTextLighter>
        <View className="flex-row">
          {movieDetailed.details.genre?.map(
            (
              gen,
              i: number // Replace 'any' with the actual type if available
            ) => (
              <TTextLight
                key={i}
                onPress={() => {
                  find({ "genre[]": gen.name });
                }}
                className={`rounded-lg p-2 mr-2 ${cls.bg.opacified}`}
              >
                {gen.name}
              </TTextLight>
            )
          )}
        </View>
      </View>
    );
}
