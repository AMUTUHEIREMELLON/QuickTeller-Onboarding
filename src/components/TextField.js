import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, useTheme  } from 'react-native-paper';
import { Text } from '@react-native-material/core';

import Color from './../constants/Colors';
import Styles from '../constants/Styles';

const TextField = (props) => {
  const {
    field: { label, name, onBlur, onChange, value },
    form: { errors },
    ...inputProps
  } = props;

  const hasError = errors[name];
  const theme = useTheme();

  return (
    <>
      <TextInput
        selectionColor={Color.silverChalice}
        mode="outlined"
        label={label}
        activeOutlineColor={Color.darkBlue}
        outlineColor={ Color.blueMunsell}
        style={Styles.textInput}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && (
        <Text style={Styles.errorText}>
          {errors[name]}
        </Text>
      )}
    </>
  );
};

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

export default TextField;
