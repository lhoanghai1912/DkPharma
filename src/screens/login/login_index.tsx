import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import styles from './styles';
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
      if (dataLogin?.refreshToken) {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log('Erro:', e);
        }
        try {
          const jsonValue = JSON.stringify(dataLogin);
          await AsyncStorage.setItem('userToken', jsonValue);
        } catch (e) {
          console.log('eeeeeeee.', e);
        }
        await navigation.navigate('WorkOrder');
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

export default LoginScreen;
