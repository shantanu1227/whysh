import React, {useEffect, useState} from 'react';
import {ScrollView, Button, TextInput, AsyncStorage} from "react-native";
import * as firebase from 'firebase';
import { connect } from 'react-redux'
import { registerUser } from '../redux/actions/Actions';
import {VOLUNTEER_TASKS} from '../constants/Routes';
import {USER_PINCODE_KEY} from '../constants/Storage';


const RegisterUser = (props) => {
    const [name, setName] = useState('');
    const [pincode, setPincode] = useState('');

    useEffect(() => {
        if(props.userRegistered && props.userRegistered.success) {
            Promise.all([
                AsyncStorage.setItem(USER_PINCODE_KEY, pincode),
                firebase.auth().currentUser.updateProfile({displayName: name})
            ])
            .then(()=> {
                props.navigation.navigate(VOLUNTEER_TASKS);
            }).catch((error) => {
                console.error('Error Registering user', error);
                alert(`Unable to register. ${errro.message}`);
            });
        }
    }, [props.userRegistered]);

    const createUser = () => {
        if (name.trim().length > 0 && pincode.trim().length > 0) {
            if (firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous) {
                props.dispatch(registerUser(firebase.auth().currentUser.phoneNumber, name, pincode));
            }
        }
    };
    
    return (
      <ScrollView>
        <TextInput
            value={name}
            onChangeText={setName}
            keyboardType="name-phone-pad"
            placeholder="Name"
        />
        <TextInput
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
            placeholder="Pincode"
        />
        <Button title="Register"
                onPress={createUser}
        />
      </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
      userRegistered: state.apisResp.registerUserTask
    }
  };

export default connect(mapStateToProps, {registerUser})(RegisterUser);
