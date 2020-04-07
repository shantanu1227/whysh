import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import screenOptions from "../styles/Header";
import { VOLUNTEER_TASKS, LOGIN, routeNames } from '../constants/Routes';
import SideNavigation from './SideNavigation';
import useLinking from './useLinking';
import { loadAuthentication } from '../redux/actions/Actions';
import * as firebase from 'firebase';

const Stack = createStackNavigator();


const CustomNaviagationContainer = (props) => {
    const [initialNavigationState, setInitialNavigationState] = useState();
    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef);
    const { isLoading, address } = props;

    const { pincode } = address || {};

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            props.dispatch(loadAuthentication());
        });
    }, [pincode])

    if (isLoading) {
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} />
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name={LOGIN} component={SideNavigation} />
                <Stack.Screen name={VOLUNTEER_TASKS} component={SideNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


const mapStateToProps = state => ({
    address: state.authentication.address,
    isLoading: state.authentication.loading
});


export default connect(mapStateToProps)(CustomNaviagationContainer);
