import { Platform, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { SPACING } from "@/constants/Theme";

const Header = () => {
  return (
    <View style={styles.HomeHeader}>
      <View>{/* <Feather name="grid" size={26} /> */}</View>

      <View>
        <Feather name="bell" size={26} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  HomeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.space_28,
    marginTop: Platform.OS === "android" ? SPACING.space_20 : SPACING.space_16,
    // top: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
