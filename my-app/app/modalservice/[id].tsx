import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const modalservice = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log(id);

  return (
    <View>
      <Text>modalservice</Text>
    </View>
  );
};

export default modalservice;

const styles = StyleSheet.create({});
