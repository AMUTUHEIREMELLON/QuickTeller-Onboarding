import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Button from '../../components/Button';

import Styles from '../../constants/Styles';

function SignIn({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('./../../../assets/QUICKTELLER-01.png')}
          style={{
            resizeMode: 'contain',
            width: 350,
            height: 250,
            marginTop: '30%',
          }}
        />

        <View style={Styles.buttonContainer}>
          <Button
            style={Styles.signInBtn}
            onPress={() => navigation.navigate('LogIn')}
            title="Sign In"
          />
          <Text style={Styles.forgot} onPress={() => alert('Contact Admin.')}>
            Forgot Password?
          </Text>
          <Text
            style={Styles.underline}
            onPress={() => alert('Contact us here.')}
          >
            Contact Us
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8ECEF',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    height: '100%',
  },
});

export default SignIn;
