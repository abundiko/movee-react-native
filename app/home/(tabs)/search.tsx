import { FetchMoviesParams } from "@/actions/fetchMovies";
import { SearchInput } from "@/components/formComponents";
import { AppScaffold } from "@/components/layout";
import { TTextLight } from "@/components/Themed";
import { AppButton } from "@/components/ui";
import { cls, GENRES } from "@/constants";
import { buildUrlQuery } from "@/functions/helpers";
import { paths } from "@/utils";
import { router } from "expo-router";
import { View } from "react-native";

export function find(params: Partial<FetchMoviesParams>) {
  router.push((paths.find + buildUrlQuery(params)) as any);
}

export default function SearchScreen() {
  return (
    <AppScaffold
      // noScroll
      appbarHeight={40}
      title={"Search"}
      hideBack
      underAppbar={
        <View className="flex-row px-4">
          <SearchInput
            placeholder="Search movies"
            onEndEditing={(e) => {
              find({ q: e.nativeEvent.text });
            }}
          />
        </View>
      }
    >
      <View className="flex-wrap flex-row p-3 justify-evenly">
        {GENRES.map((genre) => (
          <AppButton
            onPress={() => find({ "genre[]": genre.value })}
            key={genre.value}
            className={`${cls.bg.opacified} rounded-xl p-4 w-[30%] mb-2`}
          >
            <TTextLight className="text-sm">{genre.title}</TTextLight>
          </AppButton>
        ))}
      </View>
    </AppScaffold>
  );
}
