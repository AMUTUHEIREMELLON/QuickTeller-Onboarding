import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import TopBar from '../../components/TopBar';
import TextField from '../../components/TextField';
import Color from '../../constants/Colors';
import Button from '../../components/Button';
import Styles from '../../constants/Styles';
import DeclinedCard from '../../components/DeclinedCard';

export default function DeclinedReq() {
  return (
    <View 
    style={Styles.mainContainer}
    >
      <TopBar title="Declined Requests" onPress={() => navigation.goBack()} />

      <View>
        <ScrollView>
          <View>
          <DeclinedCard 
            agentId= ''
            name= ''
            phone=''
            reason= ''
          
          />
          </View>
          <DeclinedCard />
        </ScrollView>
      </View>
    </View>
  );
}
