import React from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
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
import { Link, router } from "expo-router";
import FormSignup from "@/components/form/FormSignup";
import { useStore } from "@/stores/store";

const signup = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const setVerifMail = useStore((state) => state.setVerificationMail);
  const {
    control: controlSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const handleRegister = async (
    email: string,
    password: string,
    tel: string,
    nom: string,
    prenoms: string
  ) => {
    try {
      setIsLoading(true); // Activer le loader

      const res = await fetch(`http://localhost:9001/api/v01/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password, tel, nom, prenoms }),
      });
      const data = await res.json();

      setTimeout(() => {
        setIsLoading(false);

        // console.log(data);

        if (res.ok) {
          // Vérifiez si une erreur spécifique est renvoyée
          if (data.error) {
            Alert.alert("Erreur de connexion", data.error);
          } else if (data.message) {
            // Connexion réussie : enregistrez le token et redirigez l’utilisateur
            console.log(data);
            setVerifMail(data.email);
            // setToken(data.token);
            // setUser(data.user);
            // router.push("/(tabs)/");

            router.push("/verificationmail");
            // Redirigez vers la page d’accueil ou tableau de bord
          }
        } else {
          Alert.alert("Erreur de connexion", data.error);
        }
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };
  // Fonction appelée lors de la soumission du formulaire
  const onSubmit = (data: any) => {
    // console.log(data);

    handleRegister(data.email, data.password, data.tel, data.nom, data.prenoms);

    // Alert.alert("Connexion réussie aa", `Email: ${data.tel} `);
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
        <View>{/* <Text>RoyssalCargo</Text> */}</View>
        <View style={styles.homeContaierContent}>
          {/* FORM */}
          <View>
            <FormSignup
              control={controlSignup}
              handleSubmit={handleSubmitSignup}
              onSubmit={onSubmit}
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
