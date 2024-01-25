import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Districts } from '../constants/Districts';
import Color from '../constants/Colors';

const DistrictsList = ({ selectedValue, onValueChange }) => {
  return (
    <RNPickerSelect
   
      items={Districts.map((district) => ({
        label: district.label,
        value: district.code,
      }))}
      placeholder={{ label: 'Select a district', value: null }}
      onValueChange={onValueChange}
      value={selectedValue}
    />
  );
};

export default DistrictsList;
