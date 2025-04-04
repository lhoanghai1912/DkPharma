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
} from 'react-native';

// Định nghĩa loại đối tượng navigation
type RootStackParamList = {
  Login: undefined;
  WorkOrder: undefined;
  Menu: undefined;
};

type WorkOrderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WorkOrder'
>;

interface WorkOrderScreenProps {
  navigation: WorkOrderScreenNavigationProp;
}

const WorkOrderScreen: React.FC<WorkOrderScreenProps> = ({navigation}) => {
  // Logout event
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Xóa token đăng nhập
      console.log('User logged out successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Menu event
  const handleMenu = async () => {
    navigation.navigate('Menu');
  };

  type selectedItem = {
    productCode: string;
    itemCode: string;
    itemName: string;
  };

  const [data, setData] = useState<any[]>([]);
  const [selected, setSelected] = useState<selectedItem | undefined | null>();
  const [loading, setLoading] = useState(true);

  console.log({data, selected});

  useEffect(() => {
    fetchData();
  }, []); // Gọi hàm fetchData khi component được mount

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      const response = await fetch(
        'http://pos.foxai.com.vn:8123/api/Production/getProduction',
        {
          method: 'POST', // 👈 Đổi từ GET sang POST
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const text = await response.text();
      console.log('📦 Raw response:', text);

      if (!response.ok) {
        console.error('❌ API lỗi:', response.status);
        return;
      }

      const json = JSON.parse(text); // Tự parse sau khi kiểm tra raw
      console.log('✅ Parsed JSON:', json);

      const mappedData = json.items.map((item: any, index: number) => ({
        productCode: item.proCode,
        itemCode: item.itemCode,
        itemName: item.itemName,
      }));

      setData(mappedData);
    } catch (error) {
      console.error('🚨 Lỗi khi gọi API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assests/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Work Order</Text>
        <View style={styles.logo} />
      </View>

      <Text style={[styles.labelText, {margin: 30}]}>Hello, user name</Text>

      <View style={styles.body}>
        <View style={styles.box}>
          {/* Dropdown */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selected?.itemCode ?? ''}
              onValueChange={itemValue => {
                const selectedProduct = data.find(
                  item => item.itemCode === itemValue,
                );
                if (selectedProduct) {
                  setSelected(selectedProduct); // Store the full object
                } else {
                  setSelected(null);
                }
              }}
              style={styles.picker}>
              <Picker.Item label="Chọn sản phẩm" value="" /> {/* Placeholder */}
              {data.map(item => (
                <Picker.Item
                  label={item.productCode}
                  value={item.itemCode}
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
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleMenu}>
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 100,
    backgroundColor: '#dcdcdc',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 100,
    // marginBottom: 20,
    resizeMode: 'contain', // Adjust the image size as needed
    alignSelf: 'flex-start',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
  },
  body: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginTop: 20,
    marginBottom: 20,
  },
  box: {
    // flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 400,
    width: 800,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  pickerContainer: {
    borderColor: '#000', // Viền cho Picker
    borderWidth: 1, // Độ dày viền của Picker
    borderRadius: 10, // Bo góc cho Picker
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  picker: {
    borderColor: 'red',
    borderWidth: 10,
    borderRadius: 10,
  },
  row: {
    height: 60,
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderColor: '#000',
    borderWidth: 1, // Độ dày viền của Picker
    borderRadius: 10,
  },
  inputText: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10, // Thêm khoảng cách dưới trường nhập liệu
    paddingLeft: 10, // Thêm padding cho trường nhập liệu
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    height: 100,
    // backgroundColor: '#dcdcdc',
    // paddingHorizontal: 10,
    // paddingVertical: 10,
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default WorkOrderScreen;
