import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import TopBar from '../../components/TopBar';
import DeclinedCard from '../../components/DeclinedCard';
import Styles from '../../constants/Styles';
import axios from 'axios';
import Color from '../../constants/Colors';

export default function ApprovedReq() {
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
      const filteredData = res.data.response.filter(
        (item) => item.Status === 'Approved by => mellon.a'
      );
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
      <TopBar title="Approved Requests" onPress={() => navigation.goBack()} />

      {loading ? (
        // Loading indicator
        <View>
          <View style={Styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00425f" />
          </View>
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
              reason={decline.Status}
              onPress={() => navigation.navigate('#')}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
