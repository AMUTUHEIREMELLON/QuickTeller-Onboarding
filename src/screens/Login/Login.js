import { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TextInput, ActivityIndicator, Snackbar } from 'react-native-paper';
import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import TextField from './../../components/TextField';
import Button from '../../components/Button';

import { getData, storeData } from '../../helpers/LoginDetailsStorage';

import Color from './../../constants/Colors';
import Styles from '../../constants/Styles';

import * as validationSchema from '../../validation/ValidationSchemas';
import { userLogin } from '../../redux/reducers/authSlice';
import { NavigationHelpersContext } from '@react-navigation/native';
import { getIciToken } from '../../redux/reducers/cardOnboardingSlice';

function Login({ navigation }) {
  const [hidePass, setHidePass] = useState(true);
  // const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const isLoading = useSelector((store) => store.authStore.isLoading)
  const authenticated = useSelector((store) => store.authStore.authenticated)
  const err = useSelector((store) => store.authStore.err)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIciToken());
  }, [dispatch])

  useEffect(() => {
    async function getUserData() {
      const user = await getData();
      
      if(user) {
        navigation.replace('Dashboard');
      }
    }
    getUserData();
   
  }, [])

  useEffect(() => {
    if (authenticated === "true") {
      navigation.replace('Dashboard');
    }
    if (authenticated === "failedLogin") {
      setSnackbarMessage(err);
      setSnackbarVisible(true);
    }
  }, [isLoading, authenticated]);

  return (
    <View style={Styles.container}>
      <Image
        style={Styles.logo}
        source={require('../../../assets/QUICKTELLER-01.png')}
      />
      <Formik
        validationSchema={validationSchema.loginValidationSchema}
        initialValues={{ Username: '', Password: '' }}
        onSubmit={(values) => {
          dispatch(userLogin(values))
        }}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field component={TextField} name="Username" label="Username *" />
            <Field
              component={TextField}
              name="Password"
              label="Password *"
              secureTextEntry={hidePass ? true : false}
              right={
                <TextInput.Icon
                  name={hidePass ? 'eye-off' : 'eye'}
                  onPress={() => setHidePass(!hidePass)}
                />
              }
            />
            <View style={styles.buttonContainer}>
              <Button
                style={[styles.loginBtn, { backgroundColor: Color.lightBlue }]}
                onPress={handleSubmit}
                title="Sign In"
                disabled={!isValid || isLoading}
              />
              <ActivityIndicator
                size="small"
                color={Color.red}
                animating={isLoading}
              />
            </View>
          </>
        )}
      </Formik>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() =>
          setSnackbarVisible(false)}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyItems: 'center',
    padding: 10,
  },
  loginBtn: {
    width: '85%',
    borderRadius: 50,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  forgot: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
});

export default Login;
