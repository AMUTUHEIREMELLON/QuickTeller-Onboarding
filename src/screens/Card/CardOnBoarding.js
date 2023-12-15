import { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Formik, Field } from 'formik';
import { TextInput, Snackbar, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import TopBar from '../../components/TopBar';
import TextField from './../../components/TextField';
import Button from '../../components/CustomButton';
import Select from '../../components/Select';

import Styles from '../../constants/Styles';
import Color from '../../constants/Colors';
import Messages from '../../constants/Messages';
import { iciValidationSchema } from '../../validation/ICISchema';
import {fetchSmileIdentityData} from '../../redux/reducers/smileIdentitySlice';
import { postCardData } from '../../redux/reducers/cardOnboardingSlice';


export default function CardOnBoarding() {
  const { smileStatus, smileError } = useSelector((store) => store.smileIdentityStore);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [userNin, setUserNin] = useState('');
  const [lastName, setLastName] = useState('');
  const [givenNames, setGivenNames] = useState('');
  const [displayNames, setDisplayNames] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const pTitles = [
    { label: 'Mr', value: '1' },
    { label: 'Mrs', value: '2' },
    { label: 'Miss', value: '3' },
  ];

  const saveCardData = async (values) => {
    values.displayName = displayNames;

    try {
      const iciResponse = await dispatch(postCardData(values)).unwrap();
      if(iciResponse.respCode === '00') {
        
      } else {

      }
    } catch (error) {
      Toast.show({type: 'error', text2: error.message})
    }
  }

  const fetchSmileIdentityInfo = async () => {
    try {
      const smileData = await dispatch(fetchSmileIdentityData(userNin)).unwrap();
      if (smileData.ResultCode === '1012') {
        setLastName(smileData.FullData.surname);
        setGivenNames(smileData.FullData.givenNames);
        setDisplayNames(smileData.FullName);
        setPhoneNumber(smileData.PhoneNumber)
      } else {
        Toast.show({type: 'error', text2: smileData.ResultText})
      }
    } catch (error) {
      Toast.show({type: 'error', text2: error.message})
    }
  }

    return (
        <View style={[{ zIndex: 1 }, Styles.mainContainer]}>
      <TopBar title="Card OnBoarding" onPress={() => navigation.goBack()} />

      <View style={Styles.formContainer}>

      <ScrollView style={Styles.scrollviewStyle}>
         
          <Formik
            enableReinitialize={true}
            validationSchema={iciValidationSchema}
            initialValues={{
              cardPan: '',
              phoneNumber: phoneNumber,
              nin: userNin,
              personTitle: '',
              surname: lastName,
              givenName: givenNames,
              address1: '',
              address2: '',
              email: ''
            }}
            onSubmit={(values) => {
              saveCardData(values);
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
               <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-evenly',
                }}
              >
                <TextInput
                  mode="outlined"
                  label="NIN"
                  value={userNin}
                  maxLength={14}
                  onChangeText={(id) => setUserNin(id)}
                  activeOutlineColor={Color.darkBlue}
                  style={[Styles.textInput, { width: '55%' }]}
                />
                <Button
                  style={{
                    width: '40%',
                    alignItems: 'center',
                    alignSelf: 'center',
                    backgroundColor: Color.darkBlue,
                    borderRadius: 5,
                    padding: '5%',
                    marginTop: 3,
                    marginLeft: 5
                  }}
                  textStyle={{ fontSize: 13 }}
                  onPress={fetchSmileIdentityInfo}
                  title="Check NIN"
                  isLoading={smileStatus === 'loading'}
                />
              </View>
                <Field
                  component={Select}
                  name="personTitle"
                  label="Title *"
                  data={pTitles}
                  onValueChange={handleChange('personTitle')}
                  selectedValue={values.personTitle}
                  onBlur={handleBlur('personTitle')}
                />
                {errors.personTitle && (
                  <Text style={Styles.errorText}>{errors.personTitle}</Text>
                )}

                 <Field
                  component={TextField}
                  name="givenName"
                  label="Given Name *"
                  editable={false}
                />

                <Field
                  component={TextField}
                  name="surname"
                  label="Last Name *"
                  editable={false}
                />

                <Field
                  component={TextField}
                  name="phoneNumber"
                  label="Phone Number *"
                  keyboardType="numeric"
                  maxLength={10}
                />

                <Field
                  component={TextField}
                  name="cardPan"
                  label="Card PAN *"
                  keyboardType="numeric"
                  maxLength={19}
                />

                <Field
                  component={TextField}
                  name="address1"
                  label="Address 1 *"
                />

                <Field
                  component={TextField}
                  name="address2"
                  label="Address 2"
                />

                <Field
                  component={TextField}
                  name="email"
                  label="Email"
                  keyboardType="email-address"
                />

                {/* <Field
                  component={TextField}
                  name="TIN_No"
                  label="Agent TIN"
                  keyboardType="numeric"
                  maxLength={10}
                />

                <Field
                  component={TextField}
                  name="NatureofBusiness"
                  label="Nature of Business *"
                /> */}

                <Button
                  style={Styles.nextButtonStyle}
                  onPress={handleSubmit}
                  title="Submit"
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
    </View>
    )
}