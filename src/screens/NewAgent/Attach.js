import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert  } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import TopBar from '../../components/TopBar';
import Attachment from '../../components/Attachment';
import Button from '../../components/Button';

import Styles from '../../constants/Styles';

function Attach(props) {
  const { onFormSubmit } = props;


  const route = useRoute();
  const navigation = useNavigation();

  const [userDetails, setUserDetails] = useState(null);

  const formData = useSelector((store) => store.formDataStore.newAgent);
  const newData = { ...formData, ...userDetails };
  console.log('your newData:', newData);
  const { agentType } = useSelector((store) => store.formDataStore.newAgent);

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

  return (
    <View style={Styles.dropContainer}>
      {/* <TopBar title="New Agent" onPress={() => navigation.goBack()} /> */}
      <View style={Styles.formContainer}>
        <Text style={Styles.h1}>Attach Documents</Text>
        <ScrollView style={Styles.scrollviewStyle}>
          <Attachment
            attach="Outlet Photo *"
            subtitle="Photo of premises Location. No more than 10MB"
            fileData={{ ...newData }}
            fileName="OutletPhoto"
          />
          <Attachment
            attach="Agent Photo *"
            subtitle="Photo of the Agent. no more than 10MB"
            fileData={{ ...newData }}
            fileName="AgentPassportPhoto"
          />
          {agentType === 'Business' && (
            <Attachment
              attach="Trading License *"
              fileData={{ ...newData }}
              fileName="TradingLicence"
            />
          )}
          {/* <Attachment
            attach="Agent Signature *"
            fileData={{ ...newData }}
            fileName="SignedAgreementForm"
          /> */}
          <Attachment
            attach="National ID *"
            subtitle="Photo of the NIN both back and forth. no more than 10MB"
            fileData={{ ...newData }}
            fileName="OperatorNationalId"
          />
          <Attachment
            attach="Bank/MM Statement *"
            subtitle="Bank or MobileMoney statement, from 4 months back."
            fileData={{ ...newData }}
            fileName="BankStatement"
          />

          <Button
            style={Styles.nextButtonStyle}
            onPress={() => {
               
                 onFormSubmit();
                 navigation.navigate('Terms');
              
             }}
             title="Next"
          />
        </ScrollView>
      </View>
    </View>
  );
}

export default Attach;
