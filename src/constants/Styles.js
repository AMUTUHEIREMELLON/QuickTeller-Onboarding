import { Platform, StatusBar } from 'react-native';
import Color from './Colors';

export default {
  avertaRegular: {
    fontFamily: 'AvertaRegular',
  },
  avertaBold: {
    fontFamily: 'AvertaBold',
  },
  avertaSemiBold: {
    fontFamily: 'AvertaSemiBold',
  },
  avertaExtraBold: {
    fontFamily: 'AvertaExtraBold',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyItems: 'center',
    padding: 10,
  },
  buttonLabelStyle: {
    fontSize: 16,
    fontFamily: 'AvertaBold',
    color: 'white',
  },
  cardStyle: { borderColor: 'grey', borderRadius: 20 },
  cardContentStyle: { backgroundColor: Color.cultured, borderRadius: 20 },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    backgroundColor: Color.warmGrey,
    paddingHorizontal: '10%',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    fontFamily: 'AvertaRegular',
    paddingHorizontal: '2.5%',
  },

  forgot: {
    fontSize: 14,
    marginTop: 12,
    fontFamily: 'AvertaRegular',
    textAlign: 'center',
  },
  formContainer: {
    marginTop: '1%',
    marginBottom: '3%',
    height: '90%',
  },
  h1: {
    fontSize: 18,
    textAlign: 'center',
    padding: '3%',
    fontFamily: 'AvertaBold',
  },
  h2: {
    fontSize: 16,
    textAlign: 'center',
    padding: '3%',
    fontFamily: 'AvertaBold',
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: 'AvertaSemiBold',
    padding: '4%',
  },
  logo: {
    width: '100%',
    height: '10%',
    marginBottom: '5%',
  },
  mainContainer: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
    // height: 1800,
  },

  dropContainer: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
    height: 1800,
  },


  nextButtonStyle: {
    width: '55%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: '7%',
    marginTop: '5%',
    backgroundColor: Color.darkBlue,
    borderRadius: 15,
    padding: '3%',
  },
  radioButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  radioButtonMainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollviewStyle: { paddingHorizontal: 15 },
  signInBtn: {
    width: '85%',
    borderRadius: 50,
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    marginBottom: 25,
    backgroundColor: Color.red,
  },
  textInput: {
    marginVertical: '2%',
    fontFamily: 'AvertaRegular',
    fontSize: 14,
  },
  underline: {
    fontSize: 14,
    color: Color.lightBlue,
    marginTop: 100,
    marginBottom: 200,
    textDecorationLine: 'underline',
    lineHeight: 28,
    fontFamily: 'AvertaRegular',
  },
  viewStyle: {
    fontSize: 14,
    alignSelf: 'center',
    fontFamily: 'AvertaRegular',
  },
  snackbarStyle: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Color.midnightGreen,
    borderRadius: 15,
  },

  saveButton: {
    width: '60%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: '7%',
    marginTop: '5%',
    backgroundColor: Color.darkBlue,
    borderRadius: 15,
    padding: '3%',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
    height: '100%',
    backgroundColor: 'white',
  },
};
