import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { X } from "lucide-react-native";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "@/constants/Theme";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const ModaldetailRef = () => {
  const params: any = useLocalSearchParams<any>();
  const shareText = `重要须知（埋头）: 包装上必须写明客户的姓名和国外电话号码。
  客户姓名和编号 : (Zida oumarou +2250768974127 Envoie express)
  是否有内置电池。 中国广州市越秀区环市中路205号恒生大厦B座903-2
  电话 : +86 186 2097 5453 / +86 188 0207 2454 注意：不接受快递费。
  收货时间：12.00 - 20.30 违禁品将被拒收。
  如有虚假申报，在机场进行虚假申报或扣押货物的所有相关费用均由当事人自行承担！`;
  const handleShare = async () => {
    try {
      await Share.share({
        message: shareText,
      });
    } catch (error) {
      console.error("Error sharing text:", error);
    }
  };

  const fetchData = async () => {
    const response = await fetch(
      `https://royalcargo225.com:9100/api/v01/adress/${params.id}`,
      {
        method: "GET",
        headers: {
          // "Content-type": "app"
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  const queryData = useQuery({
    queryKey: ["cmmd2"],
    queryFn: () => fetchData(),
  });

  // console.log(queryData.data);
  return (
    <View style={styles.ScreenContaier}>
      <Stack.Screen
        options={{
          headerTitle: "Confirmation de La reservation",
          headerTitleStyle: { color: COLORS.bgcolor },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color={COLORS.bgcolor} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.ScreenContent}>
        <View style={styles.ScreenContentCard}>
          <Text style={styles.ContentCardDesc}>
            Merci pour votre réservation, les informations relatives à celle-ci
            se trouvent ci-dessous.
          </Text>

          <View style={styles.ContentCardInfo}>
            <Text style={styles.ContentCardText}>
              Nom : {queryData.data && queryData.data.nom}
            </Text>
            <Text style={styles.ContentCardText}>
              Téléphone : {queryData.data && queryData.data.numero}
            </Text>
            <Text style={styles.ContentCardText}>
              Date de reservation : {queryData.data && queryData.data.daten}
            </Text>

            <Text style={styles.ContentCardText}>
              Status : {queryData.data && queryData.data.etat}
            </Text>

            <Text style={styles.ContentCardText}>
              Information du Service :{" "}
              {queryData.data && queryData.data.service}
            </Text>

            <Text style={styles.ContentCardText}>
              Numero du suivi : {queryData.data && queryData.data.trackCode}{" "}
            </Text>
          </View>

          {/*  */}

          <View style={styles.ContenntAdresse}>
            <Text style={styles.AdressTitle}>Adresse</Text>
            <Text style={styles.AdressDesc}>
              Il s'agit de l'adresse à envoyer au fournisseur.
            </Text>

            <Text style={styles.Adress}>
              重要须知（埋头）: 包装上必须写明客户的姓名和国外电话号码。
              客户姓名和编号 : (Zida oumarou +2250768974127 Envoie express)
              是否有内置电池。 中国广州市越秀区环市中路205号恒生大厦B座903-2
              电话 : +86 186 2097 5453 / +86 188 0207 2454 注意：不接受快递费。
              收货时间：12.00 - 20.30 违禁品将被拒收。
              如有虚假申报，在机场进行虚假申报或扣押货物的所有相关费用均由当事人自行承担！
            </Text>
          </View>

          {/*  */}

          <View style={styles.ButtonContainer}>
            <TouchableOpacity style={styles.ShareButton} onPress={handleShare}>
              <Text style={styles.ShareButtonText}>Partager</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export const Modaldetail = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModaldetailRef />
    </QueryClientProvider>
  );
};

export default Modaldetail;

const styles = StyleSheet.create({
  ScreenContaier: { flex: 1 },
  ScreenContent: { flexGrow: 1, padding: SPACING.space_15 },
  ScreenContentCard: {
    borderWidth: 1,
    borderColor: COLORS.bgcolor,
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },

  ContentCardInfo: {
    flexDirection: "column",
    gap: SPACING.space_18,
    marginTop: SPACING.space_16,
  },

  ContentCardDesc: {
    color: "#a4b0be",
  },
  ContentCardText: {
    fontWeight: "bold",
    fontSize: FONTSIZE.size_14,
  },

  ContenntAdresse: {
    marginTop: SPACING.space_18,
  },

  AdressTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: FONTSIZE.size_16,
    color: COLORS.bgcolor,
    marginBottom: SPACING.space_10,
  },
  AdressDesc: {
    // textAlign: "center",
    // fontWeight: "bold",
    fontSize: FONTSIZE.size_14,
    color: "#a4b0be",
    marginBottom: SPACING.space_12,
  },
  Adress: {},

  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: SPACING.space_18,
  },
  ShareButton: {
    backgroundColor: COLORS.bgcolor,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_10,
  },
  ShareButtonText: {
    color: "#fff",
    fontSize: FONTSIZE.size_16,
    fontWeight: "bold",
  },
});
