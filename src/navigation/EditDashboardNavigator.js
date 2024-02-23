import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import EditAgentType from '../screens/EditNewAgent/EditAgentType';
import EditBankInfo from '../screens/EditNewAgent/EditBankInfo';
import EditBeneficiary from '../screens/EditNewAgent/EditBeneficiary';
import EditCompanyInfo from '../screens/EditNewAgent/EditCompanyInfo';
import EditLocationInfo from '../screens/EditNewAgent/EditLocationInfo';
import EditTerms from '../screens/EditNewAgent/EditTerms';
import EditAttach from '../screens/EditNewAgent/EditAttach';
import EditContactInfo from '../screens/EditNewAgent/EditContactInfo';
import EditDropdownForms from '../screens/Reports/editDropdwnScreen';

const Stack = createNativeStackNavigator();

function EditDashboardNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="EditAgentType"
        component={EditAgentType}
        options={{ headerTitle: 'Agent Type', headerLeft: () => null }}
      />
      <Stack.Screen
        name="EditAgentKyc"
        component={EditDropdownForms}
        options={{ headerTitle: 'edit Dropdown forms', headerLeft: () => null }}
      />

      <Stack.Screen
        name="EditContactInfo"
        component={EditContactInfo}
        options={{ headerTitle: 'Contact Info', headerLeft: () => null }}
      />
      <Stack.Screen
        name="EditCompanyInfo"
        component={EditCompanyInfo}
        options={{ headerTitle: 'Company Info', headerLeft: () => null }}
      />
      <Stack.Screen
        name="EditLocationInfo"
        component={EditLocationInfo}
        options={{ headerTitle: 'Location Info', headerLeft: () => null }}
      />
      <Stack.Screen
        name="EditBankInfo"
        component={EditBankInfo}
        options={{ headerTitle: 'Bank Info', headerLeft: () => null }}
      />
      <Stack.Screen
        name="EditBeneficiary"
        component={EditBeneficiary}
        options={{ headerTitle: 'Beneficiary', headerLeft: () => null }}
      />
      <Stack.Screen
        name="EditAttach"
        component={EditAttach}
        options={{ headerTitle: 'Attach' }}
      />
      <Stack.Screen
        name="EditTerms"
        component={EditTerms}
        options={{ headerTitle: 'Terms' }}
      />
    </Stack.Navigator>
  );
}

export default EditDashboardNavigator;
