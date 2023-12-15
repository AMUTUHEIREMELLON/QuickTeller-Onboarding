import React from "react";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

import Styles from "../constants/Styles";

export default function CustomButton(props) {
  const { style, onPress, disabled, title, textStyle, isLoading } = props;

  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
      <View>
       {isLoading ?
            <ActivityIndicator size="small" color="#ffffff" /> : 
            <Text
            style={[Styles.buttonLabelStyle, { textAlign: "center" }, textStyle]}>
                {title}
            </Text>
        }
      </View>
    </TouchableOpacity>
  );
}
