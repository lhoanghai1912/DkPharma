import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import moment from 'moment';
import styles from './styles';

import CheckBox from 'react-native-check-box';

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

  // console.log('1', route.params);

  const [data, setData] = useState<{
    items: MaterialItem[];
    apP_WTQ1?: MaterialItem[];
    status?: string;
  }>({items: []}); // Added optional status property
  const [docDate, setDocDate] = useState(new Date());
  const docDateEncoded = encodeURIComponent(docDate.toISOString());
  const [userInfo, setUserInfo] = useState<any>();

  const [selectDate, setSelectDate] = useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [selected, setSelected] = useState<selectedItem | undefined | null>();

  const getData = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem('userToken');
      console.log('tokenvalueeeeeeeeeee', tokenValue);

      if (tokenValue) {
        setUserInfo(JSON.parse(tokenValue));
      }
    } catch (e) {
      console.log('erro: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const fetchData = async (token: string) => {
    console.log('tokennnnnnnnnnnnnn1111', token);

    try {
      console.log('tokennnnnnnnnnnn', token);

      const res = await axios.get<MaterialItem[]>(
        `https://pos.foxai.com.vn:8123/api/Production/getTranferRequest${tranferId}?DocEntry=${docEntry}&docDate=${docDateEncoded}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('2', res);
      if ((res.status = 200)) {
        setData(res.data.items);
      } else {
        Alert.alert('API err');
      }
    } catch (err) {
      Alert.alert('API err', err?.message);
      console.error(err);
    }
  };

  useEffect(() => {
    if (userInfo?.accessToken) {
      fetchData(userInfo?.accessToken);
    }
  }, [userInfo]);

  const updateField = (index: number, key: keyof MaterialItem, value: any) => {
    // const newData = [...data];
    // newData[index][key] = value;
    // setData(newData);
  };

  const renderItem = ({item, index}: any) => {
    console.log('33333333333333333333', item);
    return (
      <View style={styles.content_row}>
        <Text style={[styles.col_STT]}>{index + 1}</Text>
        <Text style={styles.content_cell}>{item.itemCode}</Text>
        <Text style={styles.content_cell}>{item.itemName}</Text>
        <Text style={styles.content_cell}>{item.batchNumber}</Text>
        <Text style={styles.content_cell}>
          {moment(item.expDate).format('L')}
        </Text>
        <TouchableOpacity style={styles.content_cell} onPress={() => {}}>
          <Image
            source={require('../../assests/icons/qr.png')}
            style={styles.img}
          />
        </TouchableOpacity>
        <Text style={styles.content_cell}>{item.requiredQuantity}</Text>
        <Text style={styles.content_cell}>{item.calculatedQuantity}</Text>
        <Text style={styles.content_cell}>{item.quantity}</Text>
        <Text style={styles.content_cell}>{item.remainingQuantity}</Text>
        <Text style={styles.content_cell}>{item.uomCode}</Text>
        <Text style={styles.content_cell}>{item.note}</Text>
      </View>
    );
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
              <TextInput style={styles.item_topContainer}>
                {`Mã CT: ${data.productionCode}`}
              </TextInput>
              <TextInput style={styles.item_topContainer}>
                {`Ngày xuất kho: ${data.docDate}`}
              </TextInput>
              <TextInput style={styles.item_topContainer}>
                {`Trạng thái: ${data.status || 'N/A'}`}
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
            <Text style={[styles.col_STT]}>STT</Text>
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
            data={data.apP_WTQ1 || data.items} // Fallback to items if apP_WTQ1 is undefined
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('pressed')}>
          <Text style={styles.textform}>Tạo phiếu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('pressed')}>
          <Text style={styles.textform}>Đồng bộ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransferScreen;
