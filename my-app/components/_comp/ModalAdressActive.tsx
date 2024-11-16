import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "@/constants/Theme";
import {
  ArrowDownFromLine,
  PlaneLanding,
  PlaneTakeoff,
  Warehouse,
} from "lucide-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "expo-router";

const queryClient = new QueryClient();

const ModalAdressActiveRef = ({
  modalVisible,
  setModalVisible,
  modalData,
}: any) => {
  // const params: any = useLocalSearchParams<any>();

  console.log(modalData);
  return (
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
          <View>
            <View style={styles.ScreenContentCard}>
              <Text style={styles.ContentCardDesc}>
                Merci pour votre réservation
              </Text>

              <View
                style={{
                  // flex: 1,
                  gap: 3,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    marginBottom: SPACING.space_24,
                    alignItems: "center",
                    gap: SPACING.space_10,
                  }}
                >
                  <Warehouse
                    size={80}
                    color={
                      modalData != null && modalData.etat == "Colis reçu"
                        ? COLORS.bgcolor
                        : "#a4b0be"
                    }
                  />
                  <Text
                    style={{
                      fontSize: FONTSIZE.size_20,
                      fontWeight: "bold",
                      color:
                        modalData != null && modalData.etat == "Colis reçu"
                          ? COLORS.bgcolor
                          : "#a4b0be",
                    }}
                  >
                    Colis reçu
                  </Text>
                </View>

                <View>
                  <ArrowDownFromLine size={40} color="#a4b0be" />
                </View>

                <View
                  style={{
                    marginBottom: SPACING.space_24,
                    alignItems: "center",
                    gap: SPACING.space_10,
                  }}
                >
                  <PlaneTakeoff
                    size={80}
                    color={
                      modalData != null && modalData.etat == "Colis envoyé"
                        ? COLORS.bgcolor
                        : "#a4b0be"
                    }
                  />
                  <Text
                    style={{
                      fontSize: FONTSIZE.size_20,
                      fontWeight: "bold",
                      color:
                        modalData != null && modalData.etat == "Colis envoyé"
                          ? COLORS.bgcolor
                          : "#a4b0be",
                    }}
                  >
                    Colis envoyé
                  </Text>
                </View>

                <View style={{ marginBottom: SPACING.space_24 }}>
                  <ArrowDownFromLine size={40} color="#a4b0be" />
                </View>

                <View
                  style={{
                    alignItems: "center",
                    gap: SPACING.space_10,
                  }}
                >
                  <PlaneLanding
                    size={80}
                    color={
                      modalData != null && modalData.etat == "Arrivé a Abidjan"
                        ? COLORS.bgcolor
                        : "#a4b0be"
                    }
                  />
                  <Text
                    style={{
                      fontSize: FONTSIZE.size_20,
                      fontWeight: "bold",
                      color:
                        modalData != null &&
                        modalData.etat == "Arrivé a Abidjan"
                          ? COLORS.bgcolor
                          : "#a4b0be",
                    }}
                  >
                    Arrivé a Abidjan
                  </Text>
                </View>
              </View>

              <View style={styles.ButtonContainer}>
                <TouchableOpacity
                  style={[styles.button2, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button2, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    router.push("/detaisreservation");
                  }}
                >
                  <Text style={styles.textStyle}>Voir details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ModalAdressActive = ({
  modalVisible,
  setModalVisible,
  modalData,
}: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalAdressActiveRef
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalData={modalData}
      />
    </QueryClientProvider>
  );
};

export default ModalAdressActive;

const styles = StyleSheet.create({
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

  ScreenContentCard: {
    // borderWidth: 1,
    // borderColor: COLORS.bgcolor,
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
    justifyContent: "space-between",
    gap: SPACING.space_16,
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
