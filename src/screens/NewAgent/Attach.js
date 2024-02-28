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

  // const [fileUploadStatus, setFileUploadStatus] = useState([
  //   false, // Outlet Photo
  //   false, // Agent Photo
  //   false,
  //   false,
    
  // ]);

  // const handleFileUpload = async (attachmentIndex) => {
  //   try {
  //     // Simulate file upload logic, replace this with your actual logic
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // Update file upload status for the specific attachment
  //     setFileUploadStatus((prevStatus) => {
  //       const newStatus = [...prevStatus];
  //       newStatus[attachmentIndex] = true;
  //       return newStatus;
  //     });

  //     // You can add additional logic here if needed
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     // Handle the error, show an alert, or implement retry logic
  //   }
  // };

  const route = useRoute();
  const navigation = useNavigation();

  const [userDetails, setUserDetails] = useState(null);

  const formData = useSelector((store) => store.formDataStore.newAgent);
  const newData = { ...formData, ...userDetails };
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
            // onUploadSuccess={() => handleFileUpload(0)}
          />
          <Attachment
            attach="Agent Photo *"
            subtitle="Photo of the Agent. no more than 10MB"
            fileData={{ ...newData }}
            fileName="AgentPassportPhoto"
            // onUploadSuccess={() => handleFileUpload(1)}
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
            // onUploadSuccess={() => handleFileUpload(2)}
          />
          <Attachment
            attach="Bank/MM Statement *"
            subtitle="Bank or MobileMoney statement, from 4 months back."
            fileData={{ ...newData }}
            fileName="BankStatement"
            // onUploadSuccess={() => handleFileUpload(3)}
          />

          <Button
            style={Styles.nextButtonStyle}
            onPress={() => {
               // Check if all files are uploaded
              //  const allFilesUploaded = fileUploadStatus.every((status) => status);

              //  if (allFilesUploaded) {
                 onFormSubmit();
                 navigation.navigate('Terms');
              //  } else {
              //    // Show an alert if files are not uploaded
              //    Alert.alert('Alert', 'Please upload all required files before proceeding.');
              //  }
             }}
             title="Next"
          />
        </ScrollView>
      </View>
    </View>
  );
}

export default Attach;
