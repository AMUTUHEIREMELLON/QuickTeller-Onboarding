import React from 'react';
import { useState, useEffect } from 'react';

import { View, Text, ScrollView } from 'react-native';
import { Formik, Field } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import TopBar from '../../components/TopBar';
import Button from '../../components/Button';
import Radio from '../../components/Radio';
import TextField from '../../components/TextField';
import Select from '../../components/Select';
import * as Location from 'expo-location';

import Styles from '../../constants/Styles';
import * as validationSchema from '../../validation/ValidationSchemas';
// import { useDispatch } from 'react-redux';
import { addNewAgentFormData } from '../../redux/reducers/formSlice';

export default function EditLocationInfo(props) {
  
  const { onFormSubmit } = props;



  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // const { Region } = useSelector((state) => state.formDataStore.newAgent);
  // const { District } = useSelector((state) => state.formDataStore.newAgent);
  // const { Village } = useSelector((state) => state.formDataStore.newAgent);
  // const { LC } = useSelector((state) => state.formDataStore.newAgent);
  // const { PhysicalLocation } = useSelector((state) => state.formDataStore.newAgent);
  // const { GPS_Co_ordinates } = useSelector((state) => state.formDataStore.newAgent);
  // const { NumberOfYearsWorkingInArea } = useSelector((state) => state.formDataStore.newAgent);
  // const { BuildingName } = useSelector((state) => state.formDataStore.newAgent);
  // const { TypeofShop } = useSelector((state) => state.formDataStore.newAgent);
  // const { RuralUrban } = useSelector((state) => state.formDataStore.newAgent);
  // const { ResidentinArea } = useSelector((state) => state.formDataStore.newAgent);
  // const { Ownership } = useSelector((state) => state.formDataStore.newAgent);

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

  const Districts = [
    // Central Region
    { value: 'BU', label: 'Buikwe' },
    { value: 'BM', label: 'Bukomansimbi' },
    { value: 'BT', label: 'Butambala' },
    { value: 'BV', label: 'Buvuma' },
    { value: 'GO', label: 'Gomba' },
    { value: 'KA', label: 'Kalangala' },
    { value: 'KG', label: 'Kalungu' },
    { value: 'KJ', label: 'Kampala' },
    { value: 'KD', label: 'Kasanda' },
    { value: 'KY', label: 'Kayunga' },
    { value: 'KB', label: 'Kiboga' },
    { value: 'KW', label: 'Kyankwanzi' },
    { value: 'KT', label: 'Kyotera' },
    { value: 'LE', label: 'Luweero' },
    { value: 'LW', label: 'Lwengo' },
    { value: 'LT', label: 'Lyantonde' },
    { value: 'MK', label: 'Masaka' },
    { value: 'MT', label: 'Mityana' },
    { value: 'MP', label: 'Mpigi' },
    { value: 'MB', label: 'Mubende' },
    { value: 'MU', label: 'Mukono' },
    { value: 'NK', label: 'Nakaseke' },
    { value: 'NS', label: 'Nakasongola' },
    { value: 'RK', label: 'Rakai' },
    { value: 'SB', label: 'Sembabule' },
    { value: 'WK', label: 'Wakiso' },

    // Eastern Region
    { value: 'BU', label: 'Bukedea' },
    { value: 'BU', label: 'Bukwo' },
    { value: 'BU', label: 'Bulambuli' },
    { value: 'BU', label: 'Busia' },
    { value: 'BU', label: 'Butaleja' },
    { value: 'KA', label: 'Kaberamaido' },
    { value: 'KA', label: 'Kaliro' },
    { value: 'KB', label: 'Kibuku' },
    { value: 'KI', label: 'Kumi' },
    { value: 'ML', label: 'Manafwa' },
    { value: 'NA', label: 'Namayingo' },
    { value: 'NG', label: 'Ngora' },
    { value: 'SER', label: 'Serere' },
    { value: 'SOR', label: 'Soroti' },
    { value: 'TOR', label: 'Tororo' },

    // Northern Region
    { value: 'AMU', label: 'Amudat' },
    { value: 'ARU', label: 'Arua' },
    { value: 'DOK', label: 'Dokolo' },
    { value: 'GUL', label: 'Gulu' },
    { value: 'KAB', label: 'Kaberamaido' },
    { value: 'KOT', label: 'Kotido' },
    { value: 'LAM', label: 'Lamwo' },
    { value: 'LIR', label: 'Lira' },
    { value: 'MOY', label: 'Moyo' },
    { value: 'NAB', label: 'Nabilatuk' },
    { value: 'NAK', label: 'Nakapiripirit' },
    { value: 'NAP', label: 'Napak' },
    { value: 'NEB', label: 'Nebbi' },
    { value: 'NWO', label: 'Nwoya' },
    { value: 'OBO', label: 'Obongi' },
    { value: 'OMO', label: 'Omoro' },
    { value: 'OTU', label: 'Otuke' },
    { value: 'OYA', label: 'Oyam' },
    { value: 'PAD', label: 'Pader' },
    { value: 'PAK', label: 'Pakwach' },
    { value: 'TER', label: 'Terego' },
    { value: 'YUM', label: 'Yumbe' },
    { value: 'ZOM', label: 'Zombo' },

    // Western Region
    { value: 'HOI', label: 'Hoima' },
    { value: 'IBA', label: 'Ibanda' },
    { value: 'ISE', label: 'Isingiro' },
    { value: 'KAB', label: 'Kabale' },
    { value: 'KAM', label: 'Kamwenge' },
    { value: 'KAN', label: 'Kanungu' },
    { value: 'KAS', label: 'Kasese' },
    { value: 'KIR', label: 'Kiruhura' },
    { value: 'KIS', label: 'Kisoro' },
    { value: 'KYE', label: 'Kyegegwa' },
    { value: 'KYO', label: 'Kyankwanzi' },
    { value: 'KYU', label: 'Kyenjojo' },
    { value: 'MAS', label: 'Masindi' },
    { value: 'MBR', label: 'Mbarara' },
    { value: 'MIT', label: 'Mitooma' },
    { value: 'NKS', label: 'Nakaseke' },
    { value: 'NKL', label: 'Nakasongola' },
    { value: 'NTU', label: 'Ntungamo' },
    { value: 'RUB', label: 'Rubanda' },
    { value: 'RUK', label: 'Rukiga' },
    { value: 'RUM', label: 'Rukungiri' },
    { value: 'SHE', label: 'Sheema' },
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
  const { decline } = route.params;

  const navigation = useNavigation();

  return (
    <View style={Styles.dropContainer}>
      {/* <TopBar title="New Agent" onPress={() => navigation.goBack()} /> */}
      <View style={Styles.formContainer}>
        <Text style={Styles.h1}>Location Info</Text>
        <ScrollView style={Styles.scrollviewStyle}>
          <Formik
            enableReinitialize={true}
            // validationSchema={validationSchema.locationInfoValidationSchema}
            validateOnBlur={true}
            validateOnMount={true}
            initialValues={{
              GPS_Co_ordinates: decline.GPS_Co_ordinates,
              PhysicalLocation: decline.PhysicalLocation,
              Region: decline.Region,
              District: decline.District,
              Village: decline.Village,
              LC: decline.LC,
              // NumberOfYearsWorkingInArea: NumberOfYearsWorkingInArea,
              TypeofShop: decline.TypeofShop,
              RuralUrban: decline.RuralUrban,
              ResidentinArea: decline.ResidentinArea,
              Ownership: decline.Ownership,
              // PostalAddress: '',
              // StreetName: '',
              BuildingName: decline.BuildingName,
            }}
            onSubmit={(values) => {
              dispatch(addNewAgentFormData(values));
              navigation.navigate('EditAgentKyc');
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

                <Field
                  component={Select}
                  name="District"
                  label="Select District *"
                  data={Districts}
                  onValueChange={handleChange('District')}
                  selectedValue={values.District}
                  onBlur={handleBlur('District')}
                />
                {errors.District && (
                  <Text style={Styles.errorText}>{errors.District}</Text>
                )}

                <Field
                  component={TextField}
                  name="Village"
                  label="Village *"
                  onChange={handleChange('Village')}
                />

                <Field
                  component={TextField}
                  name="LC"
                  label="LC1 *"
                  onChange={handleChange('LC')}
                />

                <Field
                  component={TextField}
                  name="PhysicalLocation"
                  label="Physical 
                  Location *"
                  onChange={handleChange('PhysicalLocation')}
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
                  onChange={handleChange('NumberOfYearsWorkingInArea')}
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
                  onChange={handleChange('BuildingName')}
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
