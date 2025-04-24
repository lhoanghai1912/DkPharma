import {Modal, StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  wrapModal:{
    flex:1,
    width:'auto',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
  },
  modal:{
    // flex:1,
    height:300,
    width:500,
    justifyContent:'center',
    alignContent:'center',
  },
  buttonWrap:{
    // flex:1,
    width:500,
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  container: {
    flex: 1,
    borderWidth:1,
    borderRadius:5,
    padding:5,
  },
  container1: {
    flex: 1,
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

  // Body
  topContainer: {
    // flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  col_topContainer: {
    // flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: '#000',
  },
  item_topContainer: {
    // flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  toggleView: {
    flex: 1,
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 300,
    borderWidth: 10,
    borderRadius: 10,
  },

  //body container

  body: {
    flex: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth:1,
  },
  table: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  //Bottom container
  bottomContainer: {
    flexDirection:'row',
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderRadius: 1,
  },
  button:{
    alignItems:'center',
    width:'auto',
    backgroundColor:'cornflowerblue',
    padding:5,
    borderRadius:5,
    borderWidth:1,
  },
  textform: {
    height:'auto',
    fontSize: 22,
    textAlign:'center',
    fontWeight:500,
    color:'white',
  },
  img: {
    alignItems:'center',
    resizeMode:'contain',
    height: 30,
    width:30,
    },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain', // Adjust the image size as needed
    alignSelf: 'flex-start',
  },
  col_STT: {
    width: 40,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems:'center',
    alignContent:'center',
    borderRightWidth: 1,
    paddingVertical:5,

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

});

export default styles;

