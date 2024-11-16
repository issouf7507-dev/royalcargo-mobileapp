import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";

import { COLORS, FONTSIZE, SPACING } from "@/constants/Theme";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { loginSchema, signupSchema } from "@/libs/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormSignin from "@/components/form/FormSignin";
import { Link, router, useFocusEffect } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/stores/store";
import { SafeAreaView } from "react-native-safe-area-context";

const signin = ({ navigation }: any) => {
  // ALL STATE
  const [loaderSlapScreen, setLoaderSlapScreen] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const setToken = useStore((state) => state.setToken);
  const setUser = useStore((state) => state.setUser);

  const {
    control: controlSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: errorsSignin },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (tel: string, password: string) => {
    try {
      setIsLoading(true); // Activer le loader

      const res = await fetch(`http://localhost:9001/api/v01/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ tel, password }),
      });
      const data = await res.json();

      setTimeout(() => {
        setIsLoading(false);
        if (res.ok) {
          // Vérifiez si une erreur spécifique est renvoyée
          if (data.error) {
            Alert.alert("Erreur de connexion", data.error);
          } else if (data.message) {
            // Connexion réussie : enregistrez le token et redirigez l’utilisateur
            // console.log(data);

            setToken(data.token);
            setUser(data.user);

            router.push("/(tabs)/"); // Redirigez vers la page d’accueil ou tableau de bord
          }
        } else {
          // Gestion des erraeurs spécifiques selon le code de statut HTTP
          if (res.status === 401) {
            Alert.alert("Erreur", "Email ou mot de passe incorrect");
          } else if (res.status === 403) {
            Alert.alert(
              "Erreur",
              "Veuillez vérifier votre email avant de vous connecter"
            );
          } else {
            Alert.alert(
              "Erreur serveur",
              "Une erreur est survenue. Veuillez réessayer."
            );
          }
        }
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  // Fonction appelée lors de la soumission du formulaire
  const onSubmit = (data: any) => {
    // router.push("/(tabs)/");
    // console.log(data);
    handleLogin(data.tel, data.password);
    // controlSignin._reset();
  };

  useFocusEffect(
    React.useCallback(() => {
      if (useStore.getState().isAuthenticated()) {
        setTimeout(() => {
          setLoaderSlapScreen(false);
          router.replace("/(tabs)/");
        }, 3000);
        // Redirigez vers la page principale si déjà connecté
      } else {
        setTimeout(() => {
          setLoaderSlapScreen(false);
        }, 3000);
      }
    }, [])
  );

  if (loaderSlapScreen) {
    return (
      <SafeAreaView style={styles.splashContaier}>
        <View style={styles.splashContaierContent}>
          <Animated.Text
            entering={FadeInDown.delay(300).duration(300).springify()}
            style={styles.splashContaierText}
          >
            Royal{" "}
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(500).duration(500).springify()}
            style={styles.splashContaierTextSpan}
          >
            Cargo
          </Animated.Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    // <SafeAreaView >
    <ImageBackground
      // style={{ flex: 1

      //  }}
      style={styles.homeContaier}
      source={require("@/assets/images/signinwallper.jpg")}
      resizeMode="cover"
    >
      <LinearGradient
        // start={{ x: 0, y: 0 }}
        // end={{ x: 1, y: 1 }}
        colors={[
          "transparent",
          "rgba(225, 225, 225, 0.9)",
          "rgba(225, 225, 225, 1)",
        ]}
        style={styles.bg}
      >
        {/* <View>
          <Text>RoyalCargo</Text>
        </View> */}
        <View style={styles.homeContaierContent}>
          {/* FORM */}
          <View>
            <FormSignin
              control={controlSignin}
              handleSubmit={handleSubmitSignin}
              onSubmit={onSubmit}
              errors={errorsSignin}
            />

            <View style={{ marginTop: 10 }}>
              {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
            </View>
          </View>
        </View>
        <View style={styles.sectionSignup}>
          <Text style={styles.sectionSignupText}>
            Vous n'avez pas de compte?{" "}
          </Text>

          <View>
            <Link href={"/signup"} asChild>
              <TouchableOpacity>
                <Text style={styles.sectionSignupBtn}>Inscrivez-vous</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
    // </SafeAreaView>
  );
};

export default signin;

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
