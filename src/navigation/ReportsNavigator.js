import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import Reports from '../screens/Reports/Reports';
import DeclinedReq from '../screens/Reports/DeclinedReq';
import EditDashboardNavigator from './EditDashboardNavigator';
import EditAgentType from '../screens/EditNewAgent/EditAgentType';
import EditContactInfo from '../screens/EditNewAgent/EditContactInfo';
import EditLocationInfo from '../screens/EditNewAgent/EditLocationInfo';
import EditCompanyInfo from '../screens/EditNewAgent/EditCompanyInfo';
import EditAttach from '../screens/EditNewAgent/EditAttach';


const Stack = createNativeStackNavigator();

function ReportsNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Declined"
        component={Reports}
        options={{ headerTitle: 'Declined' }}
      />

      <Stack.Screen
        name="DeclinedReq"
        component={DeclinedReq}
        options={{ headerTitle: 'Declined Requests' }}
      />

      <Stack.Screen
        name="EditAgentType"
        component={EditAgentType}
        options={{ headerTitle: 'Agent Type', headerLeft: () => null }}
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
        name="EditAttach"
        component={EditAttach}
        options={{ headerTitle: 'Attach' }}
      />
    </Stack.Navigator>
  );
}

export default ReportsNavigator;
