import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BORDERRADIUS, COLORS, SPACING } from "@/constants/Theme";
import { icon } from "@/constants/Icon";

interface TabBarBtn {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  label?: any;
}
export function TabBarBtn({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: TabBarBtn) {
  return (
    <Pressable
      // key={route.name}
      // accessibilityRole="button"
      // accessibilityState={isFocused ? { selected: true } : {}}
      // accessibilityLabel={options.tabBarAccessibilityLabel}
      // testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItems}
    >
      {icon[routeName]({
        color: isFocused ? COLORS.bgcolor : "#222",
      })}
      {/* <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>{label}</Text> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabbarItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.space_10,
  },
});

// ...

{
  /* <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
  {...}
</Tab.Navigator> */
}
