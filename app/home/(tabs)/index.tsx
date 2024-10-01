import { fetchMovies } from "@/actions";
import { FetchMoviesParams } from "@/actions/fetchMovies";
import { AppSelect, SearchInput } from "@/components/formComponents";
import { HomeMovies } from "@/components/home";
import { AppScaffold } from "@/components/layout";
import { TTextLight } from "@/components/Themed";
import { AppButton, Message } from "@/components/ui";
import { cls, COUNTRIES, GENRES } from "@/constants";
import { year1999TillDate } from "@/functions/date";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const [args, setArgs] = useState<FetchMoviesParams>({});
  const years = useMemo(() => year1999TillDate(), []);
  const { data, isLoading, isError, isRefetching, refetch } = useQuery({
    queryKey: [...(Object.values(args))],
    queryFn: async () => {
      return await fetchMovies(args)
    }
  })

  return (
    <AppScaffold
      appbarHeight={40}
      title={
        "Movee"
      }
      hideBack
      onRefresh={refetch}
      refreshing={isLoading || isRefetching}
      underAppbar={
        <View className="flex-row px-4">
          <SearchInput placeholder="Search movies"
            onEndEditing={(e) => {
              setArgs(old => ({ ...old, q: e.nativeEvent.text }))
            }}
          />
        </View>
      }
    >
      <View className="flex-row px-4">
        <AppSelect
          label="Select Year"
          options={years}
          value={years[0]}
          snapPoints={['70%', "70%"]}
          scrollable
          onChange={(value) => setArgs(old => ({ ...old, "year[]": value.value }))}
          renderButton={(value) => (<AppButton className={cls.btn.selectClass}>
            <TTextLight>{value.title}</TTextLight>
          </AppButton>)}
        />
        <View className="px-1" />
        <AppSelect
          label="Select Genre"
          options={GENRES}
          value={GENRES[0]}
          snapPoints={['70%', "70%"]}
          scrollable
          onChange={(value) => setArgs(old => ({ ...old, "genre[]": value.value }))}
          renderButton={(value) => (<AppButton className={cls.btn.selectClass}>
            <TTextLight>{value.title}</TTextLight>
          </AppButton>)}
        />
        <View className="px-1" />
        <AppSelect
          label="Select Country"
          options={COUNTRIES}
          value={COUNTRIES[0]}
          snapPoints={['70%', "70%"]}
          scrollable
          onChange={(value) => setArgs(old => ({ ...old, "country[]": value.value }))}
          renderButton={(value) => (<AppButton className={cls.btn.selectClass}>
            <TTextLight>{value.title}</TTextLight>
          </AppButton>)}
        />
      </View>
      {
        isLoading || isRefetching ? <></>
          : isError || !data ? <Message.Danger message="Connection Error!" />
            : <HomeMovies movies={data} />
      }
    </AppScaffold>
  );
}
