import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "@/constants/Theme";
import { TabBarIcon } from "../costumIcons/TabBarIcon";

const FormSignin = ({ control, handleSubmit, onSubmit, errors }: any) => {
  return (
    <View>
      <Text style={styles.title}>CONNECTEZ-VOUS À VOTRE COMPTE</Text>

      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Email</Text> */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputBox}>
              <View>
                <TabBarIcon name="mail" size={22} color={COLORS.bgcolor} />
              </View>
              <TextInput
                style={[
                  { fontSize: FONTSIZE.size_16, flex: 1 },
                  errors.email && styles.errorInput,
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
                // placeholderTextColor={}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Mot de passe</Text> */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputBox}>
              <View>
                <TabBarIcon name="key" size={22} color={COLORS.bgcolor} />
              </View>
              <TextInput
                style={[
                  { fontSize: FONTSIZE.size_16, flex: 1 },
                  errors.password && styles.errorInput,
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Entrez votre mot de passe"
                secureTextEntry
              />
            </View>
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormSignin;

const styles = StyleSheet.create({
  title: {
    fontSize: FONTSIZE.size_18,
    // fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    // textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.textColoerWhite,

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // elevation: 3,
  },
  errorInput: {
    borderColor: "red",
  },
  input: {},
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
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
