import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import TopBar from '../../components/TopBar';
import TextField from '../../components/TextField';
import Color from '../../constants/Colors';
import Button from '../../components/Button';
import Styles from '../../constants/Styles';
import DeclinedCard from '../../components/declinedCard';

export default function DeclinedReq() {
  const declinedData = [
    {
      id: 1344,
      name: 'linda',
      phone: '0987654577',
      reason: 'too short',
    },

    {
      id: 1644,
      name: 'Mary',
      phone: '0457654577',
      reason: 'too tall',
    },

    {
      id: 1994,
      name: 'jon',
      phone: '0457884577',
      reason: 'too hideous',
    },
    
  ];

  console.log('hhh', declinedData);

  const navigation = useNavigation();

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="Declined Requests" onPress={() => navigation.goBack()} />

      <View>
        <ScrollView>
          <View>
            {declinedData?.map((decline) => (
              <DeclinedCard key={decline.id} 
              name={decline.name}
              agentId={decline.id}  
              phone={decline.phone}
              reason={decline.reason}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
