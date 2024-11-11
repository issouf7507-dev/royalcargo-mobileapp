import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Theme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MyTabBar } from "@/components/_comp/TaBar";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs tabBar={(props) => <MyTabBar {...props} />}>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="explore" options={{ headerShown: false }} />

      <Tabs.Screen name="explore2" />
      <Tabs.Screen name="user" />
    </Tabs>
  );
}
