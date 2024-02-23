import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Surface } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Text } from '@react-native-material/core';
import Styles from '../constants/Styles';

export default function DeclinedCard(props) {
  const {
    onPress,
    style,
    name,
    color,
    agentId,
    phone,
    reason,
    icon,
    date,
    nin,
  } = props;
  return (
    <Pressable onPress={onPress} style={[{ width: '50%' }, style]}>
    <View elevation={0} style={styles.surfaceStyle}>
          <View style={styles.textBox}>
            <View style={styles.rowContainer}>
              <View style={styles.iconContainer}>
                <Icon name={icon} color={color} size={30} />
                <Text style={styles.textStyles}>{name}</Text>
              </View>
              <Text style={styles.textStyle}>{nin}</Text>
              <Text style={styles.textStyle}>{phone}</Text>
            </View>
            <View style={styles.rowContainer2}>
              <Text style={styles.textStyle}>{reason}</Text>
              <Text style={styles.textStyle}>{date}</Text>
            </View>
            
          </View>
        </View>
  </Pressable>
);
}

const styles = StyleSheet.create({
surfaceStyle: {
  height: 130,
  width: '190%',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 15,
  margin: '5%',
  padding: '10%',
  // paddingRight: '40%',
  // paddingLeft: '40%',
  // borderWidth: 1.5,
  // borderColor: '#E1E6ED',
  backgroundColor: '#FFFFFF',
},
textStyle: {
  textAlign: 'left',
  padding: 1,
  fontFamily: 'AvertaRegular',
  fontSize: 13,
  color: '#5F738C',
},
textStyles: {
  textAlign: "justify",
  padding: 5,
  fontFamily: "AvertaRegular",
  fontSize: 14,
  fontWeight: 'bold',
  color: "#307399",
  marginLeft: 0,
},

textBox: {
  // paddingTop: 20,
  // paddingBottom: 10,
  // paddingRight: 100,
  paddingLeft: 10,
  // width: 500,
  flexDirection: 'row',
},

rowContainer: {
  flexDirection: 'column',
  alignItems: 'flex-start',
  // marginRight: 1,
},
iconContainer: {
  flexDirection: 'row',
  marginBottom: 10,
  // backgroundColor: 'blue',
  width: 190
},
rowContainer2: {
  marginTop: 40,
  // backgroundColor: 'black',
},
});
