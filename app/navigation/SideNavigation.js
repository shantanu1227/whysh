import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import LogoutScreen from '../screens/LogoutScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';

import {
  ASSIGNED_TASKS,
  CREATED_TASKS,
  HOME,
  LOGIN,
  routeNames,
  VOLUNTEER_TASKS,
  LOGOUT,
  CREATE_TASK,
  REGISTER_USER
} from "../constants/Routes";
import CustomIcon from "../components/TabBarIcon";
import VolunteerTasks from "../screens/VolunteerTasks";
import AssignedTasks from "../screens/AssignedTasks";
import CreatedTasks from "../screens/CreatedTasks";
import * as firebase from 'firebase';
import logout from '../domain/logout';
import screenOptions from "../styles/Header";
import RegisterUser from "../screens/RegisterUser";

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = HOME;

export default function BottomTabNavigator({ navigation, route }) {
  const [isAuthenticated, setIsAuthenticated] = useState();
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  firebase.auth().onAuthStateChanged(user => {
    if (user && !user.isAnonymous && user.displayName !== null) {
      setIsAuthenticated(true);
    }
  });

  if (isAuthenticated) {
    return (
      <Drawer.Navigator
        drawerType='slide'
        screenOptions={screenOptions}
        initialRouteName={INITIAL_ROUTE_NAME}
        onItemPress={
          (route) => {
            if (route.route.routeName !== LOGOUT) {
              onItemPress(route);
              return;
            }
            logout();
          }
        }
      >
        <Drawer.Screen
          name={VOLUNTEER_TASKS}
          component={VolunteerTasks}
          options={{ title: routeNames[VOLUNTEER_TASKS].title, drawerIcon: ({ focused }) => < CustomIcon focused={focused} name="ios-list" /> }}
        />
        <Drawer.Screen name={CREATE_TASK}
          component={CreateTaskScreen}
          options={{ title: routeNames[CREATE_TASK].title, drawerIcon: ({ focused }) => < CustomIcon focused={focused} name="ios-list" /> }}
        />
        <Drawer.Screen name={CREATED_TASKS} component={CreatedTasks}
          options={{ title: routeNames[CREATED_TASKS].title, drawerIcon: ({ focused }) => < CustomIcon focused={focused} name="ios-list" /> }}
        />
        <Drawer.Screen name={ASSIGNED_TASKS}
          component={AssignedTasks}
          options={{ title: routeNames[ASSIGNED_TASKS].title, drawerIcon: ({ focused }) => < CustomIcon focused={focused} name="ios-list" /> }}
        />
        <Drawer.Screen name={LOGOUT}
          component={LogoutScreen}
          options={{ title: routeNames[LOGOUT].title, drawerIcon: ({ focused }) => < CustomIcon focused={focused} name="ios-contact" /> }}
        />
      </Drawer.Navigator >
    );
  } else {
    return (
      <Drawer.Navigator drawerType='slide' initialRouteName={INITIAL_ROUTE_NAME} >
        <Drawer.Screen name={HOME} component={HomeScreen} options={{ title: routeNames[HOME].title, drawerIcon: ({ focused }) => < CustomIcon focused={focused} name="md-home" /> }} />
        <Drawer.Screen name={LOGIN} component={LoginScreen} options={{ title: routeNames[LOGIN].title, drawerIcon: ({ focused }) => < CustomIcon focused={focused} name="ios-contact" /> }} />
      </Drawer.Navigator >
    );
  }
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  return routeNames[routeName].title;
}
