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

const FormSignup = ({ control, handleSubmit, onSubmit, errors }: any) => {
  return (
    <View>
      <Text style={styles.title}>CONNECTEZ-VOUS À VOTRE COMPTE</Text>

      {/* Nom */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="nom"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputBox}>
              <View>
                <TabBarIcon name="person" size={22} color={COLORS.bgcolor} />
              </View>
              <TextInput
                style={[
                  { fontSize: FONTSIZE.size_16, flex: 1 },
                  errors.nom && styles.errorInput,
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Nom"
                // placeholderTextColor={}
                // keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}
        />
        {errors.nom && (
          <Text style={styles.errorText}>{errors.nom.message}</Text>
        )}
      </View>
      {/* Prenoms */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="prenoms"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputBox}>
              <View>
                <TabBarIcon name="person" size={22} color={COLORS.bgcolor} />
              </View>
              <TextInput
                style={[
                  { fontSize: FONTSIZE.size_16, flex: 1 },
                  errors.prenoms && styles.errorInput,
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Prenoms"
                // placeholderTextColor={}
                // keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}
        />
        {errors.prenoms && (
          <Text style={styles.errorText}>{errors.prenoms.message}</Text>
        )}
      </View>
      {/* Numero */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="tel"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputBox}>
              <View>
                <TabBarIcon
                  name="phone-portrait"
                  size={22}
                  color={COLORS.bgcolor}
                />
              </View>
              <TextInput
                style={[
                  { fontSize: FONTSIZE.size_16, flex: 1 },
                  errors.tel && styles.errorInput,
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Numero"
                // placeholderTextColor={}
                // keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}
        />
        {errors.tel && (
          <Text style={styles.errorText}>{errors.tel.message}</Text>
        )}
      </View>
      {/* Email */}
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
      {/* Password */}
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
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormSignup;

const styles = StyleSheet.create({
  title: {
    fontSize: FONTSIZE.size_18,
    // fontWeight: "bold",
    marginBottom: 30,
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
