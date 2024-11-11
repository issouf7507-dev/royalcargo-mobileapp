import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "@/constants/Theme";
import { OtpInput } from "react-native-otp-entry";
import { Link, router } from "expo-router";
import { useStore } from "@/stores/store";
import { BadgeCheck, CircleX } from "lucide-react-native";

const queryClient = new QueryClient();
export const VerificationmailRef = () => {
  const verifMail = useStore((state) => state.verificationMail);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [code, setCode] = React.useState<string>("");
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [modalVisible2, setModalVisible2] = React.useState<boolean>(false);
  //   const [codeLength, setCodeLength] = React.useState(false)

  const handleVerif = async (email: any, verificationCode: string) => {
    try {
      //   setIsLoading(true); // Activer le loader

      const res = await fetch(`http://localhost:9001/api/v01/verifyUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, verificationCode }),
      });
      const data = await res.json();

      setTimeout(() => {
        setIsLoading(false);

        console.log(data);

        if (res.ok) {
          // Vérifiez si une erreur spécifique est renvoyée
          if (data.error) {
            Alert.alert("Erreur de connexion", data.error);
          } else if (data.message) {
            // Connexion réussie : enregistrez le token et redirigez l’utilisateur
            console.log(data);
            setModalVisible2(true);
            // Redirigez vers la page d’accueil ou tableau de bord
            // setToken(data.token);
            // setUser(data.user);
          }
        } else {
          //   Alert.alert("Erreur de verification", data.error, [
          //     {
          //       text: "Osss",
          //       onPress: () => console.log("Cancel Pressed"),
          //     },
          //   ]);

          setModalVisible(true);
        }
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  const onSubmit = (data: any) => {
    // router.push("/(tabs)/");
    // console.log(data);
    // handleLogin(data.email, data.password);
    // console.log("verifMail", verifMail, "code", code);
    handleVerif(verifMail, code);
  };
  return (
    <SafeAreaView style={styles.ScreenConntaier}>
      <StatusBar style="dark" backgroundColor={COLORS.bgcolor} />

      <View style={styles.ScreenContent}>
        <View style={styles.ScreenContainer}>
          <Text style={styles.ScreenTitle}>Vérification de votre compte</Text>
          <Text style={styles.ScreenTitle2}>Merci de vous être inscrit !</Text>
          <Text style={styles.ScreenSubtitle}>
            Pour finaliser votre inscription, veuillez entrer le code à 6
            chiffres que nous avons envoyé à votre adresse email.
          </Text>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <CircleX size={50} color={COLORS.bgcolor} />
                <Text style={styles.modalText}>Erreur de Vérification</Text>
                <Text style={styles.modalTextSub}>
                  Le code saisit est incorrect.{" "}
                </Text>
                <TouchableOpacity
                  style={[styles.button2, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible2(!modalVisible2);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <BadgeCheck size={50} color={COLORS.bgcolor} />
                <Text style={styles.modalText}>Vérification effectuée</Text>
                <Text style={styles.modalTextSub}>
                  Vous pouvez maintenant te connecter.
                </Text>
                <TouchableOpacity
                  style={[styles.button2, styles.buttonClose]}
                  onPress={() => {
                    router.push("/");
                    setModalVisible2(!modalVisible2);
                  }}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.otpContennt}>
            <OtpInput
              numberOfDigits={6}
              focusColor="green"
              focusStickBlinkingDuration={500}
              onTextChange={(text) => setCode(text)}
              //   onFilled={(text) => {

              //   }}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                // containerStyle: styles.container,
                // pinCodeContainerStyle: styles.pinCodeContainer,
                // pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: {
                  backgroundColor: COLORS.bgcolor,
                  borderColor: COLORS.bgcolor,
                },
                focusedPinCodeContainerStyle: {
                  cursor: "pointer",
                  borderColor: COLORS.bgcolor,
                },
              }}
            />
          </View>

          <View style={[styles.sectionSignup]}>
            <Text style={styles.sectionSignupText}>
              Vous pouvez aussi passer cette étape pour le moment.{"  "}
              <Link href={"/"}>
                {/* <TouchableOpacity> */}
                <Text style={styles.sectionSignupBtn}>
                  Continuer sans confirmer
                </Text>
                {/* </TouchableOpacity> */}
              </Link>
            </Text>

            <View style={styles.BtnConatiner}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      code.length != 6 ? "lightgray" : COLORS.bgcolor,
                  },
                ]}
                onPress={onSubmit}
                disabled={code.length != 6}
              >
                <Text style={styles.buttonText}>Verification</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function Verificationmail() {
  return (
    <QueryClientProvider client={queryClient}>
      <VerificationmailRef />
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
    justifyContent: "center",
    paddingHorizontal: SPACING.space_24,
    // alignItems: "center",
  },

  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontWeight: "bold",
    color: COLORS.bgcolor,
    textAlign: "center",
    marginBottom: SPACING.space_16,
  },

  ScreenTitle2: {
    fontSize: FONTSIZE.size_20,
    // fontWeight: "bold",
    color: COLORS.bgcolor,
    // textAlign: "center",
    // marginBottom: SPACING.space_16,
  },

  ScreenSubtitle: {
    fontSize: FONTSIZE.size_16,
  },

  otpContennt: {
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_24,
  },

  sectionSignup: {
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
  },

  sectionSignupText: {
    // textAlign: "center",
    fontSize: FONTSIZE.size_16,
  },

  sectionSignupBtn: {
    fontWeight: "bold",

    color: COLORS.bgcolor,
  },

  BtnConatiner: {
    marginTop: SPACING.space_36,
  },

  button: {
    // backgroundColor: COLORS.bgcolor,S
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.textColoerWhite,
    fontSize: FONTSIZE.size_16,
    fontWeight: "bold",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    display: "flex",
    margin: 20,
    backgroundColor: "white",
    width: 350,
    borderRadius: 20,
    padding: SPACING.space_15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button2: {
    borderRadius: BORDERRADIUS.radius_8,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: COLORS.bgcolor,
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: SPACING.space_12,
    textAlign: "center",
    fontSize: FONTSIZE.size_20,
  },

  modalTextSub: {
    marginBottom: 20,
  },
});
