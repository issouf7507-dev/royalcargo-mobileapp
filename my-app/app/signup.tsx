import React from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { StatusBar } from "expo-status-bar";
import { COLORS, FONTSIZE, SPACING } from "@/constants/Theme";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { signupSchema } from "@/libs/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormSignin from "@/components/form/FormSignin";
import { Link } from "expo-router";
import FormSignup from "@/components/form/FormSignup";

const signup = () => {
  const {
    control: controlSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  // Fonction appelée lors de la soumission du formulaire
  const onSubmit2 = (data: any) => {
    Alert.alert("Connexion réussie aa", `Email: ${data.tel} `);
    // Ici, tu peux ajouter la logique de connexion (API call, etc.)
  };

  return (
    <ImageBackground
      style={styles.homeContaier}
      source={require("@/assets/images/signinwallper.jpg")}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[
          "transparent",
          "rgba(225, 225, 225, 0.9)",
          "rgba(225, 225, 225, 1)",
        ]}
        style={styles.bg}
      >
        <View>
          <Text>RoyalCargo</Text>
        </View>
        <View style={styles.homeContaierContent}>
          {/* FORM */}
          <View>
            <FormSignup
              control={controlSignup}
              handleSubmit={handleSubmitSignup}
              onSubmit={onSubmit2}
              errors={errorsSignup}
            />
          </View>
        </View>
        <View style={styles.sectionSignup}>
          <Text style={styles.sectionSignupText}>
            Vous avez deja un compte?{" "}
          </Text>

          <View>
            <Link href={"/"} asChild>
              <TouchableOpacity>
                <Text style={styles.sectionSignupBtn}>Connecter-vous</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default signup;

const styles = StyleSheet.create({
  splashContaier: {
    backgroundColor: COLORS.bgcolor,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  splashContaierContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_2,
  },

  splashContaierText: {
    fontSize: FONTSIZE.size_50,
  },

  splashContaierTextSpan: {
    color: COLORS.textColoerWhite,
    fontSize: FONTSIZE.size_50,
  },

  //
  homeContaier: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.textColoerWhite,
  },

  homeContaierContent: {
    padding: SPACING.space_30,
  },

  sectionSignup: {
    paddingHorizontal: SPACING.space_30,
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
  },

  sectionSignupText: {
    // textAlign: "center",
  },

  sectionSignupBtn: {
    fontWeight: "bold",
    color: COLORS.bgcolor,
  },

  bg: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: "flex-end",
    paddingVertical: SPACING.space_50,
  },

  // FORM
});
