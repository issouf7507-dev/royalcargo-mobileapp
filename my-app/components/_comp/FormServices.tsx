import React, { FC } from "react";
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
import { useStore } from "@/stores/store";

const schema = Yup.object().shape({
  userId: Yup.number(),
  nom: Yup.string()
    .default("Réservation Exemple")
    .required("Le nom est requis"),
  numero: Yup.string()

    .matches(/^[0-9]+$/, "Numéro invalide")
    .min(10, "Le numéro doit contenir au moins 8 chiffres")
    .required("Le numéro de téléphone est requis"),
  etat: Yup.string(),
  prix: Yup.number(),
  poids: Yup.number(),
  tailes: Yup.number(),
  daten: Yup.date(),
  condition: Yup.bool()
    .default(false)
    .oneOf([true], "Vous devez accepter les termes et conditions"),
  quantite: Yup.number(),
  images: Yup.string(),
  service: Yup.string(),
  typec: Yup.string()
    .default("Type A")
    .required("Le type de produit est requis"),
});

//   export default schema;

interface FormServiceProps {
  service: string;
  bottomSheetModalRef: any;
  queryData: any;
}

const FormService: FC<FormServiceProps> = ({
  service,
  bottomSheetModalRef,
  queryData,
}) => {
  //   const params: any = useLocalSearchParams<any>();
  const userId = useStore((state) => state.user);

  //   console.log(userId);

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userId: userId?.id,
      nom: "",
      numero: "",
      etat: "En attente de reception",
      prix: 200,
      poids: 5,
      tailes: 3,
      daten: new Date(),
      condition: true,
      quantite: 10,
      images: "",
      service: service,
      typec: "",
    },
    // defaultValues: schema.cast(), // Utilisation de la méthode `cast` pour appliquer les valeurs par défaut définies dans le schéma Yup
  });

  const PostServices = async (data: any) => {
    // Formatage des données selon le format attendu

    try {
      const response = await fetch(
        "http://localhost:9001/api/v01/reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Réservation créée :", responseData);
        bottomSheetModalRef.current?.dismiss();
        // Rediriger ou afficher un message de succès ici
      } else {
        console.error("Erreur lors de la création de la réservation");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  const onSubmit = (data: Yup.InferType<typeof schema>) => {
    // console.log(data);
    PostServices(data);
    queryData.refetch();
  };
  //   console.log(params);
  return (
    <View style={styles.ScreenContainer}>
      <View style={styles.ScreenContent}>
        <Text style={styles.ScreenContentTitle}></Text>
        <Text style={styles.ScreenContentTitle}>
          Veuillez s'il vous plait rempli tout ces champs afin de passer a
          l'etape suivante
        </Text>
      </View>
      <View style={styles.container}>
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
          </Text>
        </View>
        {errors.condition && (
          <Text style={styles.errorText}>{errors.condition.message}</Text>
        )}

        <View>
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

export default FormService;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  ScreenContent: {
    marginTop: SPACING.space_2,
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
