import Header from "@/components/_comp/Header";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { FlatGrid } from "react-native-super-grid";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS, FONTSIZE, SPACING } from "@/constants/Theme";
import { router, useFocusEffect } from "expo-router";
import { PlaneTakeoff, Ship } from "lucide-react-native";
import { useStore } from "@/stores/store";
import ModalAdressActive from "@/components/_comp/ModalAdressActive";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export const TabTwoScreenRef = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const user = useStore((state) => state.user);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>(null);
  const [items, setItems] = React.useState([
    { name: "TURQUOISE", code: "#1abc9c" },
    { name: "EMERALD", code: "#2ecc71" },
    { name: "PETER RIVER", code: "#3498db" },
    { name: "AMETHYST", code: "#9b59b6" },
    { name: "WET ASPHALT", code: "#34495e" },
    { name: "GREEN SEA", code: "#16a085" },
    { name: "NEPHRITIS", code: "#27ae60" },
    { name: "BELIZE HOLE", code: "#2980b9" },
    { name: "WISTERIA", code: "#8e44ad" },
    { name: "MIDNIGHT BLUE", code: "#2c3e50" },
    { name: "SUN FLOWER", code: "#f1c40f" },
    { name: "CARROT", code: "#e67e22" },
    { name: "ALIZARIN", code: "#e74c3c" },
    { name: "CLOUDS", code: "#ecf0f1" },
    { name: "CONCRETE", code: "#95a5a6" },
    { name: "ORANGE", code: "#f39c12" },
    { name: "PUMPKIN", code: "#d35400" },
    { name: "POMEGRANATE", code: "#c0392b" },
    { name: "SILVER", code: "#bdc3c7" },
    { name: "ASBESTOS", code: "#7f8c8d" },
  ]);

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:9001/api/v01/reservation/${user?.id}`,
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

  useFocusEffect(
    React.useCallback(() => {
      queryData.refetch();
    }, [])
  );

  if (queryData.isLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />

        {/* <Text>Loading...</Text> */}
      </View>
    );
  return (
    <SafeAreaView style={styles.ScreenConntaier}>
      <View style={styles.ScreenContent}>
        {/* Hedear */}
        <Header />

        {/*  */}

        <View style={styles.Welcome}>
          <Text style={styles.WelcomeTitle}>Hey Willy!</Text>
          <Text style={styles.WelcomeDesc}>
            Bonjour, Bienvenu dans la liste de vos commandes
          </Text>
        </View>

        <ModalAdressActive
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalData={modalData}
        />

        <FlatGrid
          itemDimension={220}
          data={
            queryData &&
            queryData.data.filter((item: any) => {
              return (
                item.etat == "Colis reçu" ||
                item.etat == "Colis envoyé" ||
                item.etat == "Arrivé a Abidjan"
              );
            })
          }
          // data={[]}
          style={[styles.gridView, { marginBottom: tabBarHeight - 10 }]}
          // staticDimension={300}
          // fixed

          spacing={10}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setModalData(item);
                // router.navigate({
                //   pathname: "/modaldetail",
                //   params: {
                //     id: item.id,
                //   },
                // });
              }}
            >
              <View
                style={[
                  styles.itemContainer,
                  // { backgroundColor: item.code }
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.itemName}>{item.service}</Text>
                    <Text style={styles.itemDesc}>
                      {item.typec.length > 16
                        ? item.typec.toString().slice(0, 16) + "..."
                        : item.typec}
                    </Text>
                    <Text style={styles.itemStatus}>{item.etat}</Text>
                  </View>
                  <View>
                    {item.service == "Envoie express" ? (
                      <PlaneTakeoff size={80} color="#fff" />
                    ) : item.service == "Envoie Normal" ? (
                      <PlaneTakeoff size={80} color="#fff" />
                    ) : (
                      <Ship size={80} color="#fff" />
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Aucune donnée disponible</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default function TabTwoScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <TabTwoScreenRef />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  Welcome: {
    marginTop: SPACING.space_20,
    paddingHorizontal: SPACING.space_28,
  },

  WelcomeTitle: {
    fontSize: FONTSIZE.size_40,
    color: COLORS.bgcolor,
  },
  WelcomeDesc: {
    fontSize: FONTSIZE.size_24,

    color: "#a4b0be",
  },
  ScreenConntaier: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingVertical: Platform.OS == "android" ? SPACING.space_46 : 0,
  },

  ScreenContent: {
    flexGrow: 1,
    // paddingHorizontal: SPACING.space_8,
  },

  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 120,
    backgroundColor: COLORS.bgcolor,
  },
  itemName: {
    fontSize: FONTSIZE.size_24,
    color: "#fff",
    fontWeight: "600",
  },
  itemDesc: {
    // fontWeight: "600",
    fontSize: FONTSIZE.size_18,
    color: "#fff",
  },

  itemStatus: {
    // fontWeight: "600",
    fontSize: FONTSIZE.size_14,
    color: "#fff",
  },

  emptyContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: Dimensions.get("screen").height * 0.5,

    // backgroundColor: "#f01", // Couleur de fond douce
  },
  emptyText: {
    fontSize: 16,
    color: "#a0a0a0", // Gris clair
    textAlign: "center",
  },
});
