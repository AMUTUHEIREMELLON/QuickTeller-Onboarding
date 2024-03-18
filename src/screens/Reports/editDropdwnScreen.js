import DropButton from '../../components/Dropdown';
import PageHeader from '../../components/PageHeader';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import * as validationSchema from '../../validation/ValidationSchemas';
import React, { useState } from 'react';

import Styles from '../../constants/Styles';
import EditContactInfo from '../EditNewAgent/EditContactInfo';
import EditCompanyInfo from '../EditNewAgent/EditCompanyInfo';
import EditLocationInfo from '../EditNewAgent/EditLocationInfo';
import EditAttach from '../EditNewAgent/EditAttach';
import EditBeneficiary from '../EditNewAgent/EditBeneficiary';

export default function EditDropdownForms() {
  const [modalOpen, setModalOpen] = useState(false);
  const [iconColor, setIconColor] = useState('grey');

  const navigation = useNavigation();
  const route = useRoute();
  const { decline } = route.params;
  return (
    <ScrollView>
      <View style={Styles.dropContainer}>
        {/* <TopBar title="New Agent" onPress={() => 
        navigation.goBack()} /> */}
        <PageHeader
          icon="account-multiple-plus"
          title="Update Agent Information"
          content="Edit and Update relevant agent information necessary for the KYC below."
          onPress={() => navigation.goBack()}
        />
        <View style={Styles.buttonContainer}>
          <>
            <DropButton
              title="Contact Information"
              subtitle="Agents contact details"
              form={<EditContactInfo decline={decline}/>}
              onOpenModal={() => setModalOpen(true)} // Pass setModalOpen as a prop
            />

            <DropButton
              title="Company Information"
              subtitle="About the agent's company"
              form={<EditCompanyInfo decline={decline}/>}
              onOpenModal={() => setModalOpen(true)} // Pass setModalOpen as a prop
            />

            <DropButton
              title="Location Information"
              subtitle="Where is the agent location"
              form={<EditLocationInfo decline={decline}/>}
            />

            <DropButton
              title="Next of Kin"
              subtitle="Agent Next of Kin contact"
              form={<EditBeneficiary decline={decline}/>}
            />

            <DropButton
              title="Documentation"
              subtitle="Attach all relevant documents"
              form={<EditAttach decline={decline}/>}
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
