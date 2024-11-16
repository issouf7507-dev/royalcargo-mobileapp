import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { COLORS, FONTSIZE, SPACING, BORDERRADIUS } from "@/constants/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import { schemaUpdatePassword } from "@/libs/validations";
import { useStore } from "@/stores/store";

// Schéma de validation pour le formulaire de modification de mot de passe

const ChangePasswordForm = () => {
  const token = useStore((state) => state.token);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaUpdatePassword),
  });

  const handleLogin = async (oldPassword: string, newPassword: string) => {
    try {
      // setIsLoading(true); // Activer le loader

      const res = await fetch(`http://localhost:9001/api/v01/putPass`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();

      setTimeout(() => {
        // setIsLoading(false);
        if (res.ok) {
          // Vérifiez si une erreur spécifique est renvoyée
          if (data.error) {
            Alert.alert("Erreur de connexion", data.error);
          } else if (data.message) {
            Alert.alert("Succes", data.message, [
              { text: "OK", onPress: () => router.push("/(tabs)/user") },
            ]);
            control._reset();
          }
        } else {
          // Gestion des erreurs spécifiques selon le code de statut HTTP
          if (res.status === 401) {
            Alert.alert("Erreur", data.error);
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

  const onSubmit = (data: any) => {
    // console.log(data);
    handleLogin(data.oldPassword, data.newPassword);
  };

  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={40} color={COLORS.bgcolor} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Changer le mot de passse</Text>

        <Controller
          control={control}
          name="oldPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Ancien mot de passe"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />
        {errors.oldPassword && (
          <Text style={styles.errorText}>{errors.oldPassword.message}</Text>
        )}

        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Nouveau mot de passe"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />
        {errors.newPassword && (
          <Text style={styles.errorText}>{errors.newPassword.message}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Modifier le mot de passe</Text>
        </TouchableOpacity>
      </View>
      {/* <Text>{token}</Text> */}
    </SafeAreaView>
  );
};

export default ChangePasswordForm;

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
  title: {
    fontSize: FONTSIZE.size_18,
    fontWeight: "bold",
    color: COLORS.bgcolor,
    marginBottom: SPACING.space_16,
  },
  inputBox: {
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.textColoerWhite,
    borderWidth: 1,
    borderColor: COLORS.bgcolor,
    marginBottom: SPACING.space_12,
  },
  input: {
    fontSize: FONTSIZE.size_16,
  },
  errorText: {
    color: "red",
    marginBottom: SPACING.space_8,
  },
  button: {
    backgroundColor: COLORS.bgcolor,
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.textColoerWhite,
    fontSize: FONTSIZE.size_16,
    fontWeight: "bold",
  },
});
