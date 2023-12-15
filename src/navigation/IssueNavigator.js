import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import NewIssue from './../screens/Issues/NewIssue';
const Stack = createNativeStackNavigator();

function IssueNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="NewIssue"
        component={NewIssue}
        options={{ headerTitle: 'New Issue', headerLeft: () => null }}
      />
    </Stack.Navigator>
  );
}

export default IssueNavigator;
