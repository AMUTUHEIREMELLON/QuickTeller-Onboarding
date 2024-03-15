import { useState } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import { Surface } from '@react-native-material/core';
import * as DocumentPicker from 'expo-document-picker';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import FormData from 'form-data';
// import { uploadFile } from '../helpers/request';
import axios from 'axios';

import Colors from './../constants/Colors';
import Styles from './../constants/Styles';
import Messages from '../constants/Messages';
import { paypointAxios } from '../helpers/axiosConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../helpers/config';

const createFormData = (doc, fileData, fileName) => {
  const Region = fileData.Region;
  const BranchName = fileData.BranchName;
  const AgentName = fileData.AgentName;
  const TempUseSessionId = fileData.TempUseSessionId;
  const InstCode = fileData.InstitutionCode;
  const UploadedBy = fileData.Recruiter;
  const UserId = fileData.UserId;
  const InstName = fileData.InstName;


  const data = new FormData();
  data.append(fileName, {
    name: doc.name,
    type: doc.mimeType,
    uri: Platform.OS === 'android' ? doc.uri : doc.uri.replace('file://', ''),
  });
  data.append('Region', Region);
  data.append('BranchName', BranchName);
  data.append('AgentName', AgentName);
  data.append('TempUseSessionId', TempUseSessionId);
  data.append('InstCode', InstCode);
  data.append('UserId', UserId);
  data.append('UploadedBy', UploadedBy);
  data.append('InstName', InstName);
  return data;
};

export default function Attachment(props) {
  const { attach, fileData, fileName, subtitle, id } = props;
  const [attached, setAttached] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const statusCode = '9000';

  const uploadFile = async (result, formData) => {
    try {
      // const savedUser = await AsyncStorage.getItem('loginResponse');
      // if(!savedUser) return;
      // const user = JSON.parse(savedUser);

      // const payload = {...formData, ...user};
      console.log('Attach request: ', formData);

      if (result) {
        const res = await axios.post(
          `${baseUrl}/AgentFile/uploadApplicationAttachment`,
          formData,
          {
            headers: {
              Accept: '*/*',
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        let resCode = res.data.code || res.data.Code;
        if (resCode === statusCode) {
          console.log('Attach Response: ', res.data);
          setUploadSuccess(true);
        } else {
          setUploadSuccess(false);
          alert(Messages.failMessage);
        }
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      setUploadSuccess(false);
      alert(Messages.retryMessage);
    }
  };

  const PickDocument = async () => {
    setIsLoading(true);
    let result = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: ['application/pdf', 'image/*'],
    });

    if (result.type === 'success') {
      setAttached(true);

      const savedUser = await AsyncStorage.getItem('loginResponse');
      if (!savedUser) return;
      const user = JSON.parse(savedUser);

      const docData = { ...fileData, user };

      const formData = createFormData(result, docData, fileName);
      console.log(formData);
      await uploadFile(result, formData);
      setIsLoading(false);
    }
  };

  // const OpenCamera = async () => {
  //   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert('Access Denied');
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync();

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setDocument(result.uri);
  //     setAttached(true);
  //     const formData = createFormData(result);
  //     uploadFile(result, formData);
  //   }
  // };

  return (
    <>
      <Card
        elevation={0}
        style={[Styles.cardStyle, { marginTop: '3%' }]}
        onPress={PickDocument}
      >
        <Card.Content style={Styles.cardContentStyle}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              height: 60,
              marginRight: 90,
              // height:150
            }}
          >
            <Surface
              elevation={2}
              category="medium"
              style={styles.surfaceStyle}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color={Colors.lightBlue} />
              ) : (
                <Icon
                  name={attached && uploadSuccess ? 'check' : 'upload'}
                  size={30}
                  color={Colors.lightBlue}
                />
              )}
            </Surface>
            <Text
              adjustsFontSizeToFit={true}
              style={[
                Styles.viewStyle,
                Styles.avertaBold,
                {
                  marginHorizontal: '2%',
                  textAlign: 'justify',
                  color: Colors.slightdarkGrey,
                },
              ]}
            >
              {attach}
              {'\n'}
              <Text style={Styles.subtitleStyle}>{subtitle}</Text>
            </Text>
          </View>
        </Card.Content>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  surfaceStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '30%',
    height: '95%',
    padding: 10,
    backgroundColor: Colors.slightGrey,
    alignSelf: 'center',
  },
});
