import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import ContactInfo from '../screens/NewAgent/ContactInfo';

export default function DropButton(props) {
  const { onPress, style, icon, color, title, subtitle, form } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [iconColor, setIconColor] = useState('grey');
  const [showForm, setShowForm] = useState(false);
  const [arrowIcon, setArrowIcon] = useState('chevron-down');

  const toggleArrowIcon = () => {
    setArrowIcon(showForm ? 'chevron-down' : 'chevron-up');
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setIconColor('green');
    setArrowIcon('chevron-down')
  };

  return (
    <View>
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modalContent}></View>
        <View>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            style={{ ...styles.modalToggle, ...styles.modalClose }}
            onPress={() => {
              setModalOpen(false), setIconColor('green');
            }}
          />
          {form}
        </View>
      </Modal>

      <View>
        <TouchableOpacity
          onPress={() => {
            // setModalOpen(true);
            // setIconColor('green');
            // props.onOpenModal();
            setShowForm(!showForm);
            toggleArrowIcon();
          }}
        >
          <View style={styles.contactbtn}>
            <View style={styles.rowContainer}>
              <Icon name="check-circle" size={24} color={iconColor} />
              <View style={styles.textContainer}>
                <Text style={styles.textstyle}> {title}</Text>
                <Text style={styles.text}> {subtitle}</Text>
              </View>
              <View style={styles.arrowIcon}>
                <Icon name={arrowIcon} size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {showForm && (
          <ScrollView>
            {React.cloneElement(form, { onFormSubmit: handleFormSubmit })}
          </ScrollView>
        )}
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
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },

  arrowIcon: {
    // paddingLeft: 20,
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
    marginBottom: 1,
  },

  contactbtn: {
    flexDirection: 'column',
    paddingRight: 50,
    width: 380,
    height: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E1E6ED',
    backgroundColor: '#FFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
  },

  text: {
    fontSize: 15,
    fontWeight: 'regular',
    color: 'grey',
    textAlign: 'justify',
    fontFamily: 'AvertaRegular',
  },

  textstyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#353F50',
    textAlign: 'justify',
    fontFamily: 'AvertaRegular',
  },

  formContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
});
