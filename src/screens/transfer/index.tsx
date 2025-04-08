import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';

interface MaterialItem {
  id: number;
  maNvl: String;
  tenNvl: String;
  soLo: number;
  hanSd: string;
  checkQr: Image;
  slYc: number;
  slTt: number;
  slLk: number;
  slCon: number;
  donVi: string;
  ghiChu: string;
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
} from 'react-native';

const TransferScreen: React.FC = () => {
  const [data, setData] = useState<MaterialItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get<MaterialItem[]>(
          'http://pos.foxai.com.vn:8123/api/Production/getTranferRequest51?DocEntry=17&docDate=Sun%2C09%20Nov%202025%2018%3A08%3A19%20GMT%20',
        );
        setData(res.data);
      } catch (err) {
        Alert.alert('API err', 'Cannot featch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
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
              <TextInput style={styles.item_topContainer}>
                Mã yêu cầu chuyển kho
              </TextInput>
              <TextInput style={styles.item_topContainer}>
                Mã thành phẩm
              </TextInput>
              <TextInput style={styles.item_topContainer}>Người nhập</TextInput>
            </View>
          </View>
        </View>
        {/* //Main cont */}
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
              <Text style={styles.cell}>{item.code}</Text>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.lot}</Text>
              <Text style={styles.cell}>{item.expiry}</Text>

              <View style={styles.cell}>
                <CheckBox
                  value={item.checked}
                  onValueChange={val => updateField(index, 'checked', val)}
                />
              </View>

              <TextInput
                style={styles.cellInput}
                value={String(item.quantityRequested)}
                keyboardType="numeric"
                onChangeText={val =>
                  updateField(index, 'quantityRequested', Number(val))
                }
              />

              <TextInput
                style={[styles.cellInput, {color: '#aaa'}]}
                editable={false}
                value={String(item.quantityActual)}
              />

              <Text style={styles.cell}>{item.quantityCumulative}</Text>
              <Text style={styles.cell}>{item.quantityRemaining}</Text>
              <Text style={styles.cell}>{item.unit}</Text>
              <Text style={styles.cell}>{item.note || ''}</Text>
            </View>
          )}
        />
        // {/* Table Header */}
        {/* <View style={styles.headerRow}>
        //   <Text style={styles.headerText_body}>STT</Text>
        //   <Text style={styles.headerText_body}>Mã NVL</Text>
        //   <Text style={styles.headerText_body}>Tên NVL</Text>
        //   <Text style={styles.headerText_body}>Số lô</Text>
        //   <Text style={styles.headerText_body}>Hạn sử dụng</Text>
        //   <Text style={styles.headerText_body}>Kiểm tra QR</Text>
        //   <Text style={styles.headerText_body}>SL theo yc</Text>
        //   <Text style={styles.headerText_body}>SL xuất thực tế</Text>
        //   <Text style={styles.headerText_body}>SL luỹ kế</Text>
        //   <Text style={styles.headerText_body}>SL Còn lại</Text>
        //   <Text style={styles.headerText_body}>ĐVT</Text>
        //   <Text style={styles.headerText_body}>Ghi chú</Text>
         </View> */}
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
    height: 100,
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
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderRadius: 1,
    borderWidth: 1,
    justifyContent: 'space-between',
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
  cell: {
    flex: 1,
    textAlign: 'center',
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
