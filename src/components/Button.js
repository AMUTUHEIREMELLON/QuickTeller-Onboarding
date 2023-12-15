import React from "react";
import { Text, TouchableOpacity } from "react-native";

import Styles from "../constants/Styles";

export default function Button(props) {
  const { style, onPress, disabled, title, textStyle } = props;
  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
      <Text
        style={[Styles.buttonLabelStyle, { textAlign: "center" }, textStyle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
