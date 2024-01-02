import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import TopBar from '../../components/TopBar';
import TextField from '../../components/TextField';
import Color from '../../constants/Colors';
import Button from '../../components/Button';
import Styles from '../../constants/Styles';
import DeclinedCard from '../../components/declinedCard';
import axios from 'axios';

export default function DeclinedReq({ route }){
  const { userId } = route.params;
   const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchData(userId);
    }
  }, [userId]);

  // const fetchData = async (userId) => {
  //   try {
  //     const response = await axios.get(
  //       `https://paypointt.azurewebsites.net/api/AgentApplic/GetBspApplications?userId=${userId}&dateRange=12/18/2023 - 12/18/2024`
  //     );
  //     console.log('response on declined data', response);
  //     // Handle the response data as needed
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  // const declinedData = [
  //   {
  //     id: 1344,
  //     name: 'linda',
  //     phone: '0987654577',
  //     reason: 'too short',
  //   },

  //   {
  //     id: 1644,
  //     name: 'Mary',
  //     phone: '0457654577',
  //     reason: 'too tall',
  //   },

  //   {
  //     id: 1994,
  //     name: 'jon',
  //     phone: '0457884577',
  //     reason: 'too hideous',
  //   },

  // ];

  // console.log('hhh', declinedData);

  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async (userId) => {
    try {
      const res = await axios.get(
    `https://paypointt.azurewebsites.net/api/AgentApplic/GetBspApplications?userId=${userId}&dateRange=12/18/2023 - 12/18/2023`
        );
      console.log('response on declined data',response.data);

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // console.log('declined data',data);

  const navigation = useNavigation();

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="Declined Requests" onPress={() => navigation.goBack()} />

      <View>
        <ScrollView>
          <View>
          
            {data.map((decline) => (
              <DeclinedCard key={decline.AgentNumber} 
              name={decline.AgentName}
              agentId={decline.AgentId}  
              phone={decline.Phone}
              reason={decline.Status}
              // onPress={}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
