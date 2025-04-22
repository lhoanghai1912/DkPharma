import {StyleSheet} from 'react-native';

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
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
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
export default styles