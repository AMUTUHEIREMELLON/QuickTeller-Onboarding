import { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Formik, Field } from 'formik';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
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

  const { Region } = useSelector((state) => state.formDataStore.newAgent);
  const { District } = useSelector((state) => state.formDataStore.newAgent);
  const { Village } = useSelector((state) => state.formDataStore.newAgent);
  const { LC } = useSelector((state) => state.formDataStore.newAgent);
  const { PhysicalLocation } = useSelector((state) => state.formDataStore.newAgent);
  const { GPS_Co_ordinates } = useSelector((state) => state.formDataStore.newAgent);
  const { NumberOfYearsWorkingInArea } = useSelector((state) => state.formDataStore.newAgent);
  const { BuildingName } = useSelector((state) => state.formDataStore.newAgent);
  const { TypeofShop } = useSelector((state) => state.formDataStore.newAgent);
const { RuralUrban } = useSelector((state) => state.formDataStore.newAgent);
const { ResidentinArea } = useSelector((state) => state.formDataStore.newAgent);
const { Ownership } = useSelector((state) => state.formDataStore.newAgent);

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
    { value: 'Abim', label: 'Abim' },
    { value: 'Adjumani', label: 'Adjumani' },
    { value: 'Agago', label: 'Agago' },
    { value: 'Alebtong', label: 'Alebtong' },
    { value: 'Amolatar', label: 'Amolatar' },
    { value: 'Amudat', label: 'Amudat' },
    { value: 'Amuria', label: 'Amuria' },
    { value: 'Amuru', label: 'Amuru' },
    { value: 'Apac', label: 'Apac' },
    { value: 'Arua', label: 'Arua' },
    { value: 'Budaka', label: 'Budaka' },
    { value: 'Bududa', label: 'Bududa' },
    { value: 'Bugiri', label: 'Bugiri' },
    { value: 'Buhweju', label: 'Buhweju' },
    { value: 'Buikwe', label: 'Buikwe' },
    { value: 'Bukedea', label: 'Bukedea' },
    { value: 'Bukomansimbi', label: 'Bukomansimbi' },
    { value: 'Bukwa', label: 'Bukwa' },
    { value: 'Bulambuli', label: 'Bulambuli' },
    { value: 'Buliisa', label: 'Buliisa' },
    { value: 'Bundibugyo', label: 'Bundibugyo' },
    { value: 'Bushenyi', label: 'Bushenyi' },
    { value: 'Busia', label: 'Busia' },
    { value: 'Butaleja', label: 'Butaleja' },
    { value: 'Butambala', label: 'Butambala' },
    { value: 'Buvuma', label: 'Buvuma' },
    { value: 'Buyende', label: 'Buyende' },
    { value: 'Dokolo', label: 'Dokolo' },
    { value: 'Gomba', label: 'Gomba' },
    { value: 'Gulu', label: 'Gulu' },
    { value: 'Hoima', label: 'Hoima' },
    { value: 'Ibanda', label: 'Ibanda' },
    { value: 'Iganga', label: 'Iganga' },
    { value: 'Isingiro', label: 'Isingiro' },
    { value: 'Jinja', label: 'Jinja' },
    { value: 'Kampala', label: 'Kampala' },
    { value: 'Kaabong', label: 'Kaabong' },
    { value: 'Kabale', label: 'Kabale' },
    { value: 'Kabarole', label: 'Kabarole' },
    { value: 'Kaberamaido', label: 'Kaberamaido' },
    { value: 'Kalangala', label: 'Kalangala' },
    { value: 'Kaliro', label: 'Kaliro' },
    { value: 'Kalungu', label: 'Kalungu' },
    { value: 'Kamuli', label: 'Kamuli' },
    { value: 'Kamwenge', label: 'Kamwenge' },
    { value: 'Kanungu', label: 'Kanungu' },
    { value: 'Kapchorwa', label: 'Kapchorwa' },
    { value: 'Kasese', label: 'Kasese' },
    { value: 'Katakwi', label: 'Katakwi' },
    { value: 'Kayunga', label: 'Kayunga' },
    { value: 'Kibaale', label: 'Kibaale' },
    { value: 'Kiboga', label: 'Kiboga' },
    { value: 'Kibuku', label: 'Kibuku' },
    { value: 'Kiruhura', label: 'Kiruhura' },
    { value: 'Kiryandongo', label: 'Kiryandongo' },
    { value: 'Kisoro', label: 'Kisoro' },
    { value: 'Kitgum', label: 'Kitgum' },
    { value: 'Koboko', label: 'Koboko' },
    { value: 'Kole', label: 'Kole' },
    { value: 'Kotido', label: 'Kotido' },
    { value: 'Kumi', label: 'Kumi' },
    { value: 'Kween', label: 'Kween' },
    { value: 'Kyankwanzi', label: 'Kyankwanzi' },
    { value: 'Kyegegwa', label: 'Kyegegwa' },
    { value: 'Kyenjojo', label: 'Kyenjojo' },
    { value: 'Lamwo', label: 'Lamwo' },
    { value: 'Lira', label: 'Lira' },
    { value: 'Luuka', label: 'Luuka' },
    { value: 'Luwero', label: 'Luwero' },
    { value: 'Lwengo', label: 'Lwengo' },
    { value: 'Manafwa', label: 'Manafwa' },
    { value: 'Maracha', label: 'Maracha' },
    { value: 'Masaka', label: 'Masaka' },
    { value: 'Masindi', label: 'Masindi' },
    { value: 'Mayuge', label: 'Mayuge' },
    { value: 'Mbale', label: 'Mbale' },
    { value: 'Mbarara', label: 'Mbarara' },
    { value: 'Mitooma', label: 'Mitooma' },
    { value: 'Mityana', label: 'Mityana' },
    { value: 'Moroto', label: 'Moroto' },
    { value: 'Moyo', label: 'Moyo' },
    { value: 'Mpigi', label: 'Mpigi' },
    { value: 'Mubende', label: 'Mubende' },
    { value: 'Mukono', label: 'Mukono' },
    { value: 'Nakapiripirit', label: 'Nakapiripirit' },
    { value: 'Nakaseke', label: 'Nakaseke' },
    { value: 'Nakasongola', label: 'Nakasongola' },
    { value: 'Namayingo', label: 'Namayingo' },
    { value: 'Namutumba', label: 'Namutumba' },
    { value: 'Napak', label: 'Napak' },
    { value: 'Nebbi', label: 'Nebbi' },
    { value: 'Ngora', label: 'Ngora' },
    { value: 'Ntoroko', label: 'Ntoroko' },
    { value: 'Ntungamo', label: 'Ntungamo' },
    { value: 'Nwoya', label: 'Nwoya' },
    { value: 'Otuke', label: 'Otuke' },
    { value: 'Oyam', label: 'Oyam' },
    { value: 'Pader', label: 'Pader' },
    { value: 'Paliisa', label: 'Paliisa' },
    { value: 'Rakai', label: 'Rakai' },
    { value: 'Rubirizi', label: 'Rubirizi' },
    { value: 'Rukungiri', label: 'Rukungiri' },
    { value: 'Sembabule', label: 'Sembabule' },
    { value: 'Serere', label: 'Serere' },
    { value: 'Sheema', label: 'Sheema' },
    { value: 'Sironko', label: 'Sironko' },
    { value: 'Soroti', label: 'Soroti' },
    { value: 'Tororo', label: 'Tororo' },
    { value: 'Wakiso', label: 'Wakiso' },
    { value: 'Yumbe', label: 'Yumbe' },
    { value: 'Zombo', label: 'Zombo' },
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
            // validationSchema={validationSchema.locationInfoValidationSchema}
            validateOnBlur={true}
            validateOnMount={true}
            initialValues={{
              GPS_Co_ordinates: location,
              PhysicalLocation: PhysicalLocation,
              Region: Region,
              District: District,
              Village: Village,
              LC: LC,
              NumberOfYearsWorkingInArea: NumberOfYearsWorkingInArea,
              TypeofShop: TypeofShop,
              RuralUrban: RuralUrban,
              ResidentinArea: ResidentinArea,
              Ownership: Ownership,
              // PostalAddress: '',
              // StreetName: '',
              BuildingName: BuildingName,
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

                <Field component={TextField} name="Village" label="Village *" onChange={handleChange('Village')}/>

                <Field component={TextField} name="LC" label="LC1 *" onChange={handleChange('LC')}/>

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

export default LocationInfo;
