import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import styles from './styles';
import Images from '../../contants/imageContant';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

type selectedItem = {
  productCode: string;
  itemCode: string;
  itemName: string;
  docEntry: string;
  tranferId: string;
};

// Định nghĩa loại đối tượng navigation
type RootStackParamList = {
  Login: undefined;
  WorkOrder: undefined;
  Menu: {docEntry: string; tranferId: string};
};

type WorkOrderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WorkOrder'
>;

interface WorkOrderScreenProps {
  navigation: WorkOrderScreenNavigationProp;
}

const WorkOrderScreen: React.FC<WorkOrderScreenProps> = ({navigation}) => {
  const [data, setData] = useState<any[]>([]);
  const [selected, setSelected] = useState<selectedItem | undefined | null>();
  const [userInfo, setUserInfo] = useState<any>();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userToken');
      console.log('jsonValuejsonValue1', jsonValue);

      if (jsonValue) {
        setUserInfo(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const fetchDataApi = async (token: string) => {
    console.log('token===>', token);
    try {
      const response = await fetch(
        'https://pos.foxai.com.vn:8123/api/Production/getProduction',
        {
          method: 'POST', //  Đổi từ GET sang POST
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const text = await response.text();
      if (!response.ok) {
        console.log('responseeeeeeeeeeeeeeee', response);
        console.error(' API lỗi:', response.status);
        return;
      }
      const json = JSON.parse(text); // Tự parse sau khi kiểm tra raw
      console.log(' Parsed JSON:', json);
      const mappedData = json.items.map((item: any) => ({
        productCode: item.proCode,
        itemCode: item.itemCode,
        itemName: item.itemName,
        docEntry: item.docEntry,
        tranferId: item.tranferId,
      }));
      setData(mappedData);
    } catch (error) {
      console.error(' Lỗi khi gọi API:', error);
    } finally {
    }
  };
  useEffect(() => {
    if (userInfo?.accessToken) {
      fetchDataApi(userInfo?.accessToken);
    }
  }, [userInfo]);
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
  // Menu event
  const handleMenu = () => {
    if (selected) {
      navigation.navigate('Menu', {
        docEntry: selected.docEntry,
        tranferId: selected.tranferId,
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Images.logo} style={styles.logo} />
        <Text style={styles.headerText}>Work Order</Text>
        <View style={styles.logo} />
      </View>
      <Text
        style={[
          styles.labelText,
          {margin: 30},
        ]}>{`Hello,${userInfo?.user?.fullName}`}</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleMenu}>
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.box}>
          {/* Dropdown */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selected?.productCode ?? ''}
              onValueChange={itemValue => {
                const selectedProduct = data.find(
                  item => item.productCode === itemValue,
                );
                if (selectedProduct) {
                  setSelected(selectedProduct); // Store the full object
                  console.log('selectedProduct', selectedProduct);
                } else {
                  setSelected(null);
                }
              }}
              style={styles.picker}>
              <Picker.Item label="Chọn sản phẩm" value="" /> {/* Placeholder */}
              {data.map(item => (
                <Picker.Item
                  label={item.productCode}
                  value={item.productCode}
                  key={item.productCode}
                />
              ))}
            </Picker>
          </View>
          {/* Show Value */}
          <View style={styles.row}>
            <TextInput
              value={selected?.itemCode}
              editable={false} //Chỉ đọc
              placeholder="Mã sản phẩm"
            />
          </View>
          {/* Show Value 1 */}
          <View style={styles.row}>
            <TextInput
              value={selected?.itemName}
              editable={false} //Chỉ đọc
              placeholder="Tên sản phẩm"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkOrderScreen;
