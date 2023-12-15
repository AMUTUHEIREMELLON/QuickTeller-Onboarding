import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Formik, Field } from 'formik';
import { TextInput, Snackbar } from 'react-native-paper';

import TopBar from '../../components/TopBar';
import TextField from './../../components/TextField';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { getAgent, postTicket } from '../../helpers/request';

import * as validationSchema from '../../validation/ValidationSchemas';
import Styles from '../../constants/Styles';
import Color from '../../constants/Colors';

function NewIssue({ navigation }) {
  const issues = [
    { value: 'Question', label: 'Question' },
    { value: 'Incident', label: 'Incident' },
    { value: 'Problem', label: 'Problem' },
    { value: 'Feature Request', label: 'Feature Request' },
    { value: 'Refunds and Returns', label: 'Refunds and Returns' },
    { value: 'Bulk orders', label: 'Bulk orders' },
    { value: 'Refund', label: 'Refund' },
    { value: 'Request', label: 'Request' },
  ];

  const priority = [
    { value: '1', label: 'Low' },
    { value: '2', label: 'Medium' },
    { value: '3', label: 'High' },
    { value: '4', label: 'Urgent' },
  ];

  const [agentName, setAgentName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [text, setText] = useState('');
  const [data, setData] = useState();

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="New Issue" onPress={() => navigation.goBack()} />
      <View style={Styles.formContainer}>
        <ScrollView style={{ paddingHorizontal: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TextInput
              selectionColor={Color.silverChalice}
              mode="outlined"
              label="Agent ID"
              value={text}
              activeOutlineColor={Color.darkBlue}
              onChangeText={(text) => setText(text)}
              style={[Styles.textInput, { width: '70%' }]}
            />
            <Button
              style={{
                width: '25%',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: Color.darkBlue,
                borderRadius: 5,
                padding: '3%',
              }}
              textStyle={{ fontSize: 13 }}
              onPress={() =>
                getAgent(
                  text,
                  setAgentName,
                  setPhoneNumber,
                  setSnackbarMessage,
                  setSnackbarVisible,
                  setEmail,
                  setData
                )
              }
              title="Find Agent"
            />
          </View>
          <Formik
            enableReinitialize={true}
            validationSchema={validationSchema.issueValidationSchema}
            initialValues={{
              subject: '',
              name: agentName,
              phone: phoneNumber,
              type: '',
              description: '',
              priority: '',
            }}
            onSubmit={async (values) => {
              let priority = values.priority;
              let fields = {
                ...values,
                status: 2,
                priority: parseInt(priority),
              };
              postTicket(fields, navigation);
              // navigation.navigate('Dashboard');
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
              <>
                <Field
                  component={TextField}
                  name="name"
                  label="Agent Full Name"
                  value={agentName}
                  editable={false}
                />
                <Field
                  component={TextField}
                  name="phone"
                  label="Agent Phone Number"
                  value={phoneNumber}
                  editable={false}
                />
                {email && (
                  <Field
                    component={TextField}
                    name="email"
                    label="Agent Email"
                    value={email}
                    editable={false}
                  />
                )}
                <Field
                  component={TextField}
                  name="subject"
                  label="Issue Title"
                />

                <Field
                  component={Select}
                  name="type"
                  label="Select Issue Type *"
                  data={issues}
                  onValueChange={handleChange('type')}
                  selectedValue={values.type}
                  onBlur={handleBlur('type')}
                />
                {errors.type && (
                  <Text style={Styles.errorText}>{errors.type}</Text>
                )}

                <Field
                  component={TextField}
                  name="description"
                  label="Issue Description"
                  multiline={true}
                  numberOfLines={5}
                />

                <Field
                  component={Select}
                  name="priority"
                  label="Select Priority *"
                  data={priority}
                  onValueChange={handleChange('priority')}
                  selectedValue={values.priority}
                  onBlur={handleBlur('priority')}
                />
                {errors.priority && (
                  <Text style={Styles.errorText}>{errors.priority}</Text>
                )}

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
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

export default NewIssue;
