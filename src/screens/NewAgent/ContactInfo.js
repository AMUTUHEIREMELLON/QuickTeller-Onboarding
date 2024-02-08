import { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Formik, Field } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Snackbar, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import uuid from 'react-native-uuid';

import TopBar from '../../components/TopBar';
import TextField from './../../components/TextField';
import Button from '../../components/Button';
import Select from '../../components/Select';

import Styles from '../../constants/Styles';
import Color from '../../constants/Colors';
import Messages from '../../constants/Messages';
import PageHeader from '../../components/PageHeader';

import * as validationSchema from '../../validation/ValidationSchemas';
import { makeSignature } from '../../helpers/makeSignature';
import axios from 'axios';


import { addNewAgentFormData } from '../../redux/reducers/formSlice';


import {
  clearNinDetails,
  fetchSmileData,
  setSnackbarVisible,
  
} from '../../redux/reducers/ninSlice';

function ContactInfo(props) {
  const { onFormSubmit } = props;
  const randomRequestReference = uuid.v4();

  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
 const [name, setName] = useState('');
  
  const { agentName } = useSelector((store) => store.ninDataStore);
  console.log('logged data',  agentName)

  const { dob } = useSelector((store) => store.ninDataStore);
  const { dateText } = useSelector((store) => store.ninDataStore);
  const { snackbarVisible } = useSelector((store) => store.ninDataStore);
  const { snackbarMessage } = useSelector((store) => store.ninDataStore);
  const { gender } = useSelector((store) => store.ninDataStore);
  const { isLoading } = useSelector((store) => store.ninDataStore);
  const ninError = useSelector((store) => store.ninDataStore.error);

  const signatureDetails = makeSignature();


  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  // const [showDatePicker, setShowDatePicker] = useState(false); 

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

  const smileData = {
    // source_sdk: 'rest_api',
    // source_sdk_version: '1.0.0',
    // signature: signatureDetails.signature,
    // timestamp: signatureDetails.timestamp,
    // partner_params: {
    //   user_id: 'INTS',
    //   job_id: 'INT',
    //   job_type: 5,
    // },
    // country: 'UG',
    // id_type: 'NATIONAL_ID_NO_PHOTO',
    // id_number: id,
    // partner_id: '2384',
    NIN: id, // Assuming id is the NIN
    phoneNumber: phone,
    RequestReference: randomRequestReference,
  };

  const { agentType } = useSelector((store) => store.formDataStore.newAgent);
   
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(clearNinDetails());
  }, []);

  // useEffect to trigger action when ID reaches 14 characters
  useEffect(() => {
    if (id.length === 14 && phone.length === 10) {
      const data = dispatch(fetchSmileData(smileData)); 
      console.log('new name  ', data)
    }
  }, [id, phone]);

  


  return (
    <View style={[{ zIndex: 1 }, Styles.dropContainer]}>
      {/* <TopBar title="New Agent" onPress={() => navigation.goBack()} /> */}
      {/* <PageHeader 
          icon="account-multiple-plus"
          title="Set up a new agent"
          content='To set up a new agent, provide all relevant information necessary for the KYC below.'
          onPress={() => 
            navigation.goBack()}
        /> */}

      <View style={Styles.formContainer}>
        <Text style={Styles.h1}>Contact Info</Text>
        <ScrollView style={Styles.scrollviewStyle}>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <TextInput
              selectionColor={Color.silverChalice}
              outlineColor={Color.blueMunsell}
              mode="outlined"
              label="Agent NIN"
              value={id}
              maxLength={14}
              // onChangeText={(id) => setId(id)}
              onChangeText={(text) => setId(text)}
              activeOutlineColor={Color.darkBlue}
              style={[Styles.textInput, { width: '100%' }]}
            />

            {/* <Button
              style={{
                width: '45%',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: Color.darkBlue,
                borderRadius: 5,
                padding: '5%',
              }}
              textStyle={{ fontSize: 13 }}
              onPress={() => {
                dispatch(fetchSmileData(smileData));
              }}
              title="Check NIN"
            /> */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <TextInput
              selectionColor={Color.silverChalice}
              outlineColor={Color.blueMunsell}
              mode="outlined"
              label="Phone"
              value={phone}
              maxLength={10}
              // onChangeText={(id) => setId(id)}
              onChangeText={(text) => setPhone(text)}
              keyboardType="numeric"
              activeOutlineColor={Color.darkBlue}
              style={[Styles.textInput, { width: '100%' }]}
            />
          </View>


          {isLoading && (
            <ActivityIndicator
              size="small"
              color={Color.red}
              animating={isLoading}
            />
          )}

          <Formik
            enableReinitialize={true}
            // validationSchema={validationSchema.contactInfoValidationSchema}
            initialValues={{
              AgentName: agentName,
              AgentNin: id,
              Phone: phone,
              DateOfBirth: '',
              Email: '',
              Sex: gender,
            }}
            onSubmit={(values) => {
              if (ninError === null) {
                dispatch(
                  addNewAgentFormData({
                    ...values,
                    DateOfBirth: dob,
                    Sex: gender === 'M' ? 1 : 2,
                    isNinValidated: true,
                    NumberOfOutlets: agentType === 'Individual' ? 1 : undefined,
                    DirectorName:
                      agentType === 'Individual' ? values.AgentName : undefined,
                  })
                );
              } else {
                dispatch(
                  addNewAgentFormData({
                    ...values,
                    DateOfBirth: new Date(noNinDob).toISOString(),
                    isNinValidated: false,
                    NumberOfOutlets: agentType === 'Individual' ? 1 : undefined,
                    DirectorName:
                      agentType === 'Individual' ? values.AgentName : undefined,
                  })
                );
              }

              onFormSubmit(); // Call the callback function from props

              navigation.navigate(
                agentType === 'Individual' ? 'AgentKyc' : 'CompanyInfo'
              );
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
                  name="AgentName"
                  value={agentName}
                  
                  label="Agent Full Name *"
                  editable={!ninError ? false : true}
                />

                {/* {ninError && ( */}
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
                    {text === '' && (
                      <Text style={Styles.errorText}>
                        {Messages.requiredMessage}
                      </Text>
                    )}

                    <Field
                      component={Select}
                      name="Sex"
                      label="Gender *"
                      data={genders}
                      onValueChange={handleChange('Sex')}
                      selectedValue={values.Sex}
                      onBlur={handleBlur('Sex')}
                      editable={ninError === null}
                    />
                    {errors.Sex && (
                      <Text style={Styles.errorText}>{errors.Sex}</Text>
                    )}
                  </>
                {/* )}

                {!ninError && (
                  <>
                    <Field
                      component={TextField}
                      name="DateofBirth"
                      label="Date of Birth"
                      value={dateText}
                      editable={ninError === null ? false : true}
                    />

                    <Field
                      component={TextField}
                      name="Sex"
                      label="Gender"
                      editable={ninError === null ? false : true}
                    />
                  </> */}
                {/* )} */}

                {/* <Field
                  component={TextField}
                  name="Phone"
                  label="Phone Number (07-- --- ---) *"
                  keyboardType="numeric"
                  maxLength={10}
                /> */}

                <Field
                  component={TextField}
                  name="Email"
                  label="Email"
                  keyboardType="Email-address"
                />

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
      {/* <Snackbar
        style={[Styles.snackbarStyle]}
        action={{
          label: 'Please fill in your details',
        }}
        visible={snackbarVisible}
        onDismiss={() => dispatch(setSnackbarVisible(false))}
      >
        {snackbarMessage}
      </Snackbar> */}

<Snackbar
  style={[Styles.snackbarStyle]}
  action={{
    label: 'Please fill in your details',
  }}
  visible={snackbarVisible}
  onDismiss={() => dispatch(setSnackbarVisible(false))}
>
  {snackbarMessage && typeof snackbarMessage === 'object' ? (
    <Text>
      {snackbarMessage.errors?.NIN && snackbarMessage.errors.NIN.join('\n')}
      {snackbarMessage.errors?.PhoneNumber && snackbarMessage.errors.PhoneNumber.join('\n')}
      {snackbarMessage.errors?.RequestReference && snackbarMessage.errors.RequestReference.join('\n')}
    </Text>
  ) : (
    snackbarMessage
  )}
</Snackbar>

    </View>
  );
}

export default ContactInfo;
