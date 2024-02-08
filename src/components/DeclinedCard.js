import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Surface } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Text } from '@react-native-material/core';

export default function DeclinedCard(props) {
  const { onPress, style, name, color, agentId, phone, reason, icon } = props;
  return (
    <Pressable onPress={onPress} style={[{ width: '50%' }]}>
      <Surface elevation={0} style={styles.surfaceStyle}>
        <View style={styles.textBox}>
          <View style={styles.rowContainer}>
            <Icon name={icon} color={color} size={30} />
            <Text style={styles.textStyles}>{name}</Text>
          </View>
          <Text style={styles.textStyle}>{reason}</Text>
        </View>
      </Surface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  surfaceStyle: {
    // height: 150,
    width: '190%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 15,
    margin: '5%',
    // padding: '10%',
    // paddingRight: '40%',
    // paddingLeft: '40%',
    borderWidth: 0,
    borderColor: '#E1E6ED',
    // backgroundColor: '#FFFFFF',
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
  },

  textBox: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight: 100,
    paddingLeft: 80,
    width: 500,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
