import {Modal, StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },


  //Header Group
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
    resizeMode: 'contain', // Adjust the image size as needed
    alignSelf: 'flex-start',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  //Body Group
  body: {
    flex:1,
    justifyContent:'center',
    height: '100%',
    backgroundColor:'white',
    borderTopWidth:1,
  },
  mainBody:{
    flex:1,
    justifyContent:'space-around',
  },
  mainContent:{
    flex:1,
    padding:10,
  },

  //Button Group
  buttonGroup:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignContent:'center',
  },
  radioGroup:{
    flexDirection: 'row',
    height:'auto',
    alignItems:'center',
    justifyContent: 'space-around',
    padding: 16,
    marginTop: 10,
    shadowColor: '#000',
  },

  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'white',
    },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    margin: 10,
    width: 'auto',
    height: 60,
    paddingHorizontal:20,
    borderRadius: 10,
  },

  buttonText:{
    fontSize:26,
    fontWeight:300,
    textAlign:'center',
  },
    //update Info Group
    updateInfo:{
      flex:1,
      flexDirection:'row',
    },
    

    //change Password Group
    changePassword:{
      flex:1,
      flexDirection:'row',
    },

    
    //Footer Group
    footer:{
      // flex:1,
      height:'auto',
      flexDirection:'row', 
      width:'auto',
      alignItems:'flex-end',
      justifyContent:'space-around',
      padding:30,
      alignContent:"flex-end",
      backgroundColor:'white',
      marginBottom:50,
    },
    
    //Share Group
    lableStyle:{
      fontSize: 24,
      marginBottom:5, 
      color: 'black', 
      fontWeight:400,   
    },
    textStyle:{
      fontSize:16,
    },
    textInput:{
      borderWidth:1,
      alignItems:'center',  
      width:'auto',
      paddingBottom:10,
      fontSize:20,
      marginBottom:50,
    },
    readonly:{
      borderWidth:1,
      alignItems:'center',  
      width:'auto',
      paddingBottom:10,
      fontSize:20,
      marginBottom:50,
      backgroundColor:'lightgrey',
    },
  });
  
export default styles;

