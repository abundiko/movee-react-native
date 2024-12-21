import { fetchSuggestions } from "@/actions/fetchSuggestions";
import { AppScaffold } from "@/components/layout";
import { MovieCard } from "@/components/movie";
import { TTextLight, TTextLighter } from "@/components/Themed";
import { AppButton } from "@/components/ui";
import { cls } from "@/constants";
import { MovieSuggestion } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";

export default function HomeScreen() {
  const { data, isLoading, isError, isRefetching, refetch } = useQuery({
    queryKey: ["suggestions"],
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    queryFn: async () => {
      const res = await fetchSuggestions();
      if (!res) throw new Error("Connection Error");
      return res;
    },
  });

  return (
    <AppScaffold
      title={"Movee"}
      hideBack
      refreshing={isLoading || isRefetching}
      onRefresh={() => refetch()}
    >
      <View className="flex-1">
        {isError || (!data && !isLoading) ? (
          <View className=" justify-center items-center h-[80vh]">
            <TTextLighter className="text-3xl p-4">
            Poor internet connection.
          </TTextLighter>
          <AppButton
          onPress={()=>refetch()}
          className={`${cls.btn.primaryAltClass} py-2`}
          >
            <TTextLight>retry</TTextLight>
          </AppButton>
          </View>
        ) : !!data ? (
          <SuggestionMovies suggestions={data} />
        ) : !isLoading ? (
          <TTextLighter className="text-3xl p-4">
            No suggestions available
          </TTextLighter>
        ) : (
          <SuggestionsSkeleton />
        )}
      </View>
    </AppScaffold>
  );
}

function SuggestionMovies({ suggestions }: { suggestions: MovieSuggestion[] }) {
  return (
    <View>
      {suggestions.map((suggestion, index) => (
        <View key={index} className="pb-2">
          <TTextLight className="text-lg pl-4">{suggestion.title}</TTextLight>
          <FlatList
            data={suggestion.movies}
            renderItem={({ item }) => (
              <View className="px-2">
                <MovieCard {...item} small />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
          />
        </View>
      ))}
    </View>
  );
}

function SuggestionsSkeleton() {
  return (
    <View>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} className="mb-4">
          <View className="mx-2 bg-black/10 dark:bg-white/10 rounded-xl w-40 h-4 mb-4" />
          <View key={item} className="mb-4 flex-row overflow-hidden">
            {[1, 2, 3, 4].map((item) => (
              <View
                key={item}
                className="mx-2 bg-black/10 dark:bg-white/10 aspect-[4/5] rounded-xl w-[150px]"
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
