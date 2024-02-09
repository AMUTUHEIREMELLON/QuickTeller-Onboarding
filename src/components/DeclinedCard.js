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
    <View style={Styles.mainContainer}>
      <Pressable onPress={onPress} style={[{ width: '50%' }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    backgroundColor: '#FFFFFF', // Set background color to white
  },
  surfaceStyle: {
    height: 130,
    width: '200%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 0,
    borderRadius: 0,
    // marginRight: '5%',
    // padding: '10%',
    // paddingRight: '40%',
    // paddingLeft: '40%',
    // borderWidth: 0,
    // borderColor: '#E1E6ED',
    backgroundColor: '#E1F2FE',
  },
  textStyle: {
    textAlign: 'left',
    padding: 5,
    fontFamily: 'AvertaRegular',
    fontSize: 14,
    color: '#5F738C',
  },
  textStyles: {
    textAlign: 'justify',
    padding: 5,
    fontFamily: 'AvertaRegular',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#307399',
    marginLeft: 1,
  },

  textBox: {
    // paddingTop: 20,
    // paddingBottom: 10,
    // paddingRight: 100,
    // paddingLeft: 51,
    // width: 500,
    flexDirection: 'row',
  },
  rowContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 0,
  },
});
