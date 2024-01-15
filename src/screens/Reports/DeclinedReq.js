import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView } from 'react-native';
import TopBar from '../../components/TopBar';
import DeclinedCard from '../../components/DeclinedCard';
import Styles from '../../constants/Styles';
import DeclinedCard from '../../components/DeclinedCard';
// import axios from 'axios'

export default function DeclinedReq() {
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

  const [data, setData] = useState(null);
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
      console.log('response on declined data',res);

      setData(res.data.response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  console.log('declined data',data);

  const navigation = useNavigation();

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="Declined Requests" onPress={() => navigation.goBack()} />

      <View>
        <ScrollView>
          <View>
          
            {data?.map((decline) => (
              <DeclinedCard key={decline.id} 
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
