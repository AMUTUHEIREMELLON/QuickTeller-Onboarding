import { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import TopBar from '../../components/TopBar';
import EditAttachment from '../../components/EditAttachment';
import Button from '../../components/Button';

import Styles from '../../constants/Styles';

function EditAttach(props) {
  const { onFormSubmit } = props;
  const route = useRoute();
  const { decline } = route.params;  
  const navigation = useNavigation();

  const [userDetails, setUserDetails] = useState(null);

  const formData = useSelector(store => store.formDataStore.newAgent)
  const newData = { ...formData, ...userDetails };
  console.log('MY newData:', newData);
  const { agentType } = useSelector((store) => store.formDataStore.newAgent)

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
      {/* <TopBar title="Attach Docs" onPress={() => navigation.goBack()} /> */}
      <View style={Styles.formContainer}>
        <Text style={Styles.h1}>Edit Documents</Text>
        <ScrollView style={Styles.scrollviewStyle}>
          <EditAttachment
            attach="Outlet Photo *"
            fileData={{ ...newData }}
            fileName="OutletPhoto"
          />
          <EditAttachment
            attach="Agent Photo *"
            fileData={{ ...newData }}
            fileName="AgentPassportPhoto"
          />
          {agentType === 'Business' && (
            <EditAttachment
              attach="Trading License *"
              fileData={{ ...newData }}
              fileName="TradingLicence"
            />)
          }
          <EditAttachment
            attach="Agent Signature *"
            fileData={{ ...newData }}
            fileName="SignedAgreementForm"
          />
          <EditAttachment
            attach="National ID *"
            fileData={{ ...newData }}
            fileName="OperatorNationalId"
          />
          <EditAttachment
            attach="Bank/MM Statement *"
            fileData={{ ...newData }}
            fileName="BankStatement"
          />

          <Button
            style={Styles.nextButtonStyle}
            onPress={() =>{ 
              onFormSubmit();
              navigation.navigate('EditTerms', { decline })
            }}
            title="Next"
          />
        </ScrollView>
      </View>
    </View>
  );
}

export default EditAttach;
