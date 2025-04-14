import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      height: 100,
      backgroundColor: '#dcdcdc',
      justifyContent: 'space-between',
    },
    headerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      marginRight: 10,
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain', // Adjust the image size as needed
      alignSelf: 'flex-start',
    },
    logo1: {
      width: 30,
      height: 30,
      resizeMode: 'contain', // Adjust the image size as needed
      alignSelf: 'center',
      paddingHorizontal: 30,
    },
    mainContainer: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginHorizontal: 50,
    },
    menuContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    menu: {
      flex: 1,
      alignContent: 'space-evenly',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: 'auto',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
      margin: 10,
      width: 500,
      height: 60,
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'center',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    labelText: {
      fontSize: 24,
      fontWeight: 'normal',
      color: '#000',
      alignSelf: 'flex-end',
    },
  });

  export default styles;