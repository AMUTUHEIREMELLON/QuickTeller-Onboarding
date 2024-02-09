import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import TopBar from '../../components/TopBar';
import DeclinedCard from '../../components/DeclinedCard';
import Styles from '../../constants/Styles';
import Color from '../../constants/Colors';
import axios from 'axios';

export default function NewReq() {
  const [loading, setLoading] = useState(true);
  const [declinedData, setDeclinedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        'https://paypointt.azurewebsites.net/api/AgentApplic/GetBspApplications?userId=26434&dateRange=12/18/2023 - 12/18/2024'
      );
      console.log('response on declined data', res);
  
      // Filter out only declined requests
      const filteredData = res.data.response.filter(item => item.Status === 'New Request');
      setDeclinedData(filteredData);
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const navigation = useNavigation();

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="New Requests" onPress={() => navigation.goBack()} />

      {loading ? (
        // Loading indicator
        <View style={Styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00425f" />
        </View>
      ) : (
        // Display the data when loading is complete
        <ScrollView>
        {declinedData.map((decline) => (
          <DeclinedCard
            key={decline.id} 
            name={decline.AgentName}
            icon="account"
            color={Color.newblue}
            agentId={decline.AgentId}  
            phone={decline.Phone}
            reason={<Text style={{ color: '#7276ff' }}>{decline.Status}</Text>}
            onPress={() => 

              navigation.navigate('#')
            }
          />
        ))}
      </ScrollView>
      )}
    </View>
  );
}