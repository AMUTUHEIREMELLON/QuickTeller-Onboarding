import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Surface } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Text } from "@react-native-material/core";

export default function DashboardMenu(props) {
  const { onPress, style, icon, color, title, subtitle } = props;
  return (
    <Pressable onPress={onPress} style={[{ width: "50%" }, style]}>
      <Surface elevation={0} style={styles.surfaceStyle}>
      <View>
        <Icon name={icon} color={color} size={40} />
        <Text style={styles.textStyles}>{title}</Text>
        <Text style={styles.textStyle}>{subtitle}</Text>
      </View>
      </Surface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // surfaceStyle: {
  //   height: 110,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 15,
  //   margin: "5%",
  //   padding: "5%",
  // },
  // textStyle: {
  //   textAlign: "center",
  //   padding: 5,
  //   fontFamily: "AvertaRegular",
  //   fontSize: 14,
  // },

  surfaceStyle: {
    height: 170,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 5,
    padding: 5,
    borderWidth: 1 ,
    borderColor: "#E1E6ED",
    backgroundColor: "#FFFFFF",
    
    
  },
  textStyle: {
    textAlign: "justify",
    padding: 5,
    fontFamily: "AvertaRegular",
    fontSize: 14,
    color: "#5F738C"
  },

  textStyles: {
    textAlign: "justify",
    padding: 5,
    fontFamily: "AvertaRegular",
    fontSize: 14,
    fontWeight: "bold",
    color: "#353F50"
  },


});
