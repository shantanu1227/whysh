import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SideNavigation from './navigation/SideNavigation';
import useLinking from './navigation/useLinking';
import store from './redux/store';
import { Provider } from 'react-redux';
import { REGISTER_USER, HOME, LOGIN, routeNames } from './constants/Routes';
import RegisterUser from './screens/RegisterUser';
import screenOptions from "./styles/Header";

const Stack = createStackNavigator();

const AppContainer = (props) => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  return (
    <Provider store={store} >
      <View style={styles.container} >
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator
            screenOptions={screenOptions}>
            <Stack.Screen name={routeNames[HOME].title} component={SideNavigation}/>
            <Stack.Screen name={routeNames[LOGIN].title} component={SideNavigation}/>
            <Stack.Screen name={routeNames[REGISTER_USER].title} component={RegisterUser} />
            <Stack.Screen name={REGISTER_USER} component={RegisterUser} />
          </Stack.Navigator>
        </NavigationContainer>
      </View >
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AppContainer;
