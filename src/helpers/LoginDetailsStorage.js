import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  await AsyncStorage.setItem('loginResponse', JSON.stringify(value))
    .then(() => console.log('Successfully Saved to Async Storage'))
    .catch((err) => console.error(err));
};

const resetUserData = async () => {
  await AsyncStorage.removeItem('loginResponse')
  .then(() => console.log('Successfully cleared user data'))
  .catch((err) => console.error(err));
}

const getData = async () => {
  const data = await AsyncStorage.getItem('loginResponse');
  return JSON.parse(data);  
};


const storeAuthToken= async (value) => {
  await AsyncStorage.setItem('token', JSON.stringify(value))
    .then(() => console.log('Successfully Saved to Async Storage'))
    .catch((err) => console.error(err));
};

const getAuthToken = async () => {
  const result = await AsyncStorage.getItem('token')
  return result;
};

export { storeData, getData, getAuthToken, storeAuthToken, resetUserData };
