import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, AsyncStorage} from 'react-native';
import * as firebase from 'firebase';
import {LOGIN, VOLUNTEER_TASKS} from '../constants/Routes';

const LogoutScreen = () => {
        const navigation = useNavigation();
        Promise.all([
            firebase.auth().signOut(),
            AsyncStorage.clear()
        ]).then(() => {
            navigation.navigate(LOGIN);
            return;
        }).catch((error) => {
            console.error('Error while logging out', error);
            navigation.navigate(VOLUNTEER_TASKS);
            return;
        });
        return ( 
                <View>
                </View>
            );
    }

export default LogoutScreen;