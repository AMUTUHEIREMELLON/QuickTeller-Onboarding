import { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppBar, Avatar } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Color from '../constants/Colors';
import Styles from '../constants/Styles';
import DashboardMenu from '../components/DashboardMenu';

import makeSessionID from '../helpers/sessionID';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/authSlice';

export default function Dashboard() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState(null);

  const getUserDetails = async () => {
    try {
      let res = await AsyncStorage.getItem('loginResponse');
      setUserDetails(JSON.parse(res));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      {userDetails && (
        <View style={Styles.mainContainer}>
          <View style={{ height: '20%' }}>
            <AppBar
              title="Welcome Back"
              subtitle={userDetails.Recruiter}
              titleStyle={Styles.avertaRegular}
              subtitleStyle={[Styles.avertaExtraBold, { fontSize: 18 }]}
              color={Color.darkBlue}
              style={{
                height: '100%',
                justifyContent: 'center',
                alignContent: 'center',
              }}
              leading={(props) => (
                <Avatar label={userDetails.Recruiter} autoColor />
              )}
              leadingContainerStyle={{ marginLeft: '10%' }}
            />
          </View>

          <ScrollView
            style={{ height: '80%', backgroundColor: Color.warmBlue }}
          >
              <Text style={[Styles.h1, {marginTop:'5%'}]}>Dashboard</Text>

            <View
              style={{ flexDirection: 'row', flexWrap: 'wrap', padding: '5%' }}
            >
              <DashboardMenu
                title="Set up New Agent"
                icon="account-multiple-plus"
                color={Color.blueMunsell}
                onPress={() => {
                  let TempUseSessionId = makeSessionID();
                  navigation.navigate('NewAgent', {
                    screen: 'AgentType',
                    params: { TempUseSessionId },
                  });
                }}
              />
              <DashboardMenu
                title="Set up Existing Agent"
                icon="account"
                color={Color.yellow}
                onPress={() => {
                  let TempUseSessionId = makeSessionID();
                  navigation.navigate('ExistingAgent', {
                    screen: 'AgentInfo',
                    params: { TempUseSessionId },
                  });
                }}
              />
              <DashboardMenu
                title="Issues"
                icon="clipboard-edit-outline"
                color={Color.yellow}
                onPress={() => navigation.navigate('Issues')}
              />
              <DashboardMenu
                title="Reports"
                color={Color.blueMunsell}
                icon="finance"
                onPress={() => navigation.navigate('Reports')}
              />
              <DashboardMenu
                title="Card Onboarding"
                color={Color.green}
                icon="credit-card"
                onPress={() => navigation.navigate('CardOnBoarding')}
              />
              <DashboardMenu
                title="Logout"
                color={Color.red}
                icon="logout"
                onPress={() => {
                  dispatch(logout());
                  navigation.navigate('LogIn')
                }}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
