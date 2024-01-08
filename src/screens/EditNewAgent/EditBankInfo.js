import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { Text } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import * as DocumentPicker from 'expo-document-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import TopBar from '../../components/TopBar';
import Styles from '../../constants/Styles';
import Color from '../../constants/Colors';
import Button from '../../components/Button';

function BankInfo() {
  const [document, setDocument] = useState(null);

  const PickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ multiple: false });
    console.log(result);
    if (result.type === 'success') {
      setDocument(result);
    }
  };

  const route = useRoute();
  const navigation = useNavigation();
  const newData = { ...route.params };

  return (
    <View style={Styles.mainContainer}>
      <TopBar title="New Agent" onPress={() => navigation.goBack()} />
      <Text style={Styles.h1}>Bank / Mobile Money Info</Text>
      <ScrollView style={Styles.formContainer}>
        <Formik
          initialValues={{ Email: '' }}
          onSubmit={(values) => {
            console.log({ ...newData, ...values });
            navigation.navigate('Beneficiary', {
              ...newData,
              ...values,
            });
          }}
        >
          {({ handleSubmit, errors }) => (
            <>
              <Card
                style={{ marginTop: '10%', borderRadius: 50 }}
                onPress={PickDocument}
              >
                <Card.Content
                  style={{
                    backgroundColor: Color.darkBlue,
                    borderRadius: 50,
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      paddingVertical: '15%',
                    }}
                  >
                    <Icon name="tray-arrow-up" size={50} color={Color.yellow} />
                    <Text
                      variant="button"
                      style={[
                        Styles.avertaExtraBold,
                        {
                          marginHorizontal: '5%',
                          color: 'white',
                          fontSize: 14,
                          textAlign: 'center',
                        },
                      ]}
                    >
                      Upload Bank or MM Statement *
                    </Text>
                    <Text
                      style={[
                        Styles.viewStyle,
                        {
                          marginHorizontal: '5%',
                          color: 'white',
                        },
                      ]}
                    >
                      (Not less than 3 months)
                    </Text>
                  </View>
                </Card.Content>
              </Card>

              {document && (
                <Text style={[Styles.viewStyle, { margin: '2.5%' }]}>
                  Document Name: {document.name}
                </Text>
              )}

              <Button
                style={Styles.nextButtonStyle}
                onPress={handleSubmit}
                title="Next"
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

export default BankInfo;
