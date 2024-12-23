import { View, Text, Linking } from "react-native";
import React, { useMemo } from "react";
import { AppButton } from "../ui";
import { cls } from "@/constants";
import { TTextLight } from "../Themed";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Movie, MovieDetailed } from "@/types";
import { useAppTheme, useStorageSaved } from "@/hooks";
import { paths } from "@/utils";
import { router } from "expo-router";
import { useGlobalStore } from "@/state";

export default function MovieScreenActionButtons({
  movie,
  movieDetailed,
}: {
  movie: Movie;
  movieDetailed?: MovieDetailed;
}) {
  const { textLight } = useAppTheme();
  const { storedsaved, updatesaved } = useStorageSaved();
  const setStream = useGlobalStore((s) => s.setStream);

  const saved = useMemo(
    () =>
      storedsaved
        ? !!storedsaved.find((i) => (!i ? false : i.id === movie.id))
        : false,
    [storedsaved]
  );

  return (
    <View className="flex-row mx-5" style={{ gap: 16 }}>
      {storedsaved && movie && (
        <ActionButton
          title="Favourite"
          icon={
            <Ionicons
              name={saved ? "heart" : "heart-outline"}
              size={24}
              color={textLight}
            />
          }
          bgColor={saved ? "#ff000022" : undefined}
          onPress={() => {
            if (saved)
              updatesaved([...storedsaved.filter((i) => i.id != movie.id)]);
            else updatesaved([...storedsaved, movie]);
          }}
        />
      )}
      {!!movieDetailed ? (
        <>
          <ActionButton
            title="Download"
            icon={
              <FontAwesome6 name={"download"} size={24} color={textLight} />
            }
            onPress={() =>
              Linking.openURL(movieDetailed.download.video + "?redirect=true")
            }
          />
          <ActionButton
            title="Subtitle"
            icon={
              <Ionicons name={"document-text"} size={24} color={textLight} />
            }
            onPress={() =>
              Linking.openURL(
                movieDetailed.download.subtitle + "?redirect=true"
              )
            }
          />
          <ActionButton
            title="Stream"
            icon={<FontAwesome6 name={"play"} size={24} color={textLight} />}
            onPress={() => {
              setStream(movieDetailed.download.video + "?redirect=true");
              router.push(paths.singleMovieStream as any);
            }}
          />
        </>
      ) : (
        [1, 2, 3].map((i) => (
          <ActionButton key={i} title="" icon={<></>} onPress={() => {}} />
        ))
      )}
    </View>
  );
}

function ActionButton({
  icon,
  title,
  onPress,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  bgColor?: string;
}) {
  return (
    <AppButton
      className={`items-center justify-center aspect-[4/3] rounded-xl max-w-[25%] flex-1 ${cls.bg.opacified}`}
      style={bgColor ? { backgroundColor: bgColor } : {}}
      onPress={onPress}
    >
      {icon}
      <TTextLight className="text-center">{title}</TTextLight>
    </AppButton>
  );
}
