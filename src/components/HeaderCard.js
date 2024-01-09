import { View, Text, StyleSheet, Image } from 'react-native';

const coverImage = require('../../assets/QUICKTELLER-03.png');

export default function HeaderCard ({ title, content }){
  return (
    <View style={styles.card}>
        <Image source={coverImage} style={styles.coverImage} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    margin: 25,
    height: 131,
    marginBottom: 4,
    marginTop: 50,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // elevation: 5,
    borderWidth: 2 ,
    borderColor: '#E1E6ED'
  },

  coverImage: {
    width: '100%',
    height: '100%', 
    marginBottom: 8,
    borderRadius: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
  },
});


