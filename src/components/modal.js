import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Color from '../constants/Colors';
import SignatureCapture from './sign';

export default function ModalButton(props) {
  const { onPress, style, icon, color, title, Content, onSave  } = props;

  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <View>
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modalContent}>
          <MaterialIcons
            name="close"
            size={24}
            style={{ ...styles.modalToggle, ...styles.modalClose }}
            onPress={() => setModalOpen(false)}
          />
          <View style={styles.signatureContainer}>

          <SignatureCapture onSave={onSave} closeModal={closeModal} />
          </View>
          
        </View>
      </Modal>

      <View>
        <TouchableOpacity
          
          onPress={() => {
            setModalOpen(true);
            // setIconColor('green');
          }}
        >
          <View style={styles.contactbtn}>
            <View >
              <View style={styles.textContainer}>
                <Text style={styles.textstyle}> {title}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },

  contactbtn: {
    flexDirection: 'column',
    paddingRight: 50,
    width: 210,
    height: 48,
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 85,
    borderWidth: 2,
    borderColor: '#E1E6ED',
    backgroundColor: '#FFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.darkBlue,

  },

  textContainer: {
    flex: 1,
    marginLeft: 40,
    marginTop: 10,
  },

  text: {
    fontSize: 15,
    fontWeight: 'regular',
    color: 'white',
    textAlign: 'justify',
    fontFamily: 'AvertaRegular',
  },

  textstyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'justify',
    fontFamily: 'AvertaRegular',
  },

  signatureContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },


});
