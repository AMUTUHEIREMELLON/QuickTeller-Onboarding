// import React, { useRef } from 'react';
// import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import SignatureCanvas from 'react-native-signature-canvas';
// import Signature from 'react-native-signature-canvas';
// import { useDispatch } from 'react-redux';
// import { addSignature } from '../redux/reducers/formSlice';

// import Styles from '../constants/Styles';

// const SignatureComponent = ({ onSignature, onClear }) => {
//   const ref = useRef();
//   const dispatch = useDispatch();

//   const handleSignature = (signature) => {
//     // console.log(signature);
//     dispatch(addSignature(signature));
//     onSignature(signature);
//   };

//   const handleClear = () => {
//     ref.current.clearSignature();
//     onClear();
//   };

//   return (
//     <View>
//       <View style={styles.signature}>
//         <Signature 
//           ref={ref}
//           onOK={handleSignature}
//           descriptionText="Sign"
//         />
//       </View>
//       {/* <Button title="Clear" onPress={handleClear} /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   signature: {
//     width: '100%',
//     height: 400,
//   },
// });

// export default SignatureComponent;

// // const styles = StyleSheet.create({
// //   container: {
// //     alignItems: 'center',
// //     padding: 16,
// //   },
// //   signatureText: {
// //     fontSize: 14,
// //     marginBottom: 8,
// //   },
// //   signatureCanvas: {
// //     width: 350,
// //     height: 100,
// //     borderColor: "#E1E6ED",
// //     borderWidth: 0,
// //     borderRadius: 10,
// //     elevation: 5,
// //   },
// //   saveButtonText: {
// //     color: 'white',
// //     fontSize: 16,
// //   },
// // });

// // export default SignatureCapture;
