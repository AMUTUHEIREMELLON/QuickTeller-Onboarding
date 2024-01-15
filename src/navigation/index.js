import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Login from '../screens/Login/Login';
import Dashboard from '../screens/Dashboard';
import DashboardNavigator from './DashboardNavigator';
import ExistingAgentNavigator from './ExistingAgentNavigator';
import IssueNavigator from './IssueNavigator';
import Reports from '../screens/Reports/Reports';
import Welcome from '../screens/Login/Welcome';
import CardOnBoarding from '../screens/Card/CardOnBoarding';
import ReportsNavigator from './ReportsNavigator';
import EditDashboardNavigator from './EditDashboardNavigator'


const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}

function RootNavigation() {
  const AuthStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />

      <Stack.Screen name="NewAgent" component={DashboardNavigator} />

      <Stack.Screen name="ExistingAgent" component={ExistingAgentNavigator} />

      <Stack.Screen name="Issues" component={IssueNavigator} />

      <Stack.Screen name="Reports" component={ReportsNavigator} />

      <Stack.Screen name="EditNewAgent" component={EditDashboardNavigator} />

    </Stack.Navigator>
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerTitle: 'Welcome', headerLeft: () => null }}
      />

      <Stack.Screen
        name="LogIn"
        component={Login}
        options={{ headerTitle: 'Login', headerLeft: () => null }}
      />

      <>
        <Stack.Screen name="Dashboard" component={Dashboard} />

        <Stack.Screen name="NewAgent" component={DashboardNavigator} />

        <Stack.Screen
          name="ExistingAgent"
          component={ExistingAgentNavigator}
        />

        <Stack.Screen name="Issues" component={IssueNavigator} />

        <Stack.Screen name="Reports" component={ReportsNavigator} />

        <Stack.Screen name="CardOnBoarding" component={CardOnBoarding} />
      </>


      {/* <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: 'Oops!' }}
      /> */}
    </Stack.Navigator>
  );
}

export default Navigation;
