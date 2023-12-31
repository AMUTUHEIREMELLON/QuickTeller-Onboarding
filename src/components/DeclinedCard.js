import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Surface } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Text } from "@react-native-material/core";

export default function DeclinedCard(props) {
  const { onPress, style, name, color, agentId, phone, reason } = props;
  return (
    <Pressable onPress={onPress} style={[{ width: "50%" }, style]}>
      <Surface elevation={5} style={styles.surfaceStyle}>
        <View style={styles.textBox}>
          <Text style={styles.textStyle}>{agentId}</Text>
          <Text style={styles.textStyle}>{name}</Text>
          <Text style={styles.textStyle}>{phone}</Text>
          <Text style={styles.textStyle}>{reason}</Text>
        </View>

      </Surface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  surfaceStyle: {
    height: 150,
    width: 390,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    margin: "5%",
    padding: "10%",
  },
  textStyle: {
    textAlign: "left",
    padding: 5,
    fontFamily: "AvertaRegular",
    fontSize: 15,
  },

  textBox:{
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 250,
  }


});
