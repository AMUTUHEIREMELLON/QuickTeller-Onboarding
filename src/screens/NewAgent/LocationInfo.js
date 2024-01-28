import { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Formik, Field } from 'formik';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import DistrictsList from '../../components/DistrictsList';
import Color from '../../constants/Colors';

import TopBar from '../../components/TopBar';
import TextField from './../../components/TextField';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Radio from '../../components/Radio';

import * as validationSchema from '../../validation/ValidationSchemas';
import Styles from '../../constants/Styles';
import { addNewAgentFormData } from '../../redux/reducers/formSlice';
import { getCounties, getDistricts, getRegions } from '../../helpers/request';

function LocationInfo(props) {
  const { onFormSubmit } = props;

  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
  };

  const areas = [
    { key: '1', value: 'Rural' },
    { key: '2', value: 'Urban' },
  ];

  const resident = [
    { key: '1', value: 'Yes' },
    { key: '2', value: 'No' },
  ];

  const ownership = [
    { key: '1', value: 'Owned' },
    { key: '2', value: 'Rented' },
  ];

  const shops = [
    { value: 'Ddukka', label: 'Ddukka' },
    { value: 'Supermarket', label: 'Supermarket' },
    { value: 'Kiosk', label: 'Kiosk' },
    { value: 'Umbrella', label: 'Umbrella' },
    { value: 'Others', label: 'Others' },
  ];

  const regionList = [
    { value: 'Central', label: 'Central' },
    { value: 'Northern', label: 'Northern' },
    { value: 'Western', label: 'Western' },
    { value: 'Eastern', label: 'Eastern' },
    { value: 'Southern', label: 'Southern' },
  ];

  const [location, setLocation] = useState('');
  // const [regionList, setRegionList] = useState([]);
  // const [districtList, setDistrictList] = useState([]);
  // const [countyList, setCountyList] = useState([]);

  // const [selectedRegion, setSelectedRegion] = useState('');
  // const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    // getRegions(setRegionList);
    getLocation();
  }, []);

  // useEffect(() => {
  //   getDistricts(selectedRegion, setDistrictList);
  // }, [selectedRegion]);

  // useEffect(() => {
  //   getCounties(selectedDistrict, setCountyList);
  // }, [selectedDistrict]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    let locLatitude = loc.coords.latitude;
    let locLongitude = loc.coords.longitude;
    let locCoord = `${locLatitude}, ${locLongitude}`;
    setLocation(locCoord);
  };

  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View style={Styles.dropContainer}>
      {/* <TopBar title="New Agent" onPress={() => navigation.goBack()} /> */}
      <View style={Styles.formContainer}>
        <Text style={Styles.h1}>Location Info</Text>
        <ScrollView style={Styles.scrollviewStyle}>
          <Formik
            enableReinitialize={true}
            validationSchema={validationSchema.locationInfoValidationSchema}
            validateOnBlur={true}
            validateOnMount={true}
            initialValues={{
              GPS_Co_ordinates: location,
              PhysicalLocation: '',
              Region: '',
              District: '',
              Village: '',
              LC: '',
              NumberOfYearsWorkingInArea: '',
              TypeofShop: '',
              RuralUrban: '',
              ResidentinArea: '',
              Ownership: '',
              // PostalAddress: '',
              // StreetName: '',
              BuildingName: '',
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
                  component={Select}
                  name="Region"
                  label="Select Region *"
                  data={regionList}
                  onValueChange={handleChange('Region')}
                  selectedValue={values.Region}
                  onBlur={handleBlur('Region')}
                />
                {errors.Region && (
                  <Text style={Styles.errorText}>{errors.Region}</Text>
                )}
                <View
                  elevation={4}
                  mode="outlined"
                  category="medium"
                  style={{
                    padding: 5,
                    marginVertical: 5,
                    backgroundColor: Color.lightCultured,
                    borderBottomColor: 'red',
                  }}
                >
                  <DistrictsList
                    name="DistrictList"
                    label="Select District *"
                    selectedValue={selectedDistrict}
                    onValueChange={handleDistrictChange}
                  />
                </View>

                {/* <Field
                  component={TextField}
                  name="District"
                  label="District *"
                /> */}

                <Field component={TextField} name="Village" label="Village *" />

                <Field component={TextField} name="LC" label="LC1 *" />

                <Field
                  component={TextField}
                  name="PhysicalLocation"
                  label="Physical 
                  Location *"
                />

                <Field
                  component={TextField}
                  name="GPS_ Co_ordinates"
                  label="GPS Coordinates *"
                  editable={false}
                  value={location}
                />

                <Field
                  component={TextField}
                  name="NumberOfYearsWorkingInArea"
                  label="Number of years working in area"
                  keyboardType="numeric"
                />
                {/* <Field
                  component={TextField}
                  name="PostalAddress"
                  label="Postal Address"
                /> */}
                {/* <Field
                  component={TextField}
                  name="StreetName"
                  label="Street Name"
                /> */}
                <Field
                  component={TextField}
                  name="BuildingName"
                  label="Building Name"
                />

                <Field
                  component={Select}
                  name="TypeofShop"
                  label="Select Type of Shop *"
                  data={shops}
                  onValueChange={handleChange('TypeofShop')}
                  selectedValue={values.TypeofShop}
                  onBlur={handleBlur('TypeofShop')}
                />
                {errors.TypeofShop && (
                  <Text style={Styles.errorText}>{errors.TypeofShop}</Text>
                )}

                <Field
                  component={Radio}
                  data={areas}
                  onValueChange={handleChange('RuralUrban')}
                  label="Area"
                  value={values.RuralUrban}
                />
                {errors.RuralUrban && (
                  <Text style={Styles.errorText}>{errors.RuralUrban}</Text>
                )}

                <Field
                  component={Radio}
                  data={resident}
                  onValueChange={handleChange('ResidentinArea')}
                  label="Resident in Area"
                  value={values.ResidentinArea}
                />
                {errors.ResidentinArea && (
                  <Text style={Styles.errorText}>{errors.ResidentinArea}</Text>
                )}

                <Field
                  component={Radio}
                  data={ownership}
                  onValueChange={handleChange('Ownership')}
                  label="Shop Ownership"
                  value={values.Ownership}
                />
                {errors.Ownership && (
                  <Text style={Styles.errorText}>{errors.Ownership}</Text>
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

export default LocationInfo;
