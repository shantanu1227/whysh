import React, {Component} from 'react';
import { TextInput, Platform, StyleSheet, Button, Text, View, Alert } from 'react-native';
import firebase from '../services/firebase';

class LoginComponent extends Component {
    state = {
        country: '+91',
        phone: '',
        confirmResult: null,
        verificationCode: '',
        userId: ''
      }

      handleSendCode = () => {
        // Request to send OTP
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': function(response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            //onSignInSubmit();
            console.log("recaptcha", response);
          }
        });

        firebase
            .auth()
            .signInWithPhoneNumber(this.state.country+this.state.phone, recaptcha)
            .then(confirmResult => {
              this.setState({ confirmResult })
            })
            .catch(error => {
              alert(error.message)
    
              console.log(error)
              recaptcha.reset();
            })
      
      }
    
    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.getStartedContainer}>{this.state.country}</Text>
            <TextInput
                style={styles.getStartedText}
                placeholder="Mobile Number"
                onChangeText={phone => {
                  this.setState({phone})
                }}
                minLength={10}
                defaultValue={this.state.phone}
                maxLength={10}
                keyboardType={"numeric"}
            />
            <Button
            title="Login"
            onPress={this.handleSendCode}
            />
            <div id="recaptcha-container"></div>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
  });

export default LoginComponent