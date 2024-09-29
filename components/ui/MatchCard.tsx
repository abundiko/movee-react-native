import { View, Image } from "react-native";
import React from "react";
import { MatchDetailed } from "@/shared";
import { TTextLight, TTextLighter } from "../Themed";
import { format } from "date-fns";
import AppButton from "./AppButton";
import { useGlobalStore } from "@/state";
import { router } from "expo-router";
import { paths } from "@/utils";

export default function MatchCard({ match }: { match: MatchDetailed }) {
  const { match: globMatch, setMatch } = useGlobalStore();
  const imageClass =
    " rounded-full w-12 aspect-square";

    function next() {
      setMatch(match);
      router.push(paths.newSkirm);
    }

  return (
    <AppButton 
    onPress={next}
    className="flex-row items-center justify-between br-green-500 p-4 border-b border-lightGrey/50 dark:border-darkGrey/50">
      <View className="flex-row items-center justify-end">
        <Image className={imageClass} source={{ uri: match.homeTeam.logo }} />
        <Image className={imageClass} source={{ uri: match.awayTeam.logo }} />
      </View>
      <View className="px-2 flex-grow">
        <View className="flex-row flex-wrap items-center">
          <TTextLight className="mr-2 text-center">
            {match.homeTeam.name}
          </TTextLight>
          <TTextLight className="mr-2 text-center">-</TTextLight>
          <TTextLight className="mr-2 text-center">
            {match.awayTeam.name}
          </TTextLight>
        </View>
        <View className="flex-row">
          <TTextLighter className="text-sm">
            {format(new Date(match.startDateTime), "ccc, p")}
            {"\t\t"}
          </TTextLighter>
          <TTextLighter className="text-sm opacity-60">
            {match.league.title}
          </TTextLighter>
        </View>
      </View>
    </AppButton>
  );
}
