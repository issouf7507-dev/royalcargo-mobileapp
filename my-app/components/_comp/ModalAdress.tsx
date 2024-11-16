import {
  Alert,
  Modal,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "@/constants/Theme";
import { CircleX } from "lucide-react-native";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
const queryClient = new QueryClient();

const ModalAdressRef = ({ modalVisible, setModalVisible, modalData }: any) => {
  // const params: any = useLocalSearchParams<any>();
  const shareText = `重要须知（埋头）: 包装上必须写明客户的姓名和国外电话号码。
  客户姓名和编号 : (${modalData && modalData.nom} ${
    modalData && modalData.numero
  } 
                  ${modalData && modalData.service})
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
      //   `https://royalcargo225.com:9100/api/v01/adress/${params.id}`,
      `s`,
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

  // console.log(modalData);
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
                Merci pour votre réservation, les informations relatives à
                celle-ci se trouvent ci-dessous.
              </Text>

              <View style={styles.ContentCardInfo}>
                <Text style={styles.ContentCardText}>
                  Nom : {modalData && modalData.nom}
                </Text>
                <Text style={styles.ContentCardText}>
                  Téléphone : {modalData && modalData.numero}
                </Text>
                <Text style={styles.ContentCardText}>
                  Date de reservation : {modalData && modalData.daten}
                </Text>

                <Text style={styles.ContentCardText}>
                  Status : {modalData && modalData.etat}
                </Text>

                <Text style={styles.ContentCardText}>
                  Information du Service : {modalData && modalData.service}
                </Text>

                {/* <Text style={styles.ContentCardText}>
                  Numero du suivi : {modalData && modalData.trackCode}{" "}
                </Text> */}
              </View>

              {/*  */}

              <View style={styles.ContenntAdresse}>
                <Text style={styles.AdressTitle}>Adresse</Text>
                <Text style={styles.AdressDesc}>
                  Il s'agit de l'adresse à envoyer au fournisseur.
                </Text>

                <Text style={styles.Adress}>
                  重要须知（埋头）: 包装上必须写明客户的姓名和国外电话号码。
                  客户姓名和编号 : ({modalData && modalData.nom}{" "}
                  {modalData && modalData.numero}
                  {modalData && modalData.service}) 是否有内置电池。
                  中国广州市越秀区环市中路205号恒生大厦B座903-2 电话 : +86 186
                  2097 5453 / +86 188 0207 2454 注意：不接受快递费。
                  收货时间：12.00 - 20.30 违禁品将被拒收。
                  如有虚假申报，在机场进行虚假申报或扣押货物的所有相关费用均由当事人自行承担！
                </Text>
              </View>

              {/*  */}

              <View style={styles.ButtonContainer}>
                <TouchableOpacity
                  style={styles.ShareButton}
                  onPress={handleShare}
                >
                  <Text style={styles.ShareButtonText}>Partager</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button2, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Modaldetail = ({ modalVisible, setModalVisible, modalData }: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalAdressRef
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalData={modalData}
      />
    </QueryClientProvider>
  );
};

export default Modaldetail;

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
