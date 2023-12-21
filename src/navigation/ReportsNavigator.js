import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import Reports from '../screens/Reports/Reports';
import DeclinedReq from '../screens/Reports/DeclinedReq';

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
    </Stack.Navigator>
  );
}

export default ReportsNavigator;
