import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import { REGISTER_USER } from '../constants/Routes';
import { FirebaseRecaptchaVerifierModal, FirebaseAuthApplicationVerifier } from 'expo-firebase-recaptcha';


const LoginScreen = () => {
  const navigation = useNavigation();
  const country = '+91';
  const [showLoading, setShowLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [phoneError, setPhoneError] = useState('')
  let recaptchaVerifier = FirebaseAuthApplicationVerifier;

  const handleSendSMS = async () => {
    if (validatePhone()) {
      setShowLoading(true);
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      try {
        const verificationIdObj = await phoneProvider.verifyPhoneNumber(`${country}${phone}`, recaptchaVerifier);
        setVerificationId(verificationIdObj);
      } catch (ex) {
        console.warn(ex);
      } finally {
        setShowLoading(false);
      }
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

  const handleConfirmSMSCode = async () => {
    if (smsCode === '') {
      return;
    }
    setShowLoading(true);
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, smsCode);
    try {
      const authResult = await firebase.auth().signInWithCredential(credential);
      setShowLoading(false);
      handleUser(firebase.auth().currentUser);
    } catch (ex) {
      console.warn(ex);
      setShowLoading(false);
    }
  };

  const handleUser = (user) => {
    if (user && !user.isAnonymous) {
      navigation.navigate(REGISTER_USER);
      return <></>;
    }
    return <></>;
  }

  if (!verificationId)
    return (
      <ScrollView style={{ padding: 20, marginTop: 20 }} >
        <FirebaseRecaptchaVerifierModal
          ref={ref => recaptchaVerifier = ref}
          title='Human?  '
          cancelLabel='Cancel '
          firebaseConfig={firebase.app().options} />
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
