import React, { useRef, useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { useDispatch } from 'react-redux';
import { addSignature } from '../redux/reducers/formSlice';

import Styles from '../constants/Styles';

const SignatureComponent = ({ onSignature, onClear }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [signatureImage, setSignatureImage] = useState(null);

  const handleSignature = (signature) => {
    dispatch(addSignature(signature));
    onSignature(signature);
    setSignatureImage(signature);
  };

  const handleClear = () => {
    ref.current.clearSignature();
    onClear();
    setSignatureImage(null);
  };

  return (
    <View>
      <View style={styles.signature}>
        <Signature 
          ref={ref}
          onOK={handleSignature}
          descriptionText="Sign"
        />
      </View>
      {signatureImage && (
        <Image
          style={{ width: 400, height: 200 }}
          source={{ uri: signatureImage }}
        />
      )}
      {/* <Button title="Clear" onPress={handleClear} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  signature: {
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignatureComponent;