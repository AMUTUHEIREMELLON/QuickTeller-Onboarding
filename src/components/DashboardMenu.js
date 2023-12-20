import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Surface } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Text } from "@react-native-material/core";

export default function DashboardMenu(props) {
  const { onPress, style, icon, color, title } = props;
  return (
    <Pressable onPress={onPress} style={[{ width: "50%" }, style]}>
      <Surface elevation={5} style={styles.surfaceStyle}>
        <Icon name={icon} color={color} size={40} />
        <Text style={styles.textStyle}>{title}</Text>
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
    padding: "5%",
  },
  textStyle: {
    textAlign: "center",
    padding: 5,
    fontFamily: "AvertaRegular",
    fontSize: 14,
  },

  declineCard:{
    width: 10,
  }
});
