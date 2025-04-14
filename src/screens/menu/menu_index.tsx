import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import styles from './styles';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import {maxWorkers} from '../../../metro.config';

type RootStackParamList = {
  Menu: undefined;
  WorkOrder: undefined;
  Transfer: {docEntry: string; tranferId: string};
};

type MenuScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Transfer'
>;

interface MenuScreenProps {
  navigation: MenuScreenNavigationProp;
  route: any;
}

const MenuScreen: React.FC<MenuScreenProps> = ({route, navigation}) => {
  //Get docEntry,tranferId from Menu
  const {docEntry} = route.params;
  const {tranferId} = route.params;
  const [userInfo, setUserInfo] = useState<any>();

  console.log('docEntry', docEntry);
  // console.log('1111111111');
  console.log('tranferId', tranferId);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userToken');
      console.log('jsonValuejsonValue', jsonValue);

      if (jsonValue) {
        setUserInfo(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Transfer event
  const handleTransfer = async () => {
    try {
      navigation.navigate('Transfer', {docEntry, tranferId});
    } catch (error) {
      console.error('Error navigating to Transfer screen:', error);
    }
  };

  return (
    <View style={styles.container}>
      //Header
      <View style={styles.header}>
        <Image
          source={require('../../assests/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Menu</Text>
        <View style={styles.headerButtons}>
          <Image
            source={require('../../assests/icons/settings.png')}
            style={styles.logo1}
          />
          <Image
            source={require('../../assests/icons/user.png')}
            style={styles.logo1}
          />
        </View>
      </View>
      //Body
      <View style={styles.container}>
        //Top Body
        <Text
          style={[
            styles.labelText,
            {margin: 30},
          ]}>{`Welcome, ${userInfo?.user?.fullName} `}</Text>
        //Main Body
        <View style={styles.mainContainer}>
          //Left Menu
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
                <Text style={styles.buttonText}>Xuất kho sản xuất</Text>/
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Nhập kho bán thành phẩm</Text>/
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Nhập kho thành phẩm</Text>/
              </TouchableOpacity>
            </View>
            //Right Menu
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Biểu mẫu pha chế</Text>/
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Trả lại NVL</Text>/
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Nhập điều chỉnh</Text>/
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Xuất điều chỉnh</Text>/
              </TouchableOpacity>
            </View>
          </View>
          //Logout button
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => console.log('Button pressed')}>
            <Text style={styles.buttonText}>Báo cáo</Text>/
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {width: 300}]}
            onPress={() => console.log('Button pressed')}>
            <Text style={styles.buttonText}>Đăng xuất</Text>/
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MenuScreen;
