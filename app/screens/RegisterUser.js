import React, { useEffect, useState } from 'react';
import { ScrollView, AsyncStorage, Text } from "react-native";
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { connect } from 'react-redux'
import { registerUser, savePincode, loadAuthentication } from '../redux/actions/Actions';
import { USER_PINCODE_KEY } from '../constants/Storage';
import {LOGIN, VOLUNTEER_TASKS} from '../constants/Routes';


const RegisterUser = (props) => {
    const [name, setName] = useState('');
    const [pincode, setPincode] = useState('');
    const [nameError, setNameError] = useState('');
    const [pincodeError, setPincodeError] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    _setUser = () => {
        setShowLoading(false);
        if (pincode && pincode !== '' && props.userRegistered && props.userRegistered.success) {
            Promise.all([
                firebase.auth().currentUser.updateProfile({
                    displayName: name
                }),                
                AsyncStorage.setItem(USER_PINCODE_KEY, pincode),
            ]).then(() => {
                props.loadAuthentication();
                return;
            }).catch((error) => {
                console.error('Error Registering user', error);
                alert(`Unable to register. ${error.message}`);
            });
        }
    }

    useEffect(() => {
        _setUser();
    }, [props.userRegistered]);

    useEffect(() => {
        if (props.address && props.address !== null ) {
            props.loadAuthentication();
            return;
        }
    }, [props.address]);


    const validatePincode = () => {
        if (pincode.trim().length == 6 && parseInt(pincode) !== NaN && parseInt(pincode) > 0) {
            setPincodeError('');
            return true;
        } else {
            setPincodeError('Enter a 6 digit valid pincode.');
            return false;
        }
    }

    const validateName = () => {
        if (name.trim().length > 0) {
            setNameError('');
            return true;
        } else {
            setNameError('Enter valid name.');
            return false;
        }
    }

    const createUser = () => {
        setShowLoading(true);
        if (validateName() && validatePincode()) {
            if (firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous) {
                props.registerUser(firebase.auth().currentUser.phoneNumber, name, pincode);
            } else {
                setShowLoading(false);
            }
        } else {
            setShowLoading(false);
        }
    };

    if (firebase.auth().currentUser === null) {
        props.navigation.reset({index: 0, routes: [{name: LOGIN}]});
        return (<Text>Register</Text>);
    }

    return (
        <ScrollView style={{ marginTop: 20, padding: 20 }}>
            <Input
                value={name}
                onChangeText={setName}
                keyboardType="name-phone-pad"
                placeholder="Name"
                errorMessage={nameError}
                errorStyle={{ color: 'red' }}
            />
            <Input
                value={pincode}
                onChangeText={setPincode}
                errorStyle={{ color: 'red' }}
                errorMessage={pincodeError}
                maxLength={6}
                keyboardType="numeric"
                placeholder="Delivery Pincode"
            />
            <Button buttonStyle={{ margin: 40 }}
                title="Register"
                loading={showLoading}
                onPress={createUser} />
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        userRegistered: state.apisResp.registerUserTask,
        address: state.authentication.address
    }
};

export default connect(mapStateToProps, { registerUser, savePincode, loadAuthentication })(RegisterUser);
