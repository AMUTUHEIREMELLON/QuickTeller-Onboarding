import { View, ScrollView } from 'react-native';
import { Text } from '@react-native-material/core';
import { Formik, Field } from 'formik';
import { useNavigation } from '@react-navigation/native';

import TopBar from '../../components/TopBar';
import TextField from './../../components/TextField';
import Button from '../../components/Button';
// import Radio from '../../components/Radio';

import * as validationSchema from '../../validation/ValidationSchemas';
import Styles from '../../constants/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAgentFormData } from '../../redux/reducers/formSlice';

function CompanyInfo(props) {
  const { onFormSubmit } = props;

  const licensed = [
    { key: '1', value: 'Yes' },
    { key: '2', value: 'No' },
  ];

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { DirectorName } = useSelector((state) => state.formDataStore.newAgent);

  const { NumberOfOutlets } = useSelector(
    (state) => state.formDataStore.newAgent
  );
  const { UraTin } = useSelector((state) => state.formDataStore.newAgent);

  const { NatureOfBusiness } = useSelector(
    (state) => state.formDataStore.newAgent
  );

  return (
    <View style={Styles.dropContainer}>
      {/* <TopBar title="New Agent" onPress={() => navigation.goBack()} /> */}

      <View style={Styles.formContainer}>
        <Text style={Styles.h1}>Company Info</Text>
        <ScrollView style={Styles.scrollviewStyle}>
          <Formik
            validationSchema={validationSchema.companyInfoValidationSchema}
            validateOnMount={true}
            validateOnBlur={true}
            initialValues={{
              DirectorName: DirectorName,
              UraTin: UraTin,
              NumberOfOutlets: NumberOfOutlets,
              NatureOfBusiness: NatureOfBusiness,
              IsLicensedBusiness: '',
            }}
            onSubmit={(values) => {
              dispatch(addNewAgentFormData(values));
              navigation.navigate('AgentKyc');
              onFormSubmit(); // Call the callback function from props
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              isValid,
            }) => (
              <>
                <Field
                  component={TextField}
                  name="DirectorName"
                  label="Director Full Name * "
                  onChange={handleChange('DirectorName')}
                />

                <Field
                  component={TextField}
                  name="NumberOfOutlets"
                  label="Number of Outlets *"
                  keyboardType="numeric"
                  onChange={handleChange('NumberOfOutlets')}
                />

                <>
                  <Field
                    component={TextField}
                    name="UraTin"
                    label="URA TIN (optional) *"
                    keyboardType="numeric"
                    maxLength={15}
                    onChange={handleChange('UraTin')}
                  />
                  {/* <Field
                    component={TextField}
                    name="CompanyWebsite"
                    label="Company Website"
                  /> */}
                  <Field
                    component={TextField}
                    name="NatureOfBusiness"
                    label="Nature Of Business"
                    onChange={handleChange('NatureOfBusiness')}
                  />
                  {/* <Field
                    component={Radio}
                    data={licensed}
                    onValueChange={handleChange('IsLicensedBusiness')}
                    label="Licensed Business"
                    value={values.IsLicensedBusiness}
                  /> */}
                  {errors.IsLicensedBusiness && (
                    <Text style={Styles.errorText}>
                      {errors.IsLicensedBusiness}
                    </Text>
                  )}
                </>

                {/* <Field
                  component={Select}
                  name="ownershipType"
                  label="Type of Ownership *"
                  data={ownership}
                  onValueChange={handleChange('ownershipType')}
                  selectedValue={values.ownershipType}
                  onBlur={handleBlur('ownershipType')}
                />
                {errors.ownershipType && (
                  <Text style={Styles.errorText}>{errors.ownershipType}</Text>
                )} */}

                <Button
                  style={Styles.nextButtonStyle}
                  onPress={handleSubmit}
                  title="Next"
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

export default CompanyInfo;
