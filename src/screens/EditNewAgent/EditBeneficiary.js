import { View, ScrollView } from 'react-native';
import { Text } from '@react-native-material/core';
import { Formik, Field } from 'formik';
import { useRoute, useNavigation } from '@react-navigation/native';

import TopBar from '../../components/TopBar';
import TextField from '../../components/TextField';
import Select from '../../components/Select';
import Button from '../../components/Button';

import Styles from '../../constants/Styles';
import { useDispatch } from 'react-redux';
import { addNewAgentFormData } from '../../redux/reducers/formSlice';

function Beneficiary() {
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

  const dispatch = useDispatch()
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="New Agent" onPress={() => navigation.goBack()} />
      <View style={Styles.formContainer}>
        <Text style={Styles.h1}>Next of Kin / Beneficiary</Text>
        <ScrollView style={Styles.scrollviewStyle}>
          <Formik
            initialValues={{
              NameofBeneficiary: '',
              Residence: '',
              BeneficiaryPhoneNumber: '',
              BRelationship: '',
            }}
            onSubmit={(values) => {
              dispatch(addNewAgentFormData(values))
              navigation.navigate('Attach')
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values }) => (
              <>
                <Field
                  component={TextField}
                  name="NameofBeneficiary"
                  label="Beneficiary/Next of Kin Full Name"
                />

                <Field
                  component={TextField}
                  name="Residence"
                  label="Residence"
                />

                <Field
                  component={TextField}
                  name="BeneficiaryPhoneNumber"
                  label="Phone Number (07-- --- ---)"
                  keyboardType="numeric"
                />

                <Field
                  component={Select}
                  name="BRelationship"
                  label="Select Relationship"
                  data={relations}
                  onValueChange={handleChange('BRelationship')}
                  selectedValue={values.BRelationship}
                  onBlur={handleBlur('BRelationship')}
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
