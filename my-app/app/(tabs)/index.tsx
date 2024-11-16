import Header from "@/components/_comp/Header";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "@/constants/Theme";
import { Link, router, useFocusEffect } from "expo-router";
import {
  CircleX,
  Earth,
  History,
  PlaneTakeoff,
  Ship,
} from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useStore } from "@/stores/store";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import FormService from "@/components/_comp/FormServices";
import ModalAdress from "@/components/_comp/ModalAdress";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();
export const HomeScreenR = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const user = useStore((state) => state.user);
  const [service, setService] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>(null);

  const [items, setItems] = React.useState([
    {
      name: "Envoie express",
      desc: "Vos colis arrivent à destination en un clin d'oeil. (5 jours)",
      price: "12000 FR/KG",
      code: "#fff",
      icon: <PlaneTakeoff size={70} color={COLORS.bgcolor} />,
      icon2: <PlaneTakeoff size={70} color={COLORS.textColoerWhite} />,
    },
    {
      name: "Envoie Normal",
      desc: "Profitez de tarifs avantageux pour vos envois de colis de 2 semaines.",
      price: "9000 FR/KG",
      code: "#fff",
      icon: <PlaneTakeoff size={70} color={COLORS.bgcolor} />,
      icon2: <PlaneTakeoff size={70} color={COLORS.textColoerWhite} />,
    },
    {
      name: "Envoie Maritime",
      desc: "Vos colis traversent les océans en toute sérénité avec notre service Envoie Maritime.",
      price: "CBM(M3)",
      code: "#fff",
      icon: <Ship size={70} color={COLORS.bgcolor} />,
      icon2: <Ship size={70} color={COLORS.textColoerWhite} />,
    },

    {
      name: "Historiques",
      desc: "Consultez l'historique de vos envois précédents.",
      price: "CBM(M3)",
      code: "#fff",
      icon: <History size={70} color={COLORS.bgcolor} />,
      icon2: <History size={70} color={COLORS.textColoerWhite} />,
    },
  ]);
  const snapPoints = ["80%"];
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // callbacks
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };
  const handleSheetChanges = React.useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
    return;
  }, []);

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
      if (useStore.getState().isAuthenticated() == false) {
        router.push("/signup");
      }
      // console.log(useStore.getState().isAuthenticated());
    }, [])
  );
  // console.log(queryData.data);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: "red",
      }}
    >
      <SafeAreaView style={styles.ScreenConntaier}>
        <Header />

        {/*  */}

        <ModalAdress
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalData={modalData}
        />

        <View style={styles.Welcome}>
          <Text style={styles.WelcomeTitle}>Hey {user?.nom}!</Text>
          <Text style={styles.WelcomeDesc}>Bonjour</Text>
        </View>
        <View style={styles.ScrollViewFlex}>
          <View style={styles.HomeCard}>
            <View>
              <Text style={styles.HomeCardTitle}>Royal Cargo</Text>
              <Text style={styles.HomeCardTitle}>Vos Colis,</Text>
              <Text style={styles.HomeCardTitle}>Notre Priorité</Text>
            </View>
            <View>
              <Earth size={100} color={COLORS.bgcolor} />
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.ServiceContainer}>
            <Text style={styles.ServiceTitle}>Nos services</Text>
          </View>
          <View style={{ paddingHorizontal: SPACING.space_20, flex: 1 }}>
            <FlatGrid
              showsVerticalScrollIndicator={false}
              itemDimension={130}
              data={items}
              style={[styles.gridView, { marginBottom: tabBarHeight - 10 }]}
              spacing={10}
              renderItem={({ item }: any) => (
                // <Link href={`/modalservice/${item.name}`}>
                <TouchableOpacity
                  onPress={() => {
                    handlePresentModalPress();
                    setService(item.name);
                    queryData.refetch();
                  }}
                  // onPress={() =>
                  //   router.navigate({
                  //     pathname: "/modalservice",
                  //     params: {
                  //       id: item.name,
                  //     },
                  //   })
                  // }
                >
                  <View
                    style={[
                      styles.itemContainer,
                      {
                        backgroundColor:
                          item.name === "Historiques"
                            ? COLORS.bgcolor
                            : "#e4f0ff",
                      },
                    ]}
                  >
                    <View>
                      {item.name === "Historiques" ? item.icon2 : item.icon}
                    </View>
                    <Text
                      style={[
                        styles.itemName,
                        {
                          color:
                            item.name === "Historiques"
                              ? COLORS.textColoerWhite
                              : COLORS.bgcolor,
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text style={styles.itemCode}>{item.desc}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={{ flex: 1, alignItems: "center" }}>
            <View>
              <View
                style={{
                  flex: 1,
                  marginTop: SPACING.space_15,
                }}
              >
                <Text
                  style={{
                    fontSize: FONTSIZE.size_24,
                    fontWeight: "bold",
                    color: COLORS.bgcolor,
                    textAlign: "center",
                  }}
                >
                  {service}
                </Text>
                {service === "Historiques" ? (
                  <View
                    style={{
                      // flexGrow: 1,
                      // flex: 1,
                      height: Dimensions.get("window").height * 0.55,
                      // height: tabBarHeight - 100,
                    }}
                  >
                    <FlatGrid
                      itemDimension={200}
                      data={queryData && queryData.data}
                      // data={[]}
                      style={[styles.gridView2, {}]}
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
                            //     id: item.trackCode,
                            //   },
                            // });
                          }}
                        >
                          <View
                            style={[
                              styles.itemContainer2,
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
                                <Text style={styles.itemName2}>
                                  {item.service}
                                </Text>
                                <Text style={styles.itemDesc}>
                                  {item.typec.length > 16
                                    ? item.typec.toString().slice(0, 16) + "..."
                                    : item.typec}
                                </Text>
                                <Text style={styles.itemStatus}>
                                  {item.etat}
                                </Text>
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
                          <Text style={styles.emptyText}>
                            Aucune donnée disponible
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                ) : (
                  <FormService
                    service={service}
                    bottomSheetModalRef={bottomSheetModalRef}
                    queryData={queryData && queryData}
                  />
                  // ""
                )}
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default function TabTwoScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreenR />
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
  ScrollViewFlex: {
    marginTop: SPACING.space_16,
    paddingHorizontal: SPACING.space_28,
  },
  HomeCard: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.space_16,

    borderRadius: BORDERRADIUS.radius_25,
    padding: SPACING.space_15,
    borderWidth: 2,
    borderColor: COLORS.bgcolor,
  },

  HomeCardTitle: {
    fontSize: FONTSIZE.size_24,
    fontWeight: "bold",
    color: COLORS.bgcolor,
  },

  HomeCardDesc: {
    marginTop: SPACING.space_20,
    fontSize: FONTSIZE.size_12,
    color: COLORS.textColoerWhite,
  },
  //

  ServiceContainer: {
    marginTop: 10,
    paddingHorizontal: SPACING.space_28,
  },
  ServiceTitle: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.bgcolor,
  },

  CardServicesFlex: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  gridView: {
    flex: 1,
  },
  itemContainer: {
    position: "relative",
    overflow: "hidden",
    justifyContent: "flex-start",

    padding: 10,
    height: 180,
    borderRadius: BORDERRADIUS.radius_25,
  },
  itemName: {
    fontSize: 16,
    // color: COLORS.bgcolor,
    fontWeight: "bold",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#a4b0be",
  },

  gridView2: {
    marginTop: 10,
    flex: 1,
    // backgroundColor: "red",
    width: Dimensions.get("screen").width * 0.9,
    // paddingBottom: 800,
  },
  itemContainer2: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 120,
    backgroundColor: COLORS.bgcolor,
    // height: Dimensions.get("screen").height * 0.5,

    // width: 2000,
  },
  itemName2: {
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
    width: Dimensions.get("screen").width * 0.9,
    // backgroundColor: "red",

    // backgroundColor: "#f01", // Couleur de fond douce
  },
  emptyText: {
    fontSize: 16,
    color: "#a0a0a0", // Gris clair
    textAlign: "center",
  },
});
