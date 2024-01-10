import React, { useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Text } from '@react-native-material/core';
import { Formik, Field, useFormikContext } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';

// Import your components and styles
import TopBar from '../../components/TopBar';
import TextField from './../../components/TextField';
import Select from '../../components/Select';
import Button from '../../components/Button';

// Import your Redux action and styles
import { addNewAgentFormData } from '../../redux/reducers/formSlice';
// Replace with the actual path to your Styles file
import Styles from '../../constants/Styles'; 
const NINField = ({ name, label, keyboardType }) => {
  const { setFieldValue, setFieldError } = useFormikContext();

  const handleNINChange = async (nin) => {
    try {
      setFieldValue(name, nin);

      if (nin.length === 14) {
        const response = await axios.post(
          'https://kycidentity.azurewebsites.net/Identity/nin_verification',
          {
            Nin: nin,
            RequestReference: Date.now().toString(),
            ClientId: 'YourClientId',
            PhoneNumber: '0779848197', // Replace with actual phone number or make it dynamic
          }
        );

        const details = { name: response.data.name };
        setFieldValue('NameofBeneficiary', details.name);
      } else {
        setFieldValue('NameofBeneficiary', '');
      }
    } catch (error) {
      console.error('Error fetching NIN details:', error);
      setFieldError('NIN', 'Error verifying NIN');
    }
  };

  return (
    <View>
      <Field
        component={TextField}
        name={name}
        label={label}
        keyboardType={keyboardType}
        onChangeText={handleNINChange}
      />
    </View>
  );
};

function Beneficiary({ navigation }) {
  const relations = [
    { value: 'Mother', label: 'Mother' },
    { value: 'Father', label: 'Father' },
    { value: 'Brother', label: 'Brother' },
    { value: 'Sister', label: 'Sister' },
    { value: 'Son', label: 'Son' },
    { value: 'Daughter', label: 'Daughter' },
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Other', label: 'Other' },
  ];

  const dispatch = useDispatch();

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="New Agent" onPress={() => navigation.goBack()} />
      <View style={Styles.formContainer}>
        <Text style={Styles.h1}>Next of Kin / Beneficiary</Text>
        <ScrollView style={Styles.scrollviewStyle}>
          <Formik
            initialValues={{
              NIN: '',
              NameofBeneficiary: '',
              Residence: '',
              BeneficiaryPhoneNumber: '',
              BRelationship: '',
            }}
            onSubmit={(values) => {
              dispatch(addNewAgentFormData(values));
              navigation.navigate('Review', { data: values });
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values }) => (
              <>
                <NINField
                  name="NIN"
                  label="National Identification Number (NIN)"
                  value={values.NIN}
                  maxLength={14}
                  onChangeText={(nin) => {
                    handleChange('NIN')(nin);
                  }}
                  style={[Styles.textInput, { width: '50%' }]}
                />

                <Field
                  component={TextField}
                  name="NameofBeneficiary"
                  label="Beneficiary/Next of Kin Full Name"
                  value={values.NameofBeneficiary}
                  editable={false}
                />

                <Field
                  component={TextField}
                  name="Residence"
                  label="Residence"
                />

                <Field
                  component={TextField}
                  name="BeneficiaryPhoneNumber"
                  label="Phone Number (07-- --- ---)"
                  keyboardType="numeric"
                />

                <Field
                  component={Select}
                  name="BRelationship"
                  label="Select Relationship"
                  data={relations}
                  onValueChange={handleChange('BRelationship')}
                  selectedValue={values.BRelationship}
                  onBlur={handleBlur('BRelationship')}
                />

                <Button
                  style={Styles.nextButtonStyle}
                  onPress={handleSubmit}
                  title="Next"
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
}

export default Beneficiary;
