import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Accordion from '../components/Accordion'; 

function CustomHeader({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CustomHeader;
