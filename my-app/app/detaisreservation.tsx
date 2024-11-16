import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { COLORS, SPACING } from "@/constants/Theme";
import { router } from "expo-router";

const detaisreservation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={40} color={COLORS.bgcolor} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={openModal}>
            <Image
              source={{
                uri: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
              }}
              style={styles.thumbnail}
            />
          </TouchableOpacity>

          {/* Modal pour afficher l'image en grand */}
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closeModal} // Fonctionne avec Android
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
              <Image
                source={{
                  uri: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
                }}
                style={styles.fullImage}
                resizeMode="contain"
              />
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default detaisreservation;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    padding: 16,
    flexDirection: "column",
    gap: SPACING.space_12,
    paddingHorizontal: SPACING.space_28,
  },
  thumbnail: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 16,
    color: "black",
  },
});
