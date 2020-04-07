import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, AsyncStorage, Text } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { LOGIN, VOLUNTEER_TASKS } from '../constants/Routes';
import { loadAuthentication } from '../redux/actions/Actions';

const LogoutScreen = (props) => {

  const { address } = props;
  const { pincode } = address || {};

  const logout = async () => {
    await firebase.auth().signOut();
    await AsyncStorage.clear();
    props.dispatch(loadAuthentication());
  }

  useEffect(() => {
    if (props.address === null) {
      props.navigation.navigate(LOGIN);
      return;
    }
  }, [pincode]);
  logout();

  return (
    <View>
      <Text>LOGGING OUT...</Text>
    </View>
  );
}

const mapStateToProps = state => ({
  address: state.authentication.address
});

export default connect(mapStateToProps)(LogoutScreen);
