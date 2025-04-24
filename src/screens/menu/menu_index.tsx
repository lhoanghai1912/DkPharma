import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import styles from './styles';

import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
type RootStackParamList = {
  Menu: undefined;
  WorkOrder: undefined;
  Transfer: {docEntry: string; tranferId: string};
  Login: undefined;
  UserInfo: {docEntry: string; tranferId: string};
};
type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;
interface MenuScreenProps {
  navigation: MenuScreenNavigationProp;
  route: any;
}
const MenuScreen: React.FC<MenuScreenProps> = ({route, navigation}) => {
  const {docEntry, tranferId} = route.params;
  console.log(docEntry, '     ', tranferId);
  const [userInfo, setUserInfo] = useState<any>();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userToken');
      console.log('jsonValuejsonValue', jsonValue);
      if (jsonValue) {
        setUserInfo(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log('error', e);
    }
  };
  console.log(
    'userinfo111111111111111111111111111111111111111111',
    userInfo?.user,
  );
  useEffect(() => {
    getData();
  }, []);
  //Button event
  // Transfer event
  const handleTransfer = async () => {
    try {
      navigation.navigate('Transfer', {
        docEntry,
        tranferId,
      });
    } catch (error) {
      console.error('Error navigating to Transfer screen:', error);
    }
  };
  // UserInfo Event
  const handleUserInfo = async () => {
    try {
      navigation.navigate('UserInfo', {docEntry, tranferId});
    } catch (error) {
      console.error('Error get userInfo:', error);
    }
  };
  // Logout event
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Xóa token đăng nhập
      await AsyncStorage.removeItem('userToken');
      if (token!) {
        console.log('old Token: ', token);
        await AsyncStorage.removeItem('userToken');
        console.log('Removed token');
      } else {
        console.log('no Token exist');
      }
      console.log('User logged out successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assests/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Menu</Text>
        <TouchableOpacity onPress={handleUserInfo} style={styles.headerButtons}>
          <Image
            source={require('../../assests/icons/user.png')}
            style={styles.logo1}
          />
        </TouchableOpacity>
      </View>
      {/* Body */}
      <View style={styles.container}>
        {/* Top Body */}
        <Text
          style={[
            styles.labelText,
            {margin: 30},
          ]}>{`Welcome, ${userInfo?.user?.fullName} `}</Text>
        {/* Main Body */}
        <View style={styles.mainContainer}>
          {/* Left Menu */}
          <View style={styles.menuContainer}>
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>
                  Kiểm tra nguyên vật liệu đầu vào
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleTransfer}>
                <Text style={styles.buttonText}>Xuất kho sản xuất</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Nhập kho bán thành phẩm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Nhập kho thành phẩm</Text>
              </TouchableOpacity>
            </View>
            {/* Right Menu */}
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Biểu mẫu pha chế</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Trả lại NVL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Nhập điều chỉnh</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Xuất điều chỉnh</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Logout button */}
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => console.log('Button pressed')}>
            <Text style={styles.buttonText}>Báo cáo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {width: 300}]}
            onPress={handleLogout}>
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default MenuScreen;
