import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import moment from 'moment';
import styles from './styles';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
  useCodeScanner,
} from 'react-native-vision-camera';

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
  Modal,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';

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
  const {docEntry, tranferId} = route.params;
  const [selectedTranferId, setSelectedTranferId] = useState(tranferId[0]);
  const [docDate, setDocDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [userInfo, setUserInfo] = useState<any>();
  const [isBlocked, setIsBlocked] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setselectedDate] = useState(
    moment(docDate).format('DD/MM/YYYY'),
  );
  const [data, setData] = useState<{
    items: MaterialItem[];
    apP_WTQ1?: MaterialItem[];
    status?: string;
  }>({items: []}); // Added optional status property

  const docdDateAPI = moment(selectedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

  // vision camera react native
  const {hasPermission, requestPermission} = useCameraPermission();
  const [isActive, setIsActive] = useState(false); // State for camera activation
  // const {hasPermission, requestPermission} = useMicrophonePermission();
  const device = useCameraDevice('back');

  console.log('đã được cấp quyền chưa ?', hasPermission);
  //Button Event
  //QR
  const handleQR = () => {
    requestPermission();
    if (hasPermission == true) {
      console.log('Request Permission Accpected');
      setIsActive(true);
      if (device == null) {
        console.log('Device not found');
        return (
          <View>
            <Text>Device not found</Text>
          </View>
        );
      }
      setIsBlocked(!isBlocked);
    } else {
      console.log('Request Permission Denied');
    }
  };

  //Go Back event
  const handleGoBack = () => {
    console.log('goback pressed');
    setIsActive(!isActive);
    setIsBlocked(!isBlocked);
  };
  if (isActive === true) {
    console.log('camera dang bat');
  } else {
    console.log('camera phai tat');
  }
  console.log('trang thai QR text', isActive);

  //Scan QR
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: any) => {
      console.log(`Scanned ${codes.value} codes!`);
    },
  });

  //View-Hide
  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Đổi trạng thái khi nhấn nút
    console.log('trang thai an hien: ', isVisible);
  };

  //API
  const getDataFromAsyncStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('docEntryTranferData');
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
      }
    } catch (e) {
      console.log('erro0000000000000000000000000000', e);
    }
  };

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  const getData = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem('userToken');
      console.log('tokenvalueeeeeeeeeee', tokenValue);

      if (tokenValue) {
        setUserInfo(JSON.parse(tokenValue));
      }
    } catch (e) {
      console.log('erro11111111111111: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const fetchData = async (token: string) => {
    console.log('tokennnnnnnnnnnnnn1111', token);
    console.log(tranferId, ' ', docEntry, ' ', selectedDate);

    try {
      const res = await axios.get<MaterialItem[]>(
        `https://pos.foxai.com.vn:8123/api/Production/getTranferRequest${selectedTranferId}?DocEntry=${docEntry}&docDate=${docdDateAPI}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('ressssssssssssssssssss', res);

      console.log('2', res);
      if ((res.status = 200)) {
        setData(res.data.items);
      } else {
        Alert.alert('API err');
      }
    } catch (err) {
      Alert.alert('API err', err?.message);
      console.error(err);
      console.log('erroooooo', err);
    }
  };

  useEffect(() => {
    if (userInfo?.accessToken) {
      fetchData(userInfo?.accessToken);
    }
  }, [docdDateAPI, selectedTranferId, userInfo]);

  const renderItem = ({item, index}: any) => {
    // console.log('33333333333333333333', item);
    return (
      <View style={styles.content_row}>
        <Text style={[styles.col_STT]}>{index + 1}</Text>
        <Text style={styles.content_cell}>{item.itemCode}</Text>
        <Text style={styles.content_cell}>{item.itemName}</Text>
        <Text style={styles.content_cell}>{item.batchNumber}</Text>
        <Text style={styles.content_cell}>
          {moment(item.expDate).format('L')}
        </Text>
        <TouchableOpacity style={styles.content_cell} onPress={handleQR}>
          <Image
            source={require('../../assests/icons/qr.png')}
            style={styles.img}
          />
        </TouchableOpacity>
        <Text style={styles.content_cell}>{item.requiredQuantity}</Text>
        <TextInput
          editable={isBlocked ? false : true}
          style={[
            styles.content_cell,
            {backgroundColor: isBlocked ? 'grey' : 'white'},
          ]}>
          {item.quantity}
        </TextInput>
        <Text style={styles.content_cell}>{item.remainingQuantity}</Text>
        <Text style={styles.content_cell}>{item.calculatedQuantity}</Text>
        <Text style={styles.content_cell}>{item.uomCode}</Text>
        <TextInput
          editable={isBlocked ? false : true}
          style={[
            styles.content_cell,
            {backgroundColor: isBlocked ? 'grey' : 'white'},
          ]}>
          {item.note}
        </TextInput>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={[{display: isActive ? 'none' : 'flex', flex: isActive ? 0 : 1}]}>
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
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={[styles.wrapModal]}>
              <Calendar
                style={styles.modal}
                onDayPress={day => {
                  setDocDate(day.dateString);
                  Alert.alert('docDate:', docDate);
                }}
                markedDates={{
                  [docDate]: {
                    selected: true,
                    disableTouchEvent: true,
                    dotColor: 'orange',
                  },
                }}
              />
              <View style={styles.buttonWrap}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    Alert.alert('abc', docDate),
                      setselectedDate(moment(docDate).format('DD/MM/YYYY')),
                      setModalVisible(false);
                  }}>
                  <Text style={styles.textform}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.textform}>Hủy bỏ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.topContainer}>
            <View style={styles.col_topContainer}>
              <View>
                <Text style={styles.item_topContainer}>
                  {`Mã CT: ${data.productionCode}`}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModalVisible(true)}>
                  <Text style={styles.item_topContainer}>
                    {`Ngày xuất kho: ${selectedDate}`}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.item_topContainer}>
                  {`Trạng thái: ${data.status || 'N/A'}`}
                </Text>
              </View>
              <View>
                <Text style={styles.item_topContainer}>
                  {`Lệnh sản xuất: ${data.productionCode}`}
                </Text>
                <Text style={styles.item_topContainer}>
                  {`Tên thành phẩm: ${data.itemName}`}
                </Text>
                <Text style={styles.item_topContainer}>
                  {`Kho xuất: ${data.whsCode}`}
                </Text>
              </View>
              <View>
                <Picker
                  selectedValue={selectedTranferId}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedTranferId(itemValue)
                  }>
                  {tranferId.map((item: any) => {
                    return <Picker.Item label={[item]} value={item} />;
                  })}
                </Picker>

                <Text style={styles.item_topContainer}>
                  {`Mã thành phẩm: ${data.itemCode}`}
                </Text>
                <Text style={styles.item_topContainer}>
                  {`Người nhập: ${data.creator}`}
                </Text>
              </View>
            </View>
          </View>
          {/* Table Header */}
          <View style={[styles.table]}>
            <View
              style={[
                styles.content_row,
                {display: modalVisible ? 'none' : 'flex'},
              ]}>
              <Text style={[styles.col_STT]}>STT</Text>
              <Text style={styles.content_cell}>Mã NVL</Text>
              <Text style={styles.content_cell}>Tên NVL</Text>
              <Text style={styles.content_cell}>Số lô</Text>
              <Text style={styles.content_cell}>Hạn sử dụng</Text>
              <Text style={styles.content_cell}>Kiểm tra QR</Text>
              <Text style={styles.content_cell}>SL theo yc</Text>
              <TextInput editable={false} style={styles.content_cell}>
                SL xuất thực tế
              </TextInput>
              <Text style={styles.content_cell}>SL luỹ kế</Text>
              <Text style={styles.content_cell}>SL Còn lại</Text>
              <Text style={styles.content_cell}>ĐVT</Text>
              <TextInput editable={false} style={styles.content_cell}>
                Ghi chú
              </TextInput>
            </View>
            <FlatList
              data={data.apP_WTQ1 || data.items} // Fallback to items if apP_WTQ1 is undefined
              renderItem={renderItem}
              keyExtractor={item => item.itemCode.toString()}
              style={[
                {
                  flex: 1,
                  width: '100%',
                },
                {display: modalVisible ? 'none' : 'flex'},
              ]}
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
      <View
        style={[{display: isActive ? 'flex' : 'none', flex: isActive ? 1 : 0}]}>
        <View style={{flex: 1}}>
          {device && (
            <Camera
              style={[
                StyleSheet.absoluteFill,
                {display: isActive ? 'flex' : 'none', flex: 1},
              ]}
              device={device}
              isActive={isActive}
              codeScanner={codeScanner}
            />
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            // {zIndex: 1},
            {
              display: isActive ? 'flex' : 'none',
              width: 'auto',
              alignItems: 'center',
            },
          ]}
          onPress={handleGoBack}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransferScreen;
