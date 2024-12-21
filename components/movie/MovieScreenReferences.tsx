import { MovieDetailed } from "@/types";
import React from "react";
import { View } from "react-native";
import { TTextLighter } from "../Themed";
import ReferenceButton from "./ReferenceButton";

export default function MovieScreenReferences({
  movieDetailed,
}: {
  movieDetailed?: MovieDetailed | null;
}) {
  if (movieDetailed)
    return (
      <View className="mx-4">
        <TTextLighter className="font-semibold text-sm mb-3">
          References
        </TTextLighter>
        <View className="flex-row flex-wrap">
          {movieDetailed.details.references?.map(
            (
              ref: any,
              i: number // Replace 'any' with the actual type if available
            ) => (
              <ReferenceButton key={i} {...ref} />
            )
          )}
        </View>
      </View>
    );
}
