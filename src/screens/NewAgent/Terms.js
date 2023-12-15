import { Formik } from 'formik';
import { View, ScrollView, useWindowDimensions } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@react-native-material/core';
import RenderHTML from 'react-native-render-html';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TopBar from '../../components/TopBar';
import Button from '../../components/Button';

import { source } from '../../constants/T&C';
import Color from './../../constants/Colors';
import Styles from '../../constants/Styles';

import * as validationSchema from '../../validation/ValidationSchemas';

import { postApplication } from '../../helpers/request';
import { clearNewAgentFormData } from '../../redux/reducers/formSlice';

function Terms() {
  const agreedOption = [{ key: '1', value: 'Agreed' }];
  const verifiedOption = [{ key: '1', value: 'Verified' }];

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const formData = useSelector(store => store.formDataStore.newAgent)

  const submitData = async (values) => {
    const savedUser = await AsyncStorage.getItem('loginResponse');
    if(!savedUser) return;

    const user = JSON.parse(savedUser);

    const finalFormData = { ...formData, ...values, ...user };
    await postApplication(finalFormData);
    dispatch(clearNewAgentFormData())
    navigation.navigate('Dashboard');
  }

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="New Agent" onPress={() => navigation.goBack()} />
      <View style={Styles.formContainer}>
        <Text style={Styles.h1}>Terms and Conditions</Text>
        <ScrollView style={Styles.scrollviewStyle}>
          <ScrollView
            style={{
              marginHorizontal: '1%',
              height: 450,
              padding: '2%',
              marginBottom: '3%',
            }}
          >
            <RenderHTML contentWidth={width} source={source} />
          </ScrollView>
          <Formik
            validationSchema={validationSchema.termsValidationSchema}
            initialValues={{ agreed: '', verified: '' }}
            onSubmit={(values) => submitData(values)}
          >
            {({ handleSubmit, errors, values, handleChange, isValid }) => (
              <>
                <View style={Styles.radioButtonContainer}>
                  <RadioButton.Group
                    onValueChange={handleChange('agreed')}
                    value={values.agreed}
                  >
                    {agreedOption.map((item) => {
                      return (
                        <View
                          style={Styles.radioButtonContainer}
                          key={item.key.toString()}
                        >
                          <RadioButton
                            value={item.value.toString()}
                            color={Color.red}
                            key={item.key.toString()}
                          />
                          <Text style={Styles.viewStyle}>
                            I agree to the Terms and Conditions.
                          </Text>
                        </View>
                      );
                    })}
                  </RadioButton.Group>
                </View>
                {errors.agreed && (
                  <Text style={Styles.errorText}>{errors.agreed}</Text>
                )}

                <View style={Styles.radioButtonContainer}>
                  <RadioButton.Group
                    onValueChange={handleChange('verified')}
                    value={values.verified}
                  >
                    {verifiedOption.map((item) => {
                      return (
                        <View
                          style={Styles.radioButtonContainer}
                          key={item.key.toString()}
                        >
                          <RadioButton
                            value={item.value.toString()}
                            color={Color.red}
                            key={item.key.toString()}
                          />
                          <Text style={Styles.viewStyle}>
                            I agree to the best of my knowledge that the
                            information provided is accurate.
                          </Text>
                        </View>
                      );
                    })}
                  </RadioButton.Group>
                </View>
                {errors.verified && (
                  <Text style={Styles.errorText}>{errors.verified}</Text>
                )}

                <Button
                  style={Styles.nextButtonStyle}
                  onPress={handleSubmit}
                  title="Submit"
                  disabled={!isValid}
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
}

export default Terms;
