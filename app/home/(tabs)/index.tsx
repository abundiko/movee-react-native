import { fetchMovies } from "@/actions";
import { FetchMoviesParams } from "@/actions/fetchMovies";
import { AppSelect, SearchInput } from "@/components/formComponents";
import { HomeMovies } from "@/components/home";
import { AppScaffold } from "@/components/layout";
import { TTextLight, TTextLighter } from "@/components/Themed";
import { AppButton } from "@/components/ui";
import { cls, COUNTRIES, GENRES, MOVIE_TYPES } from "@/constants";
import { year1999TillDate } from "@/functions/date";
import { Movie } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from "react-native";

export default function HomeScreen() {
  const [args, setArgs] = useState<FetchMoviesParams>({});
  const years = useMemo(() => year1999TillDate(), []);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, isLoading, isError, isRefetching, refetch } = useQuery({
    queryKey: [...(Object.values(args))],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: async () => {
      const res = await fetchMovies(args);
      if (!res) throw new Error("Connection Error")
      return res;
    }
  });

  function resetPage() {
    setArgs(old => ({ ...old, page: 1 }))
  }

  useEffect(() => {
    if (!data) return;
    console.log({ args });
    setHasMore(data.length >= 20);
    if (!args.page || args.page == 1) setMovies(data)
    else setMovies(old => [...old, ...data])
  }, [data]);

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const height = e.nativeEvent.contentSize.height;
    const off = e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;
    const distanceFromBottom = height - off;
    if (distanceFromBottom < 200) {
      if (isRefetching || isLoading || !hasMore) return;
      setArgs(old => ({ ...old, page: (args.page ?? 1) + 1 }))
      // console.log("readyyyyy");
    }

  }

  const [lastY, setLastY] = useState(0);
  const [showTabs, setShowTabs] = useState(true);

  return (
    <AppScaffold
      noScroll
      appbarHeight={40}
      title={
        "Movee"
      }
      hideBack
      onRefresh={() => {
        resetPage();
        refetch({ cancelRefetch: true });
      }}
      refreshing={isLoading || isRefetching}
      scrollProps={{ onScroll }}
      underAppbar={
        <View className="flex-row px-4">
          <SearchInput placeholder="Search movies"
            onEndEditing={(e) => {
              setArgs(old => ({ ...old, q: e.nativeEvent.text, page: 1 }))
            }}
          />
        </View>
      }
    >
      <View className={`py-2 absolute z-20 bg-lighter dark:bg-dark ${showTabs ? '' : 'h-0'} `}>
        <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row px-4">
            <AppSelect
              label="Select Type"
              options={MOVIE_TYPES}
              value={MOVIE_TYPES[0]}
              snapPoints={['50%', "50%"]}
              onChange={(value) => setArgs(old => ({ ...old, "type": value.value, page: 1, }))}
              renderButton={(value) => (<AppButton className={cls.btn.selectClass}>
                <TTextLight>{value.title}</TTextLight>
              </AppButton>)}
            />
            <View className="px-1" />
            <AppSelect
              label="Select Year"
              options={years}
              value={years[0]}
              snapPoints={['70%', "70%"]}
              scrollable
              onChange={(value) => setArgs(old => ({ ...old, "year[]": value.value, page: 1 }))}
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
              onChange={(value) => setArgs(old => ({ ...old, "genre[]": value.value, page: 1 }))}
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
              onChange={(value) => setArgs(old => ({ ...old, "country[]": value.value, page: 1 }))}
              renderButton={(value) => (<AppButton className={cls.btn.selectClass}>
                <TTextLight>{value.title}</TTextLight>
              </AppButton>)}
            />
          </View>
        </ScrollView>
      </View>
      <View className="flex-1">
        {
          isError
            ? <TTextLighter className="text-3xl p-4">Poor internet connection. Pull down to retry</TTextLighter>
            : <ScrollView
              onScroll={(ev) => {
                const offset = ev.nativeEvent.contentOffset.y;
                if (offset < lastY || offset < 50) {
                  setShowTabs(true);
                } else {
                  setShowTabs(false)
                }
                setLastY(offset);
              }}
            >
              <View className="h-10"></View>
              <HomeMovies movies={movies} /></ScrollView>
        }
      </View>
    </AppScaffold>
  );
}
