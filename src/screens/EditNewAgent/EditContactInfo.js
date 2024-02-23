import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Formik, Field } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

import TopBar from '../../components/TopBar';
import Button from '../../components/Button';
import Radio from '../../components/Radio';
import TextField from '../../components/TextField';
import Select from '../../components/Select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Snackbar, ActivityIndicator } from 'react-native-paper';
import Color from '../../constants/Colors';

import Styles from '../../constants/Styles';
import * as validationSchema from '../../validation/ValidationSchemas';
import { useDispatch } from 'react-redux';
import { addNewAgentFormData } from '../../redux/reducers/formSlice';

export default function NewAccount(props) {
  const { onFormSubmit } = props;


  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { decline } = route.params;

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [noNinDob, setNoNinDob] = useState('');
 const maxDate = moment().subtract(18, 'years');
  const showDatePicker = () => {
    setOpen(true);
  };

  const onDateSelected = (e, value) => {
    setOpen(false);
    console.log(value);
    setNoNinDob(value);
    setDate(value);
    setText(moment(value).format('LL'));
  };

 

  const genders = [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
    { label: 'Not Applicable', value: '0' },
  ];

  return (
    <View style={Styles.dropContainer}>
      {/* <TopBar title="Contact Info" onPress={() => navigation.goBack()} /> */}
      <Text style={Styles.h1}>Edit Contact Info</Text>

      <View style={Styles.formContainer}>
        <ScrollView style={Styles.scrollviewStyle}>
          <Formik
            enableReinitialize={true}
            // validationSchema={validationSchema.contactInfoValidationSchema}
            initialValues={{
              terminalAgentNin: decline.AgentNin,
              terminalAgentName: decline.AgentName,
              terminalPhone: decline.Phone,
              terminalEmail: decline.Email,
              Sex: decline.Sex,
              DateOfBirth: decline.DateOfBirth,
            }}
            onSubmit={() => {
              // let agentData = route.params;
              // console.info({ ...agentData });
              // console.log({ ...agentData.response });
              // console.log(agentData.response.ActivityStatus);
              // dispatch(addNewAgentFormData({ ...values, ...agentData }))
              // navigation.navigate('EditAttach', { ...agentData });
              onFormSubmit();
              navigation.navigate('EditAgentKyc');
            }}
          >
            {({
              handleSubmit,
              handleBlur,
              errors,
              values,
              handleChange,
              isValid,
            }) => (
              <>
                <Field
                  component={TextField}
                  name="terminalAgentNin"
                  label="NIN"
                  editable={false}
                />

                <Field
                  component={TextField}
                  name="terminalAgentName"
                  label="Agent Name"
                  editable={true}
                />
                <>
                    <TextInput
                      label="Date of Birth"
                      name="DateOfBirth"
                      value={text}
                      onPressIn={showDatePicker}
                      showSoftInputOnFocus={false}
                      selectionColor={Color.silverChalice}
                      mode="outlined"
                      activeOutlineColor={Color.darkBlue}
                      style={Styles.textInput}
                      // editable={!ninError === null}
                    /> 
                    {open && (
                      <DateTimePicker
                        value={date}
                        maximumDate={new Date(maxDate)}
                        mode={'date'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onDateSelected}
                        // editable={ninError === null}
                        
                      />
                      )} 
                </>
                <Field
                  component={Select}
                  name="Sex"
                  label="Gender *"
                  data={genders}
                  selectedValue={values.Sex}
                  onBlur={handleBlur('Sex')}
                  onValueChange={handleChange('Sex')}
                />

                <Field
                  component={TextField}
                  name="terminalPhone"
                  label="Phone"
                  editable={false}
                />

                <Field
                  component={TextField}
                  name="terminalEmail"
                  label="Email"
                  editable={true}
                />

                {/* <Field
                  component={TextField}
                  name="terminalAgentTin"
                  label="Tin"
                  editable={true}
                /> */}

                <Button
                  style={Styles.nextButtonStyle}
                  onPress={handleSubmit}
                  disabled={!isValid}
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
