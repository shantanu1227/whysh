import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import * as firebase from 'firebase';
import { REGISTER_USER } from '../constants/Routes';
import { FirebaseRecaptchaVerifierModal, FirebaseAuthApplicationVerifier } from 'expo-firebase-recaptcha';

class LoginComponent extends Component {
    state = {
        showLoading: false,
        phone: '',
        smsCode: '',
        verificationId: '',
        phoneError: '',
        smsError: ''
    };

    recaptchaVerifier = FirebaseAuthApplicationVerifier;
    country = '+91';

    handleSendSMS = async () => {
        if (this.validatePhone()) {
            this.setState({ showLoading: true });
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            try {
                const verificationIdObj = await phoneProvider.verifyPhoneNumber(`${this.country}${this.state.phone}`, this.recaptchaVerifier);
                this.setState({ verificationId: verificationIdObj });
            } catch (ex) {
                console.warn(ex);
            } finally {
                this.setState({ showLoading: false });
            }
        }
    }

    validatePhone = () => {
        const regex = /[6-9][0-9]{9}$/;
        if (regex.test(this.state.phone)) {
            this.setState({ phoneError: '' });
            return true;
        } else {
            this.setState({ phoneError: 'Enter 10 digit valid mobile number.' });
            return false;
        }
    }

    handleConfirmSMSCode = () => {
        if (this.state.smsCode === '') {
            return;
        }
        this.setState({ showLoading: true });
        const credential = firebase.auth.PhoneAuthProvider.credential(this.state.verificationId, this.state.smsCode);
        firebase.auth().signInWithCredential(credential)
            .then(authResult => {
                this.setState({ showLoading: false });
            }).catch(ex => {
                console.warn(ex);
                this.setState({ showLoading: false });
            });
    };

    render() {
        if (!this.state.verificationId)
            return (
                <ScrollView style={{ padding: 20, marginTop: 20 }} >
                    <FirebaseRecaptchaVerifierModal
                        ref={ref => this.recaptchaVerifier = ref}
                        title='Human?  '
                        cancelLabel='Cancel '
                        firebaseConfig={firebase.app().options} />
                    <Input
                        value={this.state.phone}
                        onChangeText={(text) => this.setState({ phone: text })}
                        keyboardType="numeric"
                        placeholder="Your phone"
                        maxLength={10}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.phoneError}
                    />
                    <Button
                        onPress={this.handleSendSMS}
                        title="Next"
                        disabled={this.state.showLoading}
                        loading={this.state.showLoading}
                    />
                </ScrollView>
            );
        else
            return (
                <ScrollView style={{ padding: 20, marginTop: 20 }} >
                    <Input style={{ marginBottom: 20 }}
                        value={this.state.smsCode}
                        onChangeText={(text) => this.setState({ smsCode: text })}
                        keyboardType="numeric"
                        placeholder="Code from SMS"
                        maxLength={6}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.smsError}
                    />
                    <Button style={{ padding: 20 }}
                        onPress={this.handleConfirmSMSCode}
                        loading={this.state.showLoading}
                        disabled={this.state.showLoading}
                        title="Confirm SMS code"
                    />
                </ScrollView>
            );
    }
}

export default connect()(LoginComponent);