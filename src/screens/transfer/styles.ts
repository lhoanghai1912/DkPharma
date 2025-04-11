import {StyleSheet} from 'react-native';


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
    borderBottomWidth: 1,
    borderRadius: 1,
    padding: 5,
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
    justifyContent: 'center',
    width: '100%',
  },
  content_cell: {
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
    height: 'auto',
    borderRightWidth: 1,
    paddingVertical:5,
    justifyContent: 'center', // Căn giữa theo chiều dọc
  },
  body: {
    flex: 5,
    height: '100%',
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  imgQr: {
    height: 30,
    width: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain', // Adjust the image size as needed
    alignSelf: 'flex-start',
  },
  col_STT: {
    width: 40,
    textAlign: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderLeftWidth:1,
  },
  col_maNVL: {
    textAlign: 'center',
    flex: 1,
    borderRightWidth: 1,
  },
  col_tenNVL: {
    textAlign: 'center',
    flex: 1,
    borderRightWidth: 1,
  },
  col_soLo: {
    textAlign: 'center',
    flex: 1,
    borderRightWidth: 1,
  },
  col_hanSD: {
    textAlign: 'center',
    flex: 1,
    height: 'auto',
    borderRightWidth: 1,
  },
  col_QR: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent:'center',
    width: 50,
    paddingVertical:5,
    height: 'auto',
    borderRightWidth: 1,
  },
  col_yCau: {
    textAlign: 'center',
    flex: 1,
    height: 'auto',
    borderRightWidth: 1,
  },
  col_thucTe: {
    textAlign: 'center',
    flex: 1,
    height: 'auto',
    borderRightWidth: 1,
  },
  col_luyKe: {
    textAlign: 'center',
    flex: 1,
    height: 'auto',
    borderRightWidth: 1,
  },
  col_conLai: {
    textAlign: 'center',
    flex: 1,
    height: 'auto',
    borderRightWidth: 1,
  },
  col_donViTinh: {
    textAlign: 'center',
    height: 'auto',
    flex: 1,
    borderRightWidth: 1,
  },
  col_ghiChu: {
    textAlign: 'center',
    flex: 1,
    height: 'auto',
    borderRightWidth: 1,
  },
});

export default styles;

