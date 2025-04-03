import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

// Định nghĩa loại đối tượng navigation
type RootStackParamList = {
  Login: undefined;
  WorkOrder: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}
// Định nghĩa kiểu cho props của component

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleLogin = () => {
    // TODO: Call API login ở đây
    console.log('Username:', username);
    console.log('Password:', password);

    navigation.navigate('WorkOrder');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <Image
          source={require('../../assests/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Đăng nhập</Text>
      </View> */}
      {/* Main container */}
      {/* logo */}
      <Image
        source={require('../../assests/images/logo.png')}
        style={styles.logo}
      />
      {/* Username input */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={setUsername}
        />

        {/* Password input with eye icon */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />

          {/* Eye icon to toggle password visibility */}
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                isPasswordVisible
                  ? require('../../assests/icons/hide.png')
                  : require('../../assests/icons/view.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <Text></Text> */}
      // Login button
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    // padding: 20,
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
    // marginLeft: 70, // Căn trái cho văn bản
  },
  logo: {
    width: '100%', // Kích thước logo
    height: 100, // Kích thước logo
    resizeMode: 'contain', // Đảm bảo logo không bị méo
    // position: 'absolute',
    // left: 20, // Căn trái
    marginBottom: 20,
  },
  formContainer: {
    width: '70%',
    height: '30%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
    // paddingBottom: 30,
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
    // top: 10,
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

export default LoginScreen;
