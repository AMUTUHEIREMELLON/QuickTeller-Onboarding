import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import TopBar from '../../components/TopBar';
import DeclinedCard from '../../components/DeclinedCard';
import Styles from '../../constants/Styles';
import { declinedRes } from '../../helpers/request';
import Color from '../../constants/Colors';
import axios from 'axios';

export default function DeclinedReq() {

  const navigation = useNavigation();
  const route = useRoute();
  // Get the declinedApplications from the route parameters
  const { declinedApplications } = route.params;

  return (
    <View style={Styles.declinedContainer}>
      <TopBar title="Declined Applications"  onPress={() => navigation.goBack()} />

     
      
        <ScrollView>
          {declinedApplications.map((decline) => (
            <DeclinedCard
              key={decline.id}
              icon="account"
              color={Color.newblue}
              name={decline.AgentName}
              agentId={decline.AgentId}
              phone={decline.Phone}
              reason={<Text style={{ color: 'red' }}>{decline.Status}</Text>}
              date={decline.LogDate}
              nin={decline.AgentNin}
              // comment={decline.AgentNin}
              onPress={() => navigation.navigate('EditAgentKyc', { decline })}
            />
          ))}
        </ScrollView>
   
    </View>
  );
}
