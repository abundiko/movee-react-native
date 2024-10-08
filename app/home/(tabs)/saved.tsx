import { SearchInput } from "@/components/formComponents";
import { HomeMovies } from "@/components/home";
import { AppScaffold } from "@/components/layout";
import { useStorageSaved } from "@/hooks";
import { useState } from "react";
import { View } from "react-native";

export default function SavedScreen() {
  const [query, setQuery] = useState("");
  const { storedsaved, savedLoading } = useStorageSaved()

  return (
    <AppScaffold
      appbarHeight={40}
      title={
        "Saved Movees"
      }
      hideBack
      refreshing={savedLoading}
      underAppbar={
        <View className="flex-row px-4">
          <SearchInput placeholder="Search saved movies"
            onChangeText={(text) => {
              setQuery(text)
            }}
          />
        </View>
      }
    >
      {
        savedLoading || !storedsaved ? <></>
          : <HomeMovies movies={storedsaved.filter(m => m.title.toLowerCase().includes(query.toLowerCase()))} />
      }
    </AppScaffold>
  );
}
