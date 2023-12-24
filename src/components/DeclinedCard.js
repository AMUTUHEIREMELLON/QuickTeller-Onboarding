import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Surface } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Text } from "@react-native-material/core";

export default function DeclinedCard(props) {
  const { onPress, style, name, color, agentId, phone, reason } = props;
  return (
    <Pressable onPress={onPress} style={[{ width: "50%" }, style]}>
      <Surface elevation={5} style={styles.surfaceStyle}>
        <Text style={styles.textStyle}>{agentId}</Text>
        <Text style={styles.textStyle}>{name}</Text>
        <Text style={styles.textStyle}>{phone}</Text>
        <Text style={styles.textStyle}>{reason}</Text>

      </Surface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  surfaceStyle: {
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    margin: "5%",
    padding: "15%",
  },
  textStyle: {
    textAlign: "left",
    padding: 5,
    fontFamily: "AvertaRegular",
    fontSize: 14,
  },


});
