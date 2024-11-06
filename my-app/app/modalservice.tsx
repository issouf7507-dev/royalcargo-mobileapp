import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { PlaneTakeoff, Ship, X } from "lucide-react-native";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "@/constants/Theme";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "expo-checkbox";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Schéma de validation avec Yup, avec valeurs par défaut
const schema = Yup.object().shape({
  nom: Yup.string().default("Jean Dupont").required("Le nom est requis"),
  numero: Yup.string()
    .default("01234567")
    .matches(/^[0-9]+$/, "Numéro invalide")
    .min(10, "Le numéro doit contenir au moins 8 chiffres")
    .required("Le numéro de téléphone est requis"),
  typec: Yup.string()
    .default("Produit A")
    .required("Le type de produit est requis"),
  condition: Yup.bool()
    .default(false)
    .oneOf([true], "Vous devez accepter les termes et conditions"),
});

const modalservice = ({ itemData }: any) => {
  const params: any = useLocalSearchParams<any>();

  const [items, setItems] = React.useState<any>([
    {
      name: "Envoie express",
      desc: "Vos colis arrivent à destination en un clin d'oeil. (5 jours)",
      price: "12000 FR/KG",
      code: "#fff",
      icon: <PlaneTakeoff size={120} color={COLORS.bgcolor} />,
    },
    {
      name: "Envoie Normal",
      desc: "Profitez de tarifs avantageux pour vos envois de colis de 2 semaines.",
      price: "9000 FR/KG",
      code: "#fff",
      icon: <PlaneTakeoff size={120} color={COLORS.bgcolor} />,
    },
    {
      name: "Envoie Maritime",
      desc: "Vos colis traversent les océans en toute sérénité avec notre service Envoie Maritime.",
      price: "CBM(M3)",
      code: "#fff",
      icon: <Ship size={120} color={COLORS.bgcolor} />,
    },
  ]);

  // console.log(
  //   items.filter((item: any) => {
  //     return item.name == params.id;
  //   })
  // );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
    // defaultValues: schema.cast(), // Utilisation de la méthode `cast` pour appliquer les valeurs par défaut définies dans le schéma Yup
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  //   console.log(params);
  return (
    <View style={styles.ScreenContainer}>
      <Stack.Screen
        options={{
          headerTitle: params.id,
          headerTitleStyle: { color: COLORS.bgcolor },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color={COLORS.bgcolor} />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.ScreenContent}>
        <View>
          {items &&
            items.filter((item: any) => {
              return item.name == params.id;
            })[0].icon}
        </View>

        <Text style={styles.ScreenContentTitle}>
          {params.id == "Envoie express"
            ? `Super, vous avez opté pour le forfait ${params.id}! Parfait pour des envois rapides et efficaces!`
            : params.id == "Envoie Normal"
            ? `Super, vous avez choisi le forfait ${params.id}! Idéal pour une utilisation quotidienne avec sérénité.`
            : `Excellente décision ! Le forfait ${params.id} vous offre un maximum de flexibilité et d’avantages.`}
        </Text>
        <Text style={styles.ScreenContentTitle}>
          Veuillez s'il vous plait rempli tout ces champs afin de passer a
          l'etape suivante
        </Text>
      </View>
      <View style={styles.container}>
        {/* <Text style={styles.label}>Nom</Text> */}
        <Controller
          control={control}
          name="nom"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Nom"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />
        {errors.nom && (
          <Text style={styles.errorText}>{errors.nom.message}</Text>
        )}

        {/* <Text style={styles.label}>Numéro de tel</Text> */}
        <Controller
          control={control}
          name="numero"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Numéro"
                keyboardType="phone-pad"
                onBlur={onBlur}
                onChangeText={(text) => onChange(text.replaceAll(" ", ""))}
                value={value}
              />
            </View>
          )}
        />
        {errors.numero && (
          <Text style={styles.errorText}>{errors.numero.message}</Text>
        )}

        {/* <Text style={styles.label}>Type de produit</Text> */}
        <Controller
          control={control}
          name="typec"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Type de produit"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />
        {errors.typec && (
          <Text style={styles.errorText}>{errors.typec.message}</Text>
        )}

        <View style={styles.checkboxContainer}>
          <Controller
            control={control}
            name="condition"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                style={{ borderRadius: 50 }}
                value={value}
                onValueChange={onChange}
                color={value ? "#4630EB" : undefined}
              />
            )}
          />
          <Text style={styles.checkboxLabel}>
            Accepter les termes et conditions
            {/* dans la section{" "} */}
            {/* <TouchableOpacity onPress={() => {}}>
              <Text style={styles.link}>A propos</Text> 
            </TouchableOpacity> */}
          </Text>
        </View>
        {errors.condition && (
          <Text style={styles.errorText}>{errors.condition.message}</Text>
        )}

        {/* <Button
        
        title="Demander une adresse" onPress={handleSubmit(onSubmit)} /> */}

        <View>
          {/* <TouchableOpacity>
            <Text>Demander une adresse</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Demander une adresse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default modalservice;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  ScreenContent: {
    marginTop: SPACING.space_16,
    paddingHorizontal: SPACING.space_28,
  },
  ScreenContentTitle: {
    marginTop: SPACING.space_16,
    fontSize: FONTSIZE.size_16,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
    padding: SPACING.space_16,
    // paddingHorizontal: SPACING.space_28,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.textColoerWhite,
    borderWidth: 1,
    // borderWidth: 0.1,
    borderColor: COLORS.bgcolor,

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // elevation: 3,
  },
  container: {
    padding: 16,
    flexDirection: "column",
    gap: SPACING.space_18,
    paddingHorizontal: SPACING.space_28,
    // backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  input: {
    // height: 40,
    flex: 1,
    borderColor: "#ddd",
    // borderWidth: 1,
    // borderRadius: 4,
    // paddingHorizontal: 8,
    // marginTop: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.bgcolor,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
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
