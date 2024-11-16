import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { COLORS, SPACING } from "@/constants/Theme";
import { router } from "expo-router";

const apropos = () => {
  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={40} color={COLORS.bgcolor} />
          </TouchableOpacity>
        </View>
        <Text>Apropos</Text>
      </View>
    </SafeAreaView>
  );
};

export default apropos;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    padding: 16,
    flexDirection: "column",
    gap: SPACING.space_12,
    paddingHorizontal: SPACING.space_28,
  },
});
