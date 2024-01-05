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
import * as Location from 'expo-location';

import Styles from '../../constants/Styles';
import * as validationSchema from '../../validation/ValidationSchemas';
import { useDispatch } from 'react-redux';
import { addNewAgentFormData } from '../../redux/reducers/formSlice';

export default function NewAccount() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const agentData = route.params;
  const terminalDistrict = agentData.response.District;
  const terminalVillage = agentData.response.Village;
  const terminalLC = agentData.response.LC;
  const terminalSex = agentData.response.Sex;
  const terminalPhysicalLocation = agentData.response.PhysicalLocation;
  const terminalBuilding = agentData.response.Building;
  const terminalAgentTin = agentData.response.TIN_No;
  const terminalNatureofBusiness = agentData.response.NatureofBusiness;

  const agentTypes = [
    { key: '1', value: 'Individual' },
    { key: '2', value: 'Business' },
  ];

  const regionList = [
    { value: 'Central', label: 'Central' },
    { value: 'Northern', label: 'Northern' },
    { value: 'Western', label: 'Western' },
    { value: 'Eastern', label: 'Eastern' },
    { value: 'Southern', label: 'Southern' },
  ];

  const [location, setLocation] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    let locLatitude = loc.coords.latitude;
    let locLongitude = loc.coords.longitude;
    let locCoord = `${locLatitude}, ${locLongitude}`;
    setLocation(locCoord);
  };

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="New Agent" onPress={() => navigation.goBack()} />
      <Text style={Styles.h1}>Edit Location Info</Text>

      <View style={Styles.formContainer}>
        <ScrollView style={Styles.scrollviewStyle}>
          <Formik
            enableReinitialize={true}
            validationSchema={validationSchema.agentInfoValidationSchema}
            initialValues={{
              GPS_Co_ordinates: location,
              terminalDistrict,
              terminalVillage,
              terminalLC,
              terminalSex,
              terminalPhysicalLocation,
              terminalBuilding,
              terminalAgentTin,
              terminalNatureofBusiness,
            }}
            onSubmit={() => {
              let agentData = route.params;
              console.info({ ...agentData });
              console.log({ ...agentData.response });
              console.log(agentData.response.ActivityStatus);
              // dispatch(addNewAgentFormData({ ...values, ...agentData }))
              navigation.navigate('', { ...agentData });
            }}
          >
            {({
              handleSubmit,
              errors,
              values,
              handleChange,
              handleBlur,
              isValid,
            }) => (
              <>
                <Field
                  component={Select}
                  name="Region"
                  label="Select Region *"
                  data={regionList}
                  onValueChange={handleChange('Region')}
                  selectedValue={values.Region}
                  onBlur={handleBlur('Region')}
                />

                <Field
                  component={TextField}
                  name="terminalDistrict"
                  label="District"
                  editable={false}
                  // value={moment().format('LL')}
                />

                <Field
                  component={TextField}
                  name="terminalVillage"
                  label="Village"
                  editable={true}
                  // value={moment().format('LL')}
                />

                <Field
                  component={TextField}
                  name="terminalLC"
                  label="LC1"
                  editable={false}
                  // value={moment().format('LL')}
                />

                <Field
                  component={TextField}
                  name="terminalPhysicalLocation"
                  label="Physical Location"
                  editable={false}
                  // value={moment().format('LL')}
                />

                <Field
                  component={TextField}
                  name="GPS_ Co_ordinates"
                  label="GPS Coordinates *"
                  editable={false}
                  value={location}
                />

                <Field
                  component={TextField}
                  name="terminalBuilding"
                  label="Building"
                  editable={false}
                  // value={moment().format('LL')}
                />

                <Field
                  component={Select}
                  name="TypeofShop"
                  label="Select Type of Shop *"
                  data={shops}
                  onValueChange={handleChange('TypeofShop')}
                  selectedValue={values.TypeofShop}
                  onBlur={handleBlur('TypeofShop')}
                />

                <Field
                  component={TextField}
                  name="terminalAgentTin"
                  label="Tin"
                  editable={false}
                  // value={moment().format('LL')}
                />

                <Field
                  component={TextField}
                  name="terminalNatureofBusiness"
                  label="Nature of Business"
                  editable={true}
                  // value={moment().format('LL')}
                />

                {/* <Field
                  component={Radio}
                  data={agentTypes}
                  onValueChange={handleChange('agentType')}
                  label="Agent Type"
                  value={values.agentType}
                  style={{ backgroundColor: 'red' }}
                />
                {errors.agentType && (
                  <Text style={Styles.errorText}>{errors.agentType}</Text>
                )} */}

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
