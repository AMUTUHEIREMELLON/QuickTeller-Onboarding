import './polyfills/TextEncoding';
import './polyfills/base64Polyfill'
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import * as React from 'react';
import store from './src/redux/store';

import Navigation from './src/navigation';
import { Provider } from 'react-redux';

export default function App() {
  const [loaded] = Font.useFonts({
    AvertaRegular: require('./assets/fonts/Averta-Regular.otf'),
    AvertaBold: require('./assets/fonts/Averta-Bold.otf'),
    AvertaExtraBold: require('./assets/fonts/Averta-ExtraBold.otf'),
    AvertaSemiBold: require('./assets/fonts/Averta-Semibold.otf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Navigation />
        <StatusBar style="auto" />
       
      </SafeAreaView>
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
