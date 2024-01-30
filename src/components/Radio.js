import React from "react";
import { View, Text } from "react-native";
import { Surface } from "@react-native-material/core";
import { RadioButton } from "react-native-paper";

import Styles from "../constants/Styles";
import Colors from "./../constants/Colors";

export default function Radio(props) {
  const { data, onValueChange, label, value } = props;

  return (
    <>
      <Surface
        elevation={2}
        category="medium"
        style={{
          padding: 5,
          borderRadius: 10,
          margin: 5,
        }}
      >
        <View style={Styles.radioButtonContainer}>
          <Text style={Styles.labelStyle}>{label}</Text>
          <RadioButton.Group onValueChange={onValueChange} value={value}>
            {data.map((item) => {
              return (
                <View
                  style={Styles.radioButtonContainer}
                  key={item.key.toString()}
                >
                  <RadioButton
                    value={item.value.toString()}
                    color={Colors.radioblue}
                    key={item.key.toString()}
                  />
                  <Text style={Styles.viewStyle}>{item.value.toString()}</Text>
                </View>
              );
            })}
          </RadioButton.Group>
        </View>
      </Surface>
    </>
  );
}
