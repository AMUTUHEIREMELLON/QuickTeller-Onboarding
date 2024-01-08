 import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import AgentType from '../screens/NewAgent/AgentType';
import BankInfo from '../screens/NewAgent/BankInfo';
import Beneficiary from '../screens/NewAgent/Beneficiary';
import CompanyInfo from '../screens/NewAgent/CompanyInfo';
import ContactInfo from '../screens/NewAgent/ContactInfo';
import LocationInfo from '../screens/NewAgent/LocationInfo';
import Terms from '../screens/NewAgent/Terms';
import Attach from '../screens/NewAgent/Attach';

import CustomHeader from '../components/CustomHeader';

const Stack = createNativeStackNavigator();

function DashboardNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AgentType"
        component={AgentType}
        options={{ headerTitle: 'Agent Type', headerLeft: () => null }}
      />
      <Stack.Screen
    name="ContactInfo"
    component={ContactInfo}
    options={{
      header: ({ scene, previous, navigation }) => (
        <CustomHeader
          title="Contact Info"
          onPress={() => navigation.goBack()}
        />
      ),
      headerLeft: () => null
    }}
/>

      {/* <Stack.Screen
        name="ContactInfo"
        component={ContactInfo}
        options={{ headerTitle: 'Contact Info', headerLeft: () => null }}
      /> */}
      <Stack.Screen
        name="CompanyInfo"
        component={CompanyInfo}
        options={{ headerTitle: 'Company Info', headerLeft: () => null }}
      />
      <Stack.Screen
        name="LocationInfo"
        component={LocationInfo}
        options={{ headerTitle: 'Location Info', headerLeft: () => null }}
      />
      <Stack.Screen
        name="BankInfo"
        component={BankInfo}
        options={{ headerTitle: 'Bank Info', headerLeft: () => null }}
      />
      <Stack.Screen
        name="Beneficiary"
        component={Beneficiary}
        options={{ headerTitle: 'Beneficiary', headerLeft: () => null }}
      />
      <Stack.Screen
        name="Attach"
        component={Attach}
        options={{ headerTitle: 'Attach' }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{ headerTitle: 'Terms' }}
      />
    </Stack.Navigator>
  );
}

export default DashboardNavigator;
