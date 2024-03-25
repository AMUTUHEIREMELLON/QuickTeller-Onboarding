// import React, { useRef, useState } from 'react';
// import { View, StyleSheet, Image, Platform } from 'react-native';
// import Signature from 'react-native-signature-canvas';
// import { useDispatch } from 'react-redux';
// import { addSignature } from '../redux/reducers/formSlice';
// import * as FileSystem from 'expo-file-system';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { baseUrl } from '../helpers/config';

// import Styles from '../constants/Styles';

// const createSignatureFormData = (uri, fileData, name, imageName) => {
//   const Region = fileData.Region;
//   const BranchName = fileData.BranchName;
//   const AgentName = fileData.AgentName;
//   const TempUseSessionId = fileData.TempUseSessionId;
//   const InstCode = fileData.InstitutionCode;
//   const UploadedBy = fileData.Recruiter;
//   const UserId = fileData.UserId;
//   const InstName = fileData.InstName;

//   const data = new FormData();
//   data.append(name, {
//     name: imageName,
//     type: 'image/png',
//     uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
//   });
//   data.append('Region', Region);
//   data.append('BranchName', BranchName);
//   data.append('AgentName', AgentName);
//   data.append('TempUseSessionId', TempUseSessionId);
//   data.append('InstCode', InstCode);
//   data.append('UserId', UserId);
//   data.append('UploadedBy', UploadedBy);
//   data.append('InstName', InstName);
//   return data;
// };

// const SignatureComponent = ({ onSignature, onClear }) => {
//   const ref = useRef();
//   // const dispatch = useDispatch();
//   const [signatureImage, setSignatureImage] = useState(null);

//   const uploadBase64 = async (base64String) => {
//     const base64Data = base64String.replace('data:image/png;base64,', '');
//     const filename = 'signature-image-temp.png';

//     try {
//       const uri = FileSystem.cacheDirectory + filename;
//       await FileSystem.writeAsStringAsync(uri, base64Data, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       const savedUser = await AsyncStorage.getItem('loginResponse');
//       if (!savedUser) return;
//       const user = JSON.parse(savedUser);

//       const formData = createSignatureFormData(
//         uri,
//         user,
//         'Signature',
//         filename
//       );

//       // Replace this URL with your server's URL
//       // const serverUrl = `${baseUrl}/AgentFile/uploadApplicationAttachment`;

//       // Send the formData to the server
//       await axios.post(
//         `${baseUrl}/AgentFile/uploadApplicationAttachment`,
//         formData
//       );
//     } catch (e) {
//       console.log('*Error*');
//       console.log(e);
//     }
//   };

//   const handleSignature = (signature) => {
//     console.log('This is sign', signature);
//     // dispatch(addSignature(signature));
//     onSignature(signature);
//     setSignatureImage(signature);

//     // Call uploadBase64 here
//     uploadBase64(signature);
//   };

//   const handleClear = () => {
//     ref.current.clearSignature();
//     onClear();
//     setSignatureImage(null);
//   };

//   return (
//     <View>
//       <View style={styles.signature}>
//         <Signature ref={ref} onOK={handleSignature} descriptionText="Sign" />
//       </View>
//       {signatureImage && (
//         <Image
//           style={{ width: 400, height: 200 }}
//           source={{ uri: signatureImage }}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   signature: {
//     width: '100%',
//     height: 500,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default SignatureComponent;
