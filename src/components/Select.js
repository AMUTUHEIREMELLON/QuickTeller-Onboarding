import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from '@react-native-material/core';
import { Picker } from '@react-native-picker/picker';

import Color from './../constants/Colors'

export default function Select(props) {
  const {
    data,
    onValueChange,
    selectedValue, onBlur, label
  } = props;
  const pickerRef = React.useRef();

  return (
    <>
      <Surface
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
        <Picker
          ref={pickerRef}
          mode="dropdown"
          placeholder="Select City"
          onValueChange={onValueChange}
          selectedValue={selectedValue}
          onBlur={onBlur}
        >
          <Picker.Item
            label={label}
            value=""
            key="0"
            fontFamily="AvertaRegular"
            style={{ fontSize: 14 }}
          />
          {data.map((item, index) => {
            return (
              <Picker.Item
                label={item.label.toString()}
                value={item.value}
                key={index}
                style={{ fontSize: 14 }}
                fontFamily="AvertaRegular"
              />
            );
          })}
        </Picker>
      </Surface> 
      
    </>
  );
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 14,
    color: 'red',
    paddingHorizontal: '2.5%',
  },
  textInput: {
    marginVertical: '2%',
    fontSize: 14,
  },
});

