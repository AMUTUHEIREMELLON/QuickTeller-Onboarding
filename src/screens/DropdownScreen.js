import DropButton from '../components/Dropdown';
import PageHeader from '../components/PageHeader';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import * as validationSchema from '../../validation/ValidationSchemas';
import React, { useState } from 'react';

import Styles from '../constants/Styles';
import ContactInfo from './NewAgent/ContactInfo';
import CompanyInfo from './NewAgent/CompanyInfo';
import LocationInfo from './NewAgent/LocationInfo';
import Attach from './NewAgent/Attach';
import Beneficiary from './NewAgent/Beneficiary';

export default function DropdownForms() {
  const [modalOpen, setModalOpen] = useState(false);
  const [iconColor, setIconColor] = useState('grey');

  const navigation = useNavigation();
  const route = useRoute();

  return (
    <ScrollView>
      <View style={Styles.dropContainer}>
        {/* <TopBar title="New Agent" onPress={() => 
        navigation.goBack()} /> */}
        <PageHeader
          icon="account-multiple-plus"
          title="Set up a new agent"
          content="To set up a new agent, provide all relevant information necessary for the KYC below."
          onPress={() => navigation.goBack()}
        />
        <View style={Styles.buttonContainer}>
          <>
            <DropButton
              title="Contact Information"
              subtitle="Share the agents contact details"
              form={<ContactInfo />}
              onOpenModal={() => setModalOpen(true)} // Pass setModalOpen as a prop
            />

            <DropButton
              title="Company Information"
              subtitle="About the agent's company"
              form={<CompanyInfo />}
              onOpenModal={() => setModalOpen(true)} // Pass setModalOpen as a prop
            />

            <DropButton
              title="Location Information"
              subtitle="Where is the agent location"
              form={<LocationInfo />}
            />

            <DropButton
              title="Next of Kin"
              subtitle="Beside agent who do we contact"
              form={<Beneficiary />}
            />

            <DropButton
              title="Documentation"
              subtitle="Attach all relevant documents"
              form={<Attach />}
            />

          </>
        </View>
       
      </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
  },
});
