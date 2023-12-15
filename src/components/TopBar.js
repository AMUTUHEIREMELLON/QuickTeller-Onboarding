import React from "react";
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Color from "./../constants/Colors";
import Styles from "./../constants/Styles";

export default function TopBar(props) {
  const { title, onPress } = props;
  return (
    <AppBar
      title={title}
      color={
        title === "New Agent" || title === "Reports" || title === "Card OnBoarding"
          ? Color.blueMunsell
          : Color.yellow
      }
      tintColor={ 
        title === "New Agent" || title === "Reports"  || title === "Card OnBoarding" ? "white" : Color.black
      }
      titleStyle={[Styles.avertaExtraBold, { fontSize: 18 }]}
      leading={(props) => (
        <IconButton
          style={{ marginRight: "-5%" }}
          icon={(props) => <Icon name="chevron-left" {...props} />}
          {...props}
          onPress={onPress}
        />
      )}
    />
  );
}
