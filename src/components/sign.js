import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import Styles from '../constants/Styles';

const SignatureCapture = ({ onSave }) => {
    const signatureRef = useRef();

  const handleSave = () => {
    signatureRef.current.readSignature();
  };

  const handleConfirm = (signature) => {
    // Do something with the captured signature (e.g., save, send to server)
    onSave(signature);
    console.log('Saved Signature:', signature);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signatureText}>Sign Here:</Text>
      <SignatureCanvas
        ref={signatureRef}
        onOK={handleConfirm}
        style={styles.signatureCanvas}
      />
      <TouchableOpacity style={Styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Signature</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  signatureText: {
    fontSize: 14,
    marginBottom: 8,
  },
  signatureCanvas: {
    width: 350,
    height: 100,
    borderColor: "#E1E6ED",
    borderWidth: 0,
    borderRadius: 10,
    elevation: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignatureCapture;
