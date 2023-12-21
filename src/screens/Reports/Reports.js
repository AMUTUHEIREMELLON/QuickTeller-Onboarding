import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBSPApplications } from '../../helpers/request';

import Styles from '../../constants/Styles';
import Color from './../../constants/Colors';

import TopBar from '../../components/TopBar';
import ReportCard from '../../components/ReportCard';
import Button from '../../components/Button';

export default function Reports({ navigation }) {
  const [fromDate, setFromDate] = useState(new Date());
  const [openFrom, setOpenFrom] = useState(false);
  const [fromText, setFromText] = useState('');

  const [toDate, setToDate] = useState(new Date());
  const [openTo, setOpenTo] = useState(false);
  const [toText, setToText] = useState('');

  const [newReq, setNewReq] = useState('');
  const [pending, setPending] = useState('');
  const [approved, setApproved] = useState('');
  const [declined, setDeclined] = useState('');

  const [userDetails, setUserDetails] = useState(null);

  const showFromPicker = () => {
    setOpenFrom(true);
  };

  const showToPicker = () => {
    setOpenTo(true);
  };

  const getUserDetails = async () => {
    try {
      let res = await AsyncStorage.getItem('loginResponse');
      setUserDetails(JSON.parse(res));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const onFromSelected = (e, value) => {
    setOpenFrom(false);
    setFromDate(value);
    setFromText(moment(value).format('L'));
  };

  const onToSelected = (e, value) => {
    setOpenTo(false);
    setToDate(value);
    setToText(moment(value).format('L'));
  };

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="Reports" onPress={() => navigation.goBack()} />
      <View style={Styles.formContainer}>
        <Text style={Styles.h1}>Reports</Text>
        <ScrollView style={Styles.scrollviewStyle}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <TextInput
              label="From"
              value={fromText}
              onPressIn={showFromPicker}
              showSoftInputOnFocus={false}
              selectionColor={Color.silverChalice}
              mode="outlined"
              activeOutlineColor={Color.darkBlue}
              style={{ width: '40%', fontSize: 14 }}
            />
            {openFrom && (
              <DateTimePicker
                value={fromDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onFromSelected}
              />
            )}
            <Text>to</Text>

            <TextInput
              label="To"
              value={toText}
              onPressIn={showToPicker}
              showSoftInputOnFocus={false}
              selectionColor={Color.silverChalice}
              mode="outlined"
              activeOutlineColor={Color.darkBlue}
              style={{ width: '40%', fontSize: 14 }}
            />
            {openTo && (
              <DateTimePicker
                value={toDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onToSelected}
              />
            )}
          </View>
          <Button
            style={Styles.nextButtonStyle}
            onPress={() =>
              getBSPApplications(
                fromText,
                toText,
                setNewReq,
                setPending,
                setDeclined,
                setApproved,
                userDetails
              )
            }
            title="Load Reports"
          />
          {newReq && (
            <ReportCard
              backgroundColor={Color.lightBlue}
              status="New"
              icon="account-check"
              applications={newReq}
            />
          )}
          {pending && (
            <ReportCard
              backgroundColor={Color.yellow}
              status="Pending"
              icon="account-clock"
              applications={pending}
            />
          )}
          {approved && (
            <ReportCard
              backgroundColor={Color.etonBlue}
              status="Approved"
              icon="account-check"
              applications={approved}
              onPress={() => navigation.navigate('#')}

            />
          )}
          {declined && (
            
              <ReportCard
                backgroundColor={Color.lightCoral}
                status="Declined"
                icon="account-cancel"
                applications={declined}
                onPress={() => navigation.navigate('DeclinedReq')}
              />
            
          )}

        
        </ScrollView>
      </View>
    </View>
  );
}


