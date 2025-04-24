import React, {use, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  UserInfo: undefined;
  Menu: {docEntry: string; tranferId: string};
  Login: undefined;
};

type UserInfoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserInfo'
>;

interface UserInfoScreenProps {
  navigation: UserInfoScreenNavigationProp;
  route: any;
}
const UserInfo: React.FC<UserInfoScreenProps> = ({route, navigation}) => {
  const {docEntry, tranferId} = route.params;

  const [checked, setChecked] = React.useState('first');
  const [userInfo, setUserInfo] = useState<any>();
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordRef, setNewPasswordRef] = useState<string>('');
  const [isOldPassWordVisible, setIsOldPassWordVisible] =
    useState<boolean>(false);
  const [isNewPassWordVisible, setisNewPassWordVisible] =
    useState<boolean>(false);
  const [isNewPassWordVisibleRef, setisNewPassWordVisibleRef] =
    useState<boolean>(false);
  // console.log('userInfo======>', userInfo);

  //Text change
  const handleInputChange = (value: string, type: number) => {
    const newArr = {
      ...userInfo,
      user: {
        ...userInfo?.user,
        ...(type === 1 && {center: value}), // Nếu type là 1, cập nhật trường center
        ...(type === 2 && {fullName: value}), // Nếu type là 2, cập nhật trường fullName
        ...(type === 3 && {department: value}),
      },
    };
    setUserInfo(newArr);
  };

  //Hide/show password
  const togglePasswordVisibility = (type: number) => {
    if (type === 1) setIsOldPassWordVisible(!isOldPassWordVisible);
    if (type === 2) setisNewPassWordVisible(!isNewPassWordVisible);
    if (type === 3) setisNewPassWordVisibleRef(!isNewPassWordVisibleRef);
  };

  //Get User Data
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userToken');
      console.log('jsonValuejsonValue', jsonValue);
      if (jsonValue) {
        setUserInfo(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log('erro: ', e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // Button event
  // User update event
  const handleUpdateUser = async () => {
    if (
      !userInfo?.user?.fullName ||
      !userInfo?.user?.department ||
      !userInfo?.user?.center
    ) {
      Alert.alert('Please enter all information');
      return;
    } else {
      const updatedUserInfo = {
        id: userInfo?.user?.id,
        fullName: userInfo?.user?.fullName,
        center: userInfo?.user?.center,
        department: userInfo?.user?.department,
      };
      try {
        const jsonValueUpdate = JSON.stringify(updatedUserInfo);
        await AsyncStorage.setItem('userData', jsonValueUpdate);
        console.log('userDataaaaaaa======', jsonValueUpdate);

        const respone = await fetch('https://pos.foxai.com.vn:8123/api/Auth', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
          body: JSON.stringify({
            id: userInfo?.user?.id,
            fullName: userInfo?.user?.fullName,
            center: userInfo?.user?.center,
            department: userInfo?.user?.department,
          }),
        });
        console.log('resssssss========', respone);
        console.log('accessToken', userInfo.accessToken);

        const data = await respone.json();

        console.log('resssssssssssss', data);

        if (respone.status === 200) {
          try {
            await AsyncStorage.removeItem('userInfo');
            console.log('removed============');
          } catch (e) {
            console.log('error', e);
          }
          const updateUserToken = JSON.stringify({
            user: updatedUserInfo,
          });
          await AsyncStorage.setItem('userToken', updateUserToken);
          // await AsyncStorage.setItem('userInfo', userInfo);
          Alert.alert('thanh cong');
          console.log('thanh cong');
        } else {
          console.log('that bai');
          Alert.alert('that bai');
        }
        // console.log('update successful \n new data:', updatedUserInfo);
      } catch (e) {
        console.log('error:', e);
      }
    }
  };

  //Password update event
  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword || !newPasswordRef) {
      Alert.alert('Please fill in all fields');
      return;
    }
    if (newPassword !== newPasswordRef) {
      Alert.alert('New password and confirm password need to match');
      return;
    }
    try {
      const response = await fetch(
        'https://pos.foxai.com.vn:8123/api/Auth/changePassword',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo?.user?.accessToken}`,
          },
          body: JSON.stringify({
            id: userInfo?.user?.id,
            oldPassword: oldPassword,
            password: newPassword,
            refPassword: newPasswordRef,
          }),
        },
      );
      console.log('resssssssssss==========================', response);

      const data = await response.json();
      if (response.status === 200) {
        Alert.alert('Password changed, please login again');
        await AsyncStorage.setItem('userToken', JSON.stringify(userInfo));
        navigation.navigate('Login');
      } else {
        Alert.alert(
          'Faild to change password: ',
          data.status,
          data?.message || ' Please try again latter',
        );
      }
    } catch (e) {
      console.log('erro', e);
    }
  };

  // Back event
  const handleGoBack = async () => {
    navigation.navigate('Menu', {
      docEntry,
      tranferId,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assests/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>User Info</Text>
        <View style={styles.logo} />
      </View>
      <View style={styles.body}>
        <View style={styles.buttonGroup}>
          <View style={styles.radioGroup}>
            <Text style={styles.lableStyle}>Update User Infomation </Text>
            <RadioButton
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />
          </View>
          <View style={styles.radioGroup}>
            <Text style={styles.lableStyle}>Change Password</Text>
            <RadioButton
              value="second"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('second')}
            />
          </View>
        </View>
        <View style={styles.mainBody}>
          <View
            style={[
              styles.updateInfo,
              {display: checked === 'first' ? 'flex' : 'none'},
            ]}>
            <View style={styles.mainContent}>
              <Text style={styles.lableStyle}>UserName</Text>
              <TextInput
                value={userInfo?.user?.username}
                editable={false}
                placeholder="UserName"
                style={styles.readonly}
              />
              <Text style={styles.lableStyle}>Center</Text>
              <TextInput
                value={userInfo?.user?.center}
                placeholder="Center"
                style={styles.textInput}
                onChangeText={text => handleInputChange(text, 1)}
              />
            </View>
            <View style={styles.mainContent}>
              <Text style={styles.lableStyle}>Full Name</Text>
              <TextInput
                value={userInfo?.user?.fullName}
                placeholder="Full Name"
                style={styles.textInput}
                onChangeText={text => handleInputChange(text, 2)}
              />
              <Text style={styles.lableStyle}>Department</Text>
              <TextInput
                value={userInfo?.user?.department}
                placeholder="Department"
                style={styles.textInput}
                onChangeText={text => handleInputChange(text, 3)}
              />
            </View>
          </View>
          <View
            style={[
              styles.changePassword,
              {display: checked === 'second' ? 'flex' : 'none'},
            ]}>
            <View style={styles.mainContent}>
              <View style={styles.passwordField}>
                <Text style={styles.lableStyle}>Old Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Old Password"
                    style={styles.textInput}
                    onChangeText={setOldPassword}
                    secureTextEntry={!isOldPassWordVisible}
                  />
                  <TouchableOpacity
                    onPress={() => togglePasswordVisibility(1)}
                    style={styles.eyeIcon}>
                    <Image
                      source={
                        isOldPassWordVisible
                          ? require('../../assests/icons/hide.png')
                          : require('../../assests/icons/view.png')
                      }
                      style={styles.eyeIconImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.mainContent}>
              <View style={styles.passwordField}>
                <Text style={styles.lableStyle}>New Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="New Password"
                    style={styles.textInput}
                    onChangeText={setNewPassword}
                    secureTextEntry={!isNewPassWordVisible}
                  />
                  <TouchableOpacity
                    onPress={() => togglePasswordVisibility(2)}
                    style={styles.eyeIcon}>
                    <Image
                      source={
                        isNewPassWordVisible
                          ? require('../../assests/icons/hide.png')
                          : require('../../assests/icons/view.png')
                      }
                      style={styles.eyeIconImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.passwordField}>
                <Text style={styles.lableStyle}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Confirm Password"
                    style={styles.textInput}
                    onChangeText={setNewPasswordRef}
                    secureTextEntry={!isNewPassWordVisibleRef}
                  />
                  <TouchableOpacity
                    onPress={() => togglePasswordVisibility(3)}
                    style={styles.eyeIcon}>
                    <Image
                      source={
                        isNewPassWordVisibleRef
                          ? require('../../assests/icons/hide.png')
                          : require('../../assests/icons/view.png')
                      }
                      style={styles.eyeIconImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View>
          <View
            style={[
              styles.footer,
              {display: checked === 'first' ? 'flex' : 'none'},
            ]}>
            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
              <Text style={styles.buttonText}>Quay lại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.footer,
              {display: checked === 'second' ? 'flex' : 'none'},
            ]}>
            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
              <Text style={styles.buttonText}>Quay lại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdatePassword}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;
