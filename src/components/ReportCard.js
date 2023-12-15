import React from "react";
import { Text } from "react-native";
import { Surface } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Styles from "../constants/Styles";

export default function ReportCard(props) {
  const { backgroundColor, icon, applications, status } = props;
  return (
    <Surface
      style={{
        width: "100%",
        height: 120,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor,
        marginBottom: "10%",
      }}
      elevation={5}
    >
      <Icon name={icon} color="black" size={30} />
      <Text style={Styles.h2}>{applications}</Text>
      <Text style={{ fontSize: 14, fontFamily: "AvertaSemiBold" }}>
        {status} Applications
      </Text>
    </Surface>
  );
}
