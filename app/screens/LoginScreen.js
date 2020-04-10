import * as React from 'react';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import LoginComponent from '../components/LoginComponent';
import {REGISTER_USER} from '../constants/Routes'


const LoginScreen = (props) => {
  React.useEffect(() => {
      if(firebase.auth().currentUser !== null) {
          props.navigation.navigate(REGISTER_USER);
      }
  }, [firebase.auth().currentUser]); 

  return <LoginComponent/>
}

export default connect()(LoginScreen);
