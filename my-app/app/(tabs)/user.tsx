import { COLORS, FONTSIZE, SPACING } from "@/constants/Theme";
import { useStore } from "@/stores/store";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { router, Stack, useFocusEffect } from "expo-router";
import {
  CircleHelp,
  Key,
  LogOut,
  Mail,
  OctagonAlert,
  Phone,
  User,
} from "lucide-react-native";
import React from "react";
import {
  AppState,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const queryClient = new QueryClient();
export const UserScreenRef = () => {
  const user = useStore((state) => state.user);
  const setToken = useStore((state) => state.setToken);
  const token = useStore((state) => state.token);

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
    refetchOnWindowFocus: true,
  });

  useFocusEffect(
    React.useCallback(() => {
      queryData.refetch();
    }, [])
  );

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      focusManager.setFocused(state === "active");
    });
    return () => subscription.remove();
  }, []);
  return (
    <SafeAreaView style={styles.ScreenConntaier}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView
        style={styles.ScreenContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ScreenContainer}>
          <View style={styles.UserHeader}>
            <View style={styles.UserRounder}>
              <User size={55} color={COLORS.bgcolor} />
            </View>

            <View style={styles.UserHeaderText}>
              <Text style={styles.UserHeaderValue}>{user?.nom}</Text>
              <Text style={styles.UserHeaderValue}>{user?.prenoms}</Text>
            </View>
          </View>

          {/*  */}

          <View style={styles.UserOneContent}>
            <View style={styles.ContenttTel}>
              <Phone size={30} color={COLORS.bgcolor} />
              <Text style={styles.TelText}>{user?.tel}</Text>
            </View>

            <View style={styles.ContentMail}>
              <Mail size={30} color={COLORS.bgcolor} />
              <Text style={styles.TelMail}>{user?.email}</Text>
            </View>
          </View>

          {/*  */}
        </View>
        <View style={styles.CardInfo}>
          <View style={styles.CardLeft}>
            <Text style={styles.CardText}>
              {queryData.data && queryData.data.length}
            </Text>
            <Text style={{ color: COLORS.bgcolor, fontWeight: "bold" }}>
              Reservation
            </Text>
          </View>
          <View style={styles.CardRight}>
            <Text style={styles.CardText}>
              {queryData.data &&
                queryData.data.filter((item: any) => {
                  return (
                    item.etat == "Colis reçu" ||
                    item.etat == "Colis envoyé" ||
                    item.etat == "Arrivé a Abidjan"
                  );
                }).length}
            </Text>
            <Text style={{ color: COLORS.bgcolor, fontWeight: "bold" }}>
              Reservation (en cours)
            </Text>
          </View>
        </View>

        {/*  */}

        <View
          style={[
            styles.ScreenContainer,
            {
              marginTop: SPACING.space_30,
            },
          ]}
        >
          <View style={styles.ActionLine}>
            <TouchableOpacity
              style={styles.PassLine}
              onPress={() => router.push("/modalpassword")}
            >
              <Key size={35} color={COLORS.bgcolor} />
              <Text style={styles.PassLinetext}>Changer mot de passe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.PassLine}
              onPress={() => {
                router.push("/apropos");
              }}
            >
              <CircleHelp size={35} color={COLORS.bgcolor} />
              <Text style={styles.PassLinetext}>A propos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.PassLine}
              onPress={() => {
                router.push("/conditionuser");
              }}
            >
              <OctagonAlert size={35} color={COLORS.bgcolor} />
              <Text style={styles.PassLinetext}>Conditions d'utilisation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.PassLine}>
              <LogOut size={35} color="red" />
              <Text
                style={styles.PassLinetextd}
                onPress={() => {
                  // useStore.getState().clearAuth(); // Réinitialise les données de connexion
                  useStore.getState().clearAuth(); // Réinitialise les données de connexion
                  router.replace("/");
                }}
              >
                Deconnexion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default function UserScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserScreenRef />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  ScreenConntaier: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },

  ScreenContent: {
    flexGrow: 1,
    // paddingHorizontal: SPACING.space_8,
  },

  ScreenContainer: {
    flex: 1,
    display: "flex",
    // justifyContent: "center",
    paddingHorizontal: SPACING.space_24,
    // alignItems: "center",
  },

  UserRounder: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: COLORS.bgcolor,
    borderRadius: 100,

    justifyContent: "center",
    alignItems: "center",
  },

  UserHeader: {
    marginTop: SPACING.space_24,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_16,
    marginBottom: SPACING.space_24,
  },

  UserHeaderText: {},

  UserHeaderValue: {
    fontSize: FONTSIZE.size_28,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: COLORS.bgcolor,
  },

  UserOneContent: {
    marginBottom: SPACING.space_20,
    flexDirection: "column",
    gap: SPACING.space_12,
  },

  ContenttTel: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_10,
  },
  ContentMail: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_10,
  },

  TelText: {
    fontSize: FONTSIZE.size_16,
    color: "#a4b0be",
  },
  TelMail: {
    fontSize: FONTSIZE.size_16,
    color: "#a4b0be",
  },

  CardInfo: {
    display: "flex",
    flexDirection: "row",
    height: 90,
  },
  CardLeft: {
    borderColor: COLORS.bgcolor,
    borderWidth: 1,
    borderLeftWidth: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  CardRight: {
    borderColor: COLORS.bgcolor,
    borderWidth: 1,
    borderRightWidth: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  CardText: {
    fontSize: FONTSIZE.size_28,
    color: COLORS.bgcolor,
    fontWeight: "bold",
  },

  PassLine: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.space_20,
  },
  ActionLine: {
    flexDirection: "column",
    gap: SPACING.space_24,
  },

  PassLinetext: {
    fontSize: FONTSIZE.size_18,
    fontWeight: "bold",
    color: COLORS.bgcolor,
  },

  PassLinetextd: {
    fontSize: FONTSIZE.size_20,
    fontWeight: "bold",
    color: "red",
  },
});
