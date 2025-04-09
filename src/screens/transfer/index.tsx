import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import CheckBox from 'react-native-check-box';

interface MaterialItem {
  id: number;
  itemCode: String;
  itemName: String;
  batchNumber: number;
  expDate: string;
  checkQr: Image;
  requiredQuantity: number;
  quantity: number;
  calculatedQuantity: number;
  remainingQuantity: number;
  uomCode: string;
  note: string;
  checked: boolean;
}

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';

type selectedItem = {
  tranferId: string;
  docEntry: string;
  docDate: string;
};

const TransferScreen: React.FC = () => {
  const [data, setData] = useState<MaterialItem[]>([]); // <--- Đảm bảo kiểu dữ liệu của state là MaterialItem[]
  const [loading, setLoading] = useState<boolean>(false);
  const [tranferId, setTranferId] = useState();
  const [docEntry, setDocEntry] = useState();
  const [docDate, setDocDate] = useState(new Date());
  const docDateEncoded = encodeURIComponent(docDate.toISOString());

  const [selected, setSelected] = useState<selectedItem | undefined | null>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('11111');

      console.log('tokentoken=====>', token);
      const url = `http://pos.foxai.com.vn:8123/api/Production/getTranferRequest63?DocEntry=94&docDate=Sun%2C09%20Nov%202025%2018%3A08%3A19%20GMT`;

      const res = await axios.get<MaterialItem[]>(
        url,
        // `http://pos.foxai.com.vn:8123/api/Production/getTranferRequest${tranferId}?DocEntry=${docEntry}&docDate=${docDateEncoded}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
    } catch (err) {
      console.log('333333');

      Alert.alert('API err', err?.message);
      console.error(err);
    } finally {
      setLoading(false);
      console.log('4444444');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateField = (index: number, key: keyof MaterialItem, value: any) => {
    const newData = [...data];
    newData[index][key] = value;
    setData(newData);
  };

  return (
    <View style={styles.container}>
      {/* //Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assests/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText_header}>Transfer</Text>
        <View style={styles.logo} />
      </View>

      {/* //Body */}
      <View style={styles.body}>
        {/* //Top cont */}
        <View style={styles.topContainer}>
          <View style={styles.col_topContainer}>
            <View>
              <TextInput style={styles.item_topContainer}>Mã CT</TextInput>
              <TextInput style={styles.item_topContainer}>
                Ngày xuất kho
              </TextInput>
              <TextInput style={styles.item_topContainer}>Trạng thái</TextInput>
            </View>
            <View>
              <TextInput style={styles.item_topContainer}>
                Lệnh sản xuất
              </TextInput>
              <TextInput style={styles.item_topContainer}>
                Tên thành phẩm
              </TextInput>
              <TextInput style={styles.item_topContainer}>Kho xuất</TextInput>
            </View>
            <View>
              {/* <TextInput style={styles.item_topContainer}>Mã yêu cầu chuyển kho</TextInput> */}

              <Picker
                selectedValue={setDocEntry}
                onValueChange={itemValue => setDocEntry(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Chọn mã yêu cầu chuyển kho" value="" />{' '}
              </Picker>

              <TextInput style={styles.item_topContainer}>
                Mã thành phẩm
              </TextInput>
              <TextInput style={styles.item_topContainer}>Người nhập</TextInput>
            </View>
          </View>
        </View>
        {/* Table Header */}
        <View style={styles.row}>
          // <Text style={styles.cell}>STT</Text>
          // <Text style={styles.cell}>Mã NVL</Text>
          // <Text style={styles.cell}>Tên NVL</Text>
          // <Text style={styles.cell}>Số lô</Text>
          // <Text style={styles.cell}>Hạn sử dụng</Text>
          // <Text style={styles.cell}>Kiểm tra QR</Text>
          // <Text style={styles.cell}>SL theo yc</Text>
          // <Text style={styles.cell}>SL xuất thực tế</Text>
          // <Text style={styles.cell}>SL luỹ kế</Text>
          // <Text style={styles.cell}>SL Còn lại</Text>
          // <Text style={styles.cell}>ĐVT</Text>
          // <Text style={styles.cell}>Ghi chú</Text>
        </View>
        {/* //Table Body */}
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', padding: 20}}>
              {loading ? 'Đang tải dữ liệu...' : 'Không có dữ liệu'}
            </Text>
          }
          renderItem={({item, index}) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{item.itemCode}</Text>
              <Text style={styles.cell}>{item.itemName}</Text>
              <Text style={styles.cell}>{item.batchNumber}</Text>
              <Text style={styles.cell}>{item.expDate}</Text>

              <View style={styles.cell}>
                <CheckBox
                  isChecked={item.checked} // <-- Sử dụng isChecked thay cho value
                  onClick={() => updateField(index, 'checked', !item.checked)} // Toggle checkbox state
                />
              </View>

              <TextInput
                style={styles.cellInput}
                value={String(item.requiredQuantity)}
                keyboardType="numeric"
                onChangeText={val =>
                  updateField(index, 'requiredQuantity', Number(val))
                }
              />

              <TextInput
                style={[styles.cellInput, {color: '#aaa'}]}
                editable={false}
                value={String(item.quantity)}
              />

              <Text style={styles.cell}>{item.calculatedQuantity}</Text>
              <Text style={styles.cell}>{item.remainingQuantity}</Text>
              <Text style={styles.cell}>{item.uomCode}</Text>
              <Text style={styles.cell}>{item.note || ''}</Text>
            </View>
          )}
        />
        // {/* Table Header */}
      </View>
      {/* Table Body */}

      {/* //Bottom cont */}
      <View style={styles.bottomContainer}></View>
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
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 'auto',
    backgroundColor: '#dcdcdc',
    justifyContent: 'space-between',
  },
  headerText_header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  topContainer: {
    // flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 1,
    borderWidth: 1,
    marginHorizontal: 10,
  },
  col_topContainer: {
    // flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: '#000',
    // backgroundColor: 'red',
  },
  item_topContainer: {
    // flex: 1,
    width: '100%',
    // borderRadius: 1,
    // borderWidth: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  headerText_body: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 1,
    borderWidth: 1,
  },
  pickerContainer: {
    borderColor: '#000', // Viền cho Picker
    borderWidth: 1, // Độ dày viền của Picker
    borderRadius: 10, // Bo góc cho Picker
    backgroundColor: 'red',
    marginBottom: 20,
  },
  picker: {
    // flex: 1,
    width: 300,
    borderColor: 'red',
    borderWidth: 10,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'black',
    // backgroundColor: 'red',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    // padding: 5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  cellInput: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 2,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  item_mainContainer: {
    flex: 1,
    width: 'auto',
    textAlign: 'center',
    borderRadius: 1,
    borderWidth: 1,
  },
  bottomContainer: {
    flex: 1,
    alignContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  logo: {
    width: 100,
    height: 100,
    // marginBottom: 20,
    resizeMode: 'contain', // Adjust the image size as needed
    alignSelf: 'flex-start',
  },
});

export default TransferScreen;
