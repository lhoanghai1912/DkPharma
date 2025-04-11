import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
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
  const [username, setUsername] = useState<string>('Admin');
  const [password, setPassword] = useState<string>('1234');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Please enter both username and password');
      return;
    }
    try {
      // TODO: Call API login ở đây
      const response = await fetch(
        'https://pos.foxai.com.vn:8123/api/Auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );
      const dataLogin = await response.json();

      console.log('dataLogin?.accessToke', dataLogin);

      if (dataLogin?.refreshToken) {
        try {
          const jsonValue = JSON.stringify(dataLogin);
          await AsyncStorage.setItem('userToken', jsonValue);
          await navigation.navigate('WorkOrder');
        } catch (e) {
          // saving error
        }
      } else {
        Alert.alert('Error', dataLogin.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Something went wrong. Please try again late111r.');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
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
