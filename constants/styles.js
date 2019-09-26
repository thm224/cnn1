import { StyleSheet, Dimensions } from 'react-native'; 

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    container: {
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      padding: 20,
      flex: .9,
    },
    footer: {
      flex: .1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nextbutton: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3D88EC',
    },

    uploadButton: {
      flex: 0.3,
      width: '70%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3D88EC',
      borderRadius: 5,
    },

    buttontext: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },

    logo: {
      width:150, 
      height:150, 
      alignSelf: 'center', 
      marginBottom: 150,
      marginTop: 50,
      zIndex: 0,
    },

    textinputlabel: {
      color: '#9098A9',
    },

    textinputlabel_focused: {
      color: '#3D88EC',
    },

    input: {
      height:40,
      marginBottom: 10,
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#C8CCD4',
    },

    input_focused: {
      height:40,
      marginBottom: 10,
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#3D88EC',
    },

    laser: {
      position: 'absolute',
      backgroundColor: 'red',
      height: 7,
      width: 150,
      opacity: 0.5,
      zIndex: 1,
    },

    // capture: {
    //   flex: 0,
    //   color:'#ffffff',
    //   borderRadius: 5,
    //   backgroundColor: '#294c73',
    //   top: 420,
    //   bottom: 0,
    //   alignSelf: 'center',
    //   margin: 20,
    // },
    instructionText: {
      fontSize: 22,
      color: 'white',
      marginBottom: 30,
    },

    captureButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'red',
      borderColor: 'white',
      borderWidth: 5,
    },

    stopCaptureButton: {
      width: 80,
      height: 80,
      borderRadius: 10,
      backgroundColor: 'red',
      borderColor: 'white',
      borderWidth: 5,
    },

    preview: {
      // height: winWidth * 2,
      // width: winWidth,
      backgroundColor: '#294c73',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },

    camera: {
      // height: winWidth * 4/3,
      width: winWidth,
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  });

  export default styles;