import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@react-native-material/core';
import { Formik, Field } from 'formik';
import { TextInput, Snackbar, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import TopBar from '../../components/TopBar';
import TextField from '../../components/TextField';
import Color from '../../constants/Colors';
import Button from '../../components/Button';
import Styles from '../../constants/Styles';
import { findAgent } from '../../redux/reducers/agentSlice';
import { addExistingAgentFormData } from '../../redux/reducers/formSlice';
import { clearAgentDetails } from '../../redux/reducers/agentSlice';

function Existing() {
  const navigation = useNavigation();
  const route = useRoute();
  const [text, setText] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const data = useSelector((store) => store.agentDataStore.agentDetails)
  const { isLoading } = useSelector((store) => store.agentDataStore)
  const agentName = data.AgentName
  const phoneNumber = data.Phone
  const email = data.Email
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAgentDetails())
  }, []);

  return (
    <View style={Styles.mainContainer}>
      <TopBar
        color="red"
        title="Existing Agent"
        onPress={() => navigation.goBack()}
      />
      <View style={Styles.formContainer}>
        <Text style={Styles.h1}>Agent Info</Text>

        <ScrollView style={{ paddingHorizontal: 10 }}>
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
              maxLength={9}
              onChangeText={(text) => setText(text)}
              activeOutlineColor={Color.darkBlue}
              style={[Styles.textInput, { width: '50%' }]}
              left={<TextInput.Icon icon="account-filter" />}
            />
            <Button
              style={{
                width: '45%',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: Color.darkBlue,
                borderRadius: 5,
                padding: '3%',
              }}
              textStyle={{ fontSize: 13 }}
              onPress={() => {
                dispatch(findAgent(text))
              }}
              title="Find Agent"
            />
          </View>

          <Formik
            dirty={false}
            enableReinitialize={true}
            initialValues={{
              agentName: agentName,
              phoneNumber: phoneNumber,
              email: email,
            }}
            onSubmit={() => {
              let { TempUseSessionId } = route.params
              dispatch(addExistingAgentFormData(data))
              navigation.navigate('LocationInfo', {
                TempUseSessionId,
              });

            }}
          >
            {({ handleSubmit }) => (
              <>
                {agentName && (
                  <Field
                    component={TextField}
                    name="agentName"
                    value={agentName}
                    label="Agent Name"
                    editable={false}
                    left={<TextInput.Icon icon="face-agent" />}
                  />
                )}

                {phoneNumber && (
                  <Field
                    component={TextField}
                    name="phoneNumber"
                    label="Phone Number"
                    value={phoneNumber}
                    editable={false}
                    left={<TextInput.Icon icon="cellphone" />}
                  />
                )}
                {email && (
                  <Field
                    component={TextField}
                    name="email"
                    label="Email"
                    value={email}
                    editable={false}
                    left={<TextInput.Icon icon="email-variant" />}
                  />
                )}
                {agentName && (
                  <View>
                    <Button
                      style={[Styles.nextButtonStyle]}
                      onPress={handleSubmit}
                      title="New Location"
                      value={agentName}
                    />
                    
                    <Button
                      style={[Styles.nextButtonStyle]}
                      onPress={handleSubmit}
                      title="Update KYC"
                      value={agentName}
                    />

                  </View>
                )}
              </>
            )}
          </Formik>
          <ActivityIndicator
            size="small"
            color={Color.red}
            animating={isLoading}
          />
        </ScrollView>
      </View>
      <Snackbar
        style={{ backgroundColor: Color.red, elevation: 5 }}
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

export default Existing;
