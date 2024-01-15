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

  const agentData = route.params;
  const terminalDateOfRegistration = agentData.response.StageLastUpdatedOn;
  const terminalAgentName = agentData.response.AgentName

  const agentTypes = [
    { key: '1', value: 'Individual' },
    { key: '2', value: 'Business' },
  ];

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="Agent Type" onPress={() => navigation.goBack()} />
      <Text style={Styles.h1}>Edit General Info</Text>

      <View style={Styles.formContainer}>
        <ScrollView style={Styles.scrollviewStyle}>
          <Formik
            enableReinitialize={true}
            validationSchema={validationSchema.agentInfoValidationSchema}
            initialValues={{
              terminalDateOfRegistration,
              terminalAgentName,
            }}
            onSubmit={() => {
              let agentData = route.params;
              console.info({ ...agentData });
              console.log({ ...agentData.response });
              console.log(agentData.response.ActivityStatus);
              // dispatch(addNewAgentFormData({ ...values, ...agentData }))
              navigation.navigate('EditContactInfo', { ...agentData });
            }}
          >
            {({ handleSubmit, errors, values, handleChange, isValid }) => (
              <>
                <Field
                  component={TextField}
                  name="terminalDateOfRegistration"
                  label="Date of Registration"
                  editable={false}
                  // value={moment().format('LL')}
                />


                <Field
                  component={Radio}
                  data={agentTypes}
                  onValueChange={handleChange('agentType')}
                  label="Agent Type"
                  value={values.agentType}
                  style={{ backgroundColor: 'red' }}
                />
                {errors.agentType && (
                  <Text style={Styles.errorText}>{errors.agentType}</Text>
                )}

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
