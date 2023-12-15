import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import Existing from './../screens/ExistingAgent/Existing';
import LocationInfo from './../screens/ExistingAgent/LocationInfo';
import Terms from './../screens/ExistingAgent/Terms';
import Attach from './../screens/ExistingAgent/Attach';

const Stack = createNativeStackNavigator();

function ExistingAgentNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AgentInfo"
        component={Existing}
        options={{ headerTitle: 'Agent Info' }}
      />
      <Stack.Screen
        name="LocationInfo"
        component={LocationInfo}
        options={{ headerTitle: 'Location Info' }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{ headerTitle: 'Terms' }}
      />
      <Stack.Screen
        name="Attach"
        component={Attach}
        options={{ headerTitle: 'Attach' }}
      />
    </Stack.Navigator>
  );
}

export default ExistingAgentNavigator;
