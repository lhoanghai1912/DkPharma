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
};

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

interface MenuScreenProps {
  navigation: MenuScreenNavigationProp;
}

const MenuScreen: React.FC<MenuScreenProps> = ({navigation}) => {
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
                <Text style={styles.buttonText}>Xác nhận</Text>/
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Xác nhận</Text>/
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Xác nhận</Text>/
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Xác nhận</Text>/
              </TouchableOpacity>
            </View>
            //Right Menu
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Xác nhận</Text>/
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Xác nhận</Text>/
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Xác nhận</Text>/
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Xác nhận</Text>/
              </TouchableOpacity>
            </View>
          </View>
          //Report button
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Button pressed')}>
            <Text style={styles.buttonText}>Báo cáo</Text>/
          </TouchableOpacity>
          //Logout button
          <TouchableOpacity
            style={styles.button}
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
    // alignItems: 'center',
    // backgroundColor: 'red',
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
    // marginBottom: 20,
    resizeMode: 'contain', // Adjust the image size as needed
    alignSelf: 'flex-start',
  },
  logo1: {
    width: 30,
    height: 30,
    // marginBottom: 20,
    resizeMode: 'contain', // Adjust the image size as needed
    alignSelf: 'center',
    paddingHorizontal: 30,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    // backgroundColor: 'red',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'flex-start',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'red',
  },
  menu: {
    height: 'auto',
    borderColor: '#000',
    // backgroundColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'blue',
    margin: 10,
    width: 400,
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
