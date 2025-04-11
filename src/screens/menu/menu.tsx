import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';

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

  console.log('docEntry', docEntry);
  // console.log('1111111111');
  console.log('tranferId', tranferId);

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
        <Text style={[styles.labelText, {margin: 30}]}>Welcome, user name</Text>
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
export default MenuScreen;
