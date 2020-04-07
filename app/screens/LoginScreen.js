import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import { signInWithPhoneNumber } from '../domain/phoneAuthentication';
import { REGISTER_USER } from '../constants/Routes';


const LoginScreen = () => {
  const navigation = useNavigation();
  const country = '+91';
  const [showLoading, setShowLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('')
  const [smsCode, setSmsCode] = useState('');
  const [confirmSMSCode, setConfirmSMSCode] = useState();

  const handleSendSMS = async () => {
    if (validatePhone()) {
      setShowLoading(true);
      signInWithPhoneNumber(`${country}${phone}`).then(confirmation => {
        setShowLoading(false);
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
    setShowLoading(true);
    confirmSMSCode(smsCode);
    setShowLoading(false);
  };

  useEffect(() => {
    handleUser(firebase.auth().currentUser);
  }, [firebase.auth().currentUser])

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
          loading={showLoading}
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
          loading={showLoading}
          title="Confirm SMS code"
        />
      </ScrollView>
    );
}

export default LoginScreen;
