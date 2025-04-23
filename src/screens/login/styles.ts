import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      bottom: 50,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      height: 50,
      backgroundColor: 'grey',
    },
    headerText: {
      fontSize: 24,
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    logo: {
      width: '100%', // Kích thước logo
      height: 100, // Kích thước logo
      resizeMode: 'contain', // Đảm bảo logo không bị méo
      marginBottom: 20,
    },
    formContainer: {
      width: '70%',
      height: '30%',
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#f8f8f8',
    },
    input: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 70,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginVertical: 20,
      marginBottom: 15,
      paddingLeft: 10,
      fontSize: 30,
    },
    passwordContainer: {
      width: '100%',
      justifyContent: 'center',
    },
    eyeIcon: {
      position: 'absolute',
      resizeMode: 'contain', // Đảm bảo logo không bị méo
      zIndex: 1,
      width: 30, // Kích thước logo
      height: 30, // Kích thước logo
      right: 10,
      bottom: 35, // Căn giữa theo chiều dọc
    },
    button: {
      height: 70,
      width: '15%',
      backgroundColor: '#4169E1',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 15,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 30,
    },
  });

  export default styles;