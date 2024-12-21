import { cls } from "@/constants";
import { MovieDetailed } from "@/types";
import React from "react";
import { View } from "react-native";
import { TTextLight, TTextLighter } from "../Themed";
import { HomeMovies } from "../home";

export default function MovieScreenTabs({
  movieDetailed: data,
  tabIndex,
  setTabIndex,
}: {
  movieDetailed?: MovieDetailed;
  tabIndex: number;
  setTabIndex: (index: number) => void;
}) {
  if (data)
    return (
      <View className="my-4">
        <View className="mb-3 flex-row">
          {["Related", "Cast"].map((item, i) => {
            const isActive = tabIndex === i;
            return (
              <TTextLighter
                key={i}
                onPress={() => setTabIndex(i)}
                className={`font-semibold px-4 py-2 border-b ${
                  isActive
                    ? "text-primary border-primary"
                    : "border-transparent"
                }`}
              >
                {item}
              </TTextLighter>
            );
          })}
        </View>
        {tabIndex === 0 ? (
          <HomeMovies movies={data.related} />
        ) : tabIndex === 1 ? (
          <View className="flex-row flex-wrap p-4">
            {data.details.cast?.map(
              (
                cast: any,
                i: number // Replace 'any' with the actual type if available
              ) => (
                <TTextLight
                  key={i}
                  className={`rounded-lg ${cls.bg.opacified} p-2 mr-2 mb-2`}
                >
                  {cast.name}
                </TTextLight>
              )
            )}
          </View>
        ) : null}
      </View>
    );
}
