import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function UserScreen() {
  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          source={require("@/assets/images/signinwallper.jpg")}
          style={styles.homeContaier}
        ></ImageBackground>
      </View>
      <View>
        <Text>s</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContaier: {
    flex: 1,
    // height: 300,
    // justifyContent: "center",
    // backgroundColor: COLORS.textColoerWhite,
  },
});
