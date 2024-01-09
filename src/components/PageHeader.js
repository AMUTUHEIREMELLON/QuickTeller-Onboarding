import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AppBar, IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Surface } from 'react-native-paper';

// const coverImage = require('../../assets/QUICKTELLER-03.png');

export default function PageHeader(props) {
  const { title, content, onPress, icon, color } = props;

  return (
    <>
    <Surface style={styles.background}>
      <View style={styles.card}>
        <View>
          <TouchableOpacity onPress={onPress} style={styles.backButton}>
            <Icon name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        <View style={styles.iconStyle} >
          {<Icon  name={icon} color={color} size={40} />}
        </View>
          {<Text style={styles.title}>{title}</Text>}
          {<Text style={styles.content}>{content}</Text>}
        </View>
      </View>
    </Surface>  
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    margin: 5,
    height: 180,
    width: 400,
    marginBottom: 30,
    marginTop: 30,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // elevation: 5,
    borderWidth: 2,
    borderColor: '#E1E6ED',
    
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
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
  },

  iconStyle: {
    marginLeft: 160,
  },

  background: {
    backgroundColor: 'grey'
  }
   

});
