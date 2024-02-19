import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Formik, Field } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

import TopBar from '../../components/TopBar';
import Button from '../../components/Button';
import Radio from '../../components/Radio';
import TextField from '../../components/TextField';

import Styles from '../../constants/Styles';
import * as validationSchema from '../../validation/ValidationSchemas';
import { useDispatch } from 'react-redux';
import { addNewAgentFormData } from '../../redux/reducers/formSlice';

export default function NewAccount() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  // const agentData = route.params;
  // const terminalAgentNin = agentData.response.AgentNin;
  // const terminalAgentName = agentData.response.AgentName;
  // const terminalDateOfBirth = agentData.response.DateOfBirth;
  // const terminalSex = agentData.response.Sex;
  // const terminalPhone = agentData.response.Phone;
  // const terminalEmail = agentData.response.Email;
  // const terminalAgentTin = agentData.response.TIN_No;
  // const terminalNatureofBusiness = agentData.response.NatureofBusiness;

  const agentTypes = [
    { key: '1', value: 'Individual' },
    { key: '2', value: 'Business' },
  ];

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="Contact Info" onPress={() => navigation.goBack()} />
      <Text style={Styles.h1}>Edit Contact Info</Text>

      <View style={Styles.formContainer}>
        <ScrollView style={Styles.scrollviewStyle}>
          <Formik
            enableReinitialize={true}
            // validationSchema={validationSchema.contactInfoValidationSchema}
            initialValues={{
              // terminalAgentNin,
              // terminalAgentName,
              // terminalDateOfBirth,
              // terminalSex,
              // terminalPhone,
              // terminalEmail,
              // terminalAgentTin,
              // terminalNatureofBusiness,
            }}
            onSubmit={() => {
              // let agentData = route.params;
              // console.info({ ...agentData });
              // console.log({ ...agentData.response });
              // console.log(agentData.response.ActivityStatus);
              // dispatch(addNewAgentFormData({ ...values, ...agentData }))
              // navigation.navigate('EditAttach', { ...agentData });
              navigation.navigate('EditAttach');
            }}
          >
            {({ handleSubmit, errors, values, handleChange, isValid }) => (
              <>
                <Field
                  component={TextField}
                  name="terminalAgentNin"
                  label="NIN"
                  editable={false}
                  // value={moment().format('LL')}
                />

                <Field
                  component={TextField}
                  name="terminalAgentName"
                  label="Agent Name"
                  editable={true}
                  // value={moment().format('LL')}
                />

              
                <Field
                  component={TextField}
                  name="terminalPhone"
                  label="Phone"
                  editable={false}
                  // value={moment().format('LL')}
                />

                <Field
                  component={TextField}
                  name="terminalEmail"
                  label="Email"
                  editable={true}
                  // value={moment().format('LL')}
                />

                <Field
                  component={TextField}
                  name="terminalAgentTin"
                  label="Tin"
                  editable={true}
                  // value={moment().format('LL')}
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
    </View>
  );
}
