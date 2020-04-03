import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import { signInWithPhoneNumber } from '../domain/phoneAuthentication';
import { REGISTER_USER } from '../constants/Routes';


const LoginScreen = () => {
  const navigation = useNavigation();
  const country = '+91';
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('')
  const [smsCode, setSmsCode] = useState('');
  const [confirmSMSCode, setConfirmSMSCode] = useState();

  const handleSendSMS = async () => {
    if (validatePhone()) {
      signInWithPhoneNumber(`${country}${phone}`).then(confirmation => {
          setConfirmSMSCode(() => confirmation);
      });
    }
  };

  const validatePhone = () => {
    if (phone.trim().length == 10 && parseInt(phone) !== NaN && parseInt(phone) >= 6 * 1000 * 1000 * 1000) {
      setPhoneError('');
      return true;
    } else {
      setPhoneError('Enter 10 digit valid mobile number.');
      return false;
    }
  }

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
      <ScrollView style={{ padding: 20, marginTop: 20 }} >
        <Input
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
          placeholder="Your phone"
          maxLength={10}
          errorStyle={{ color: 'red' }}
          errorMessage={phoneError}
        />
        <Button
          onPress={handleSendSMS}
          title="Next"
        />
      </ScrollView>
    );
  else
    return (
      <ScrollView style={{ padding: 20, marginTop: 20 }} >
        <Input style={{ marginBottom: 20 }}
          value={smsCode}
          onChangeText={setSmsCode}
          keyboardType="numeric"
          placeholder="Code from SMS"
        />
        <Button style={{ padding: 20 }}
          onPress={handleConfirmSMSCode}
          title="Confirm SMS code"
        />
      </ScrollView>
    );
}

export default LoginScreen;
