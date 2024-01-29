import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Text, View, ScrollView } from 'react-native';

import { Districts } from '../constants/Districts';
import Color from '../constants/Colors';

const DistrictsList = ({ selectedValue, onValueChange }) => {
  return (
    <View
      elevation={2}
      mode="outlined"
      category="medium"
      style={{
        padding: 5,
        marginVertical: 5,
        backgroundColor: Color.lightCultured,
        borderBottomColor: 'red',
      }}
    >
      <RNPickerSelect
        items={Districts.map((district) => ({
          label: district.label,
          value: district.code,
        }))}
        placeholder={{ label: 'Select a district', value: null }}
        onValueChange={onValueChange}
        value={selectedValue}
      />
    </View>
  );
};

export default DistrictsList;
