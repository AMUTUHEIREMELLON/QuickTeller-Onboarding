import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import TopBar from '../../components/TopBar';
import DeclinedCard from '../../components/DeclinedCard';
import Styles from '../../constants/Styles';
import { newApp } from '../../helpers/request';
import Color from '../../constants/Colors';
import axios from 'axios';

export default function DeclinedReq() {





  const navigation = useNavigation();

  return (
    <View style={Styles.declinedContainer}>
      <TopBar title="New Applications" onPress={() => navigation.goBack()} />

     
      
        <ScrollView>
          {newApp.map((decline) => (
            <DeclinedCard
              key={decline.id}
              icon="account"
              color={Color.newblue}
              name={decline.AgentName}
              agentId={decline.AgentId}
              phone={decline.Phone}
              reason={<Text style={{ color: 'skyblue' }}>{decline.Status}</Text>}
              date={decline.LogDate}
              nin={decline.AgentNin}
              onPress={() => navigation.navigate('#')}
            />
          ))}
        </ScrollView>
   
    </View>
  );
}
