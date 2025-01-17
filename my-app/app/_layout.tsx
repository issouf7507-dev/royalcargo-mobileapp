import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="verificationmail" options={{ headerShown: false }} />
      <Stack.Screen
        name="modalservice"
        options={{
          presentation: "modal",
          animation: "slide_from_left",
        }}
      />

      <Stack.Screen
        name="modaldetail"
        options={{
          presentation: "modal",
          animation: "slide_from_left",
        }}
      />

      <Stack.Screen
        name="modalpassword"
        options={{
          presentation: "card",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="conditionuser"
        options={{
          presentation: "card",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="apropos"
        options={{
          presentation: "card",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="detaisreservation"
        options={{
          presentation: "card",
          headerShown: false,
        }}
      />

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" />
    </Stack>
    // </ThemePro?vider>
  );
}
