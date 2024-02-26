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
    comment,
  } = props;
  return (
    <Pressable onPress={onPress} style={[{ width: '50%' }, style]}>
      <View elevation={0} style={styles.surfaceStyle}>
        <View style={styles.header}>
          <Icon name={icon} color={color} size={30} />
          <Text style={styles.textStyles}>{name}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.leftSubsection}>
            <Text style={styles.textStyle}>{nin}</Text>
            <Text style={styles.textStyle}>{phone}</Text>
          </View>
          <View style={styles.rightSubsection}>
            <Text style={styles.textStyle}>{reason}</Text>
            <Text style={styles.textStyle}>{date}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.textStyle}>{comment}</Text>
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
    borderRadius: 8,
    margin: '5%',
    padding: '5%',
    backgroundColor: '#FFFFFF',
    borderColor: '#E1E6ED',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    width: 200,
    marginRight: '47%',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  leftSubsection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: '30%',
  },
  rightSubsection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: '2%',
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    width: 200,
    marginRight: '47%',
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
});