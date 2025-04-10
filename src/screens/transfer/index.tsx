import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';

import CheckBox from 'react-native-check-box';
import ItemComponent from './itemComponent';

interface MaterialItem {
  creator: string;
  docCode: string;
  docdate: string;
  tranferId: string;
  whsCode: string;
  productionCode: string;
  id: number;
  itemCode: string;
  itemName: string;
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
import {red} from 'react-native-reanimated/lib/typescript/Colors';

type selectedItem = {
  tranferId: string;
  docEntry: string;
  docDate: string;
};

type RootStackParamList = {
  Menu: undefined;
  Transfer: undefined;
};

type TranferScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Transfer'
>;

interface TranferScreenProp {
  navigation: TranferScreenNavigationProp;
  route: any;
}

const TransferScreen: React.FC<TranferScreenProp> = ({route, navigation}) => {
  //Get docEntry,tranferId from Menu
  const {docEntry} = route.params;
  const {tranferId} = route.params;

  console.log('1', route.params);

  const [data, setData] = useState<MaterialItem[]>([]); // <--- Đảm bảo kiểu dữ liệu của state là MaterialItem[]
  const [loading, setLoading] = useState(false);
  const [docDate, setDocDate] = useState(new Date());
  const docDateEncoded = encodeURIComponent(docDate.toISOString());

  const [selected, setSelected] = useState<selectedItem | undefined | null>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');

      const res = await axios.get<MaterialItem[]>(
        `https://pos.foxai.com.vn:8123/api/Production/getTranferRequest${tranferId}?DocEntry=${docEntry}&docDate=${docDateEncoded}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('1', res);
      if ((res.status = 200)) {
        setData(res.data.items);
      } else {
        Alert.alert('API err');
      }
    } catch (err) {
      Alert.alert('API err', err?.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateField = (index: number, key: keyof MaterialItem, value: any) => {
    // const newData = [...data];
    // newData[index][key] = value;
    // setData(newData);
  };

  const renderItem = ({item, index}: any) => {
    console.log('iteeeeeeeeee', item);
    return (
      <View style={styles.content_row}>
        <Text style={styles.content_cell}>{index + 1}</Text>
        <Text style={styles.content_cell}>{item.itemCode}</Text>
        <Text style={styles.content_cell}>{item.itemName}</Text>
        <Text style={styles.content_cell}>{item.itemCode}</Text>
        <Text style={styles.content_cell}>{item.batchNumber}</Text>
        <Text style={styles.content_cell}>{item.expDate}</Text>
        <TouchableOpacity onPress={() => {}}>
          {/* // <Image source={icons.qr_code} style={styles.imgQr} /> */}
        </TouchableOpacity>
        <Text style={styles.content_cell}>{item.requiredQuantity}</Text>
        <Text style={styles.content_cell}>{item.quantity}</Text>
        <Text style={styles.content_cell}>{item.calculatedQuantity}</Text>
        <Text style={styles.content_cell}>{item.remainingQuantity}</Text>
        <Text style={styles.content_cell}>{item.uomCode}</Text>
        <Text style={styles.content_cell}>{item.note}</Text>
      </View>
    );
  };

  console.log('datadatadatadatadata===', data);

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
              <TextInput style={styles.item_topContainer}>
                {`Mã CT: ${data.productionCode}`}
              </TextInput>
              <TextInput style={styles.item_topContainer}>
                {`Ngày xuất kho: ${data.docDate}`}
              </TextInput>
              <TextInput style={styles.item_topContainer}>
                {`Trạng thái: ${data.status}`}
              </TextInput>
            </View>
            <View>
              <TextInput style={styles.item_topContainer}>
                {`Lệnh sản xuất: ${data.productionCode}`}
              </TextInput>
              <TextInput style={styles.item_topContainer}>
                {`Tên thành phẩm: ${data.itemName}`}
              </TextInput>
              <TextInput style={styles.item_topContainer}>
                {`Kho xuất: ${data.whsCode}`}
              </TextInput>
            </View>
            <View>
              {/* <TextInput style={styles.item_topContainer}>
                Mã yêu cầu chuyển kho
              </TextInput> */}

              <Picker
                selectedValue={docEntry}
                onValueChange={itemValue => setDocEntry(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Chọn mã yêu cầu chuyển kho" value="" />{' '}
              </Picker>

              <TextInput style={styles.item_topContainer}>
                {`Mã thành phẩm: ${data.itemCode}`}
              </TextInput>
              <TextInput style={styles.item_topContainer}>
                {`Người nhập: ${data.creator}`}
              </TextInput>
            </View>
          </View>
        </View>
        {/* Table Header */}
        <View style={styles.table}>
          <View style={styles.content_row}>
            <Text style={[styles.content_cell]}>STT</Text>
            <Text style={styles.content_cell}>Mã NVL</Text>
            <Text style={styles.content_cell}>Tên NVL</Text>
            <Text style={styles.content_cell}>Số lô</Text>
            <Text style={styles.content_cell}>Hạn sử dụng</Text>
            <Text style={styles.content_cell}>Kiểm tra QR</Text>
            <Text style={styles.content_cell}>SL theo yc</Text>
            <Text style={styles.content_cell}>SL xuất thực tế</Text>
            <Text style={styles.content_cell}>SL luỹ kế</Text>
            <Text style={styles.content_cell}>SL Còn lại</Text>
            <Text style={styles.content_cell}>ĐVT</Text>
            <Text style={styles.content_cell}>Ghi chú</Text>
          </View>
          <FlatList
            data={data?.apP_WTQ1}
            renderItem={renderItem}
            keyExtractor={item => item.itemCode.toString()}
            style={{
              flex: 1,
              width: '100%',
            }}
          />
        </View>
      </View>
      {/* //Bottom cont */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity>abc</TouchableOpacity>
        <TouchableOpacity>abc</TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // backgroundColor: 'red',
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

  topContainer: {
    // flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 5,
    borderRadius: 1,
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

  picker: {
    // flex: 1,
    width: 300,
    borderColor: 'red',
    borderWidth: 10,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  content_row: {
    flexDirection: 'row',
    borderWidth: 0.5,
    width: '100%',
  },
  content_cell: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: `lightgrey`,
    textAlign: 'center',
    borderWidth: 0.5,
    borderRadius: 1,
  },
  body: {
    flex: 5,
    height: '100%',
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderRadius: 1,
  },
  table: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bottomContainer: {
    flex: 1,
    alignContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 5,
    borderRadius: 1,
    // backgroundColor: 'blue',
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
