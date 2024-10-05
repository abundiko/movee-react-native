import { TBgView } from "@/components/Themed";
import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Constants from '@/constants';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

Constants;
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <TBgView className="flex-1">
      <GestureHandlerRootView>
        <BottomSheetModalProvider><QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </QueryClientProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </TBgView>
  );
}
