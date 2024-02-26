import { View, ScrollView } from 'react-native';
import { Text } from '@react-native-material/core';
import { Formik, Field } from 'formik';
import { useRoute, useNavigation } from '@react-navigation/native';

import TopBar from '../../components/TopBar';
import TextField from './../../components/TextField';
import Select from '../../components/Select';
import Button from '../../components/Button';

import Styles from '../../constants/Styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewAgentFormData,
  formDataSelector,
} from '../../redux/reducers/formSlice';

function Beneficiary(props) {
  const { onFormSubmit } = props;

  const relations = [
    { value: 'Mother', label: 'Mother' },
    { value: 'Father', label: 'Father' },
    { value: 'Brother', label: 'Brother' },
    { value: 'Sister', label: 'Sister' },
    { value: 'Son', label: 'Son' },
    { value: 'Daughter', label: 'Daughter' },
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Other', label: 'Other' },
  ];

  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  // const newAgent = useSelector(formDataSelector);
  const { NextofKin } = useSelector(
    (state) => state.formDataStore.newAgent
  );
  const { KinRelationship } = useSelector(
    (state) => state.formDataStore.newAgent
  );
  const { KinPhoneNumber } = useSelector(
    (state) => state.formDataStore.newAgent
  );
  const { Residence } = useSelector((state) => state.formDataStore.newAgent);

  return (
    <View style={Styles.dropContainer}>
      {/* <TopBar title="New Agent" onPress={() => navigation.goBack()} /> */}
      <View style={Styles.formContainer}>
        <Text style={Styles.h1}>Next of Kin / Beneficiary</Text>
        <ScrollView style={Styles.scrollviewStyle}>
          <Formik
            // initialValues={newAgent}
            initialValues={{
              NextofKin: NextofKin,
              Residence: Residence,
              KinPhoneNumber: KinPhoneNumber,
              KinRelationship: KinRelationship,
            }}
            onSubmit={(values) => {
              dispatch(addNewAgentFormData(values));
              navigation.navigate('AgentKyc');
              onFormSubmit(); // Call the callback function from props
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values }) => (
              <>
                <Field
                  component={TextField}
                  name="NextofKin"
                  label="Beneficiary/Next of Kin Full Name"
                  // value={NextofKin || ''}
                  onChange={handleChange('NextofKin')}
                />

                <Field
                  component={TextField}
                  name="Residence"
                  label="Residence"
                  onChange={handleChange('Residence')}
                />

                <Field
                  component={TextField}
                  name="KinPhoneNumber"
                  label="Phone Number (07-- --- ---)"
                  keyboardType="numeric"
                  onChange={handleChange('KinPhoneNumber')}
                />

                <Field
                  component={Select}
                  name="KinRelationship"
                  label="Select Relationship"
                  data={relations}
                  onValueChange={handleChange('KinRelationship')}
                  selectedValue={values.KinRelationship}
                  onBlur={handleBlur('KinRelationship')}
                />

                <Button
                  style={Styles.nextButtonStyle}
                  onPress={handleSubmit}
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

export default Beneficiary;
