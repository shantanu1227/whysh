import React, {useState} from 'react';
import {ScrollView,TextInput,Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as firebase from 'firebase';
import {signInWithPhoneNumber} from '../domain/phoneAuthentication';
import {REGISTER_USER} from '../constants/Routes';


const LoginScreen = () => {
    const navigation = useNavigation();
    const country = '+91';
    const [phone, setPhone] = useState('');
    const [smsCode, setSmsCode] = useState('');
    const [confirmSMSCode, setConfirmSMSCode] = useState();

    const handleSendSMS = async () => {
        signInWithPhoneNumber(`${country}${phone}`).then(confirmation => {
            setConfirmSMSCode(() => confirmation);
        });
    };

    const handleConfirmSMSCode = () => {
        if (!confirmSMSCode || smsCode === '') {
            return;
        }
        confirmSMSCode(smsCode);
    };

    const handleUser = (user) => {
        if (user && !user.isAnonymous) {
            navigation.navigate(REGISTER_USER);
          return <></>;
        }
      return <></>;
    }

    if (firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous) {
        return handleUser(firebase.auth().currentUser);
    }

    firebase.auth().onAuthStateChanged(user => {
        return handleUser(user);
    });

    if (!confirmSMSCode)
      return (
            <ScrollView style = {{padding: 20,marginTop: 20}} >
              <TextInput
                value = {phone}
                onChangeText = {setPhone}
                keyboardType = "phone-pad"
                placeholder="Your phone"
                />
              <Button
                onPress = {handleSendSMS}
                title="Next"
                />
            </ScrollView>
        );
    else
      return (
            <ScrollView style = {{padding: 20,marginTop: 20}} >
                <TextInput
                  value = {smsCode}
                  onChangeText = {setSmsCode}
                  keyboardType = "numeric"
                  placeholder="Code from SMS"
                />
              <Button
                onPress = {handleConfirmSMSCode}
                title="Confirm SMS code"
                />
            </ScrollView>
        );
}

export default LoginScreen;
