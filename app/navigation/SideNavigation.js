import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from "../screens/LoginScreen";
import LogoutScreen from '../screens/LogoutScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';

import { ASSIGNED_TASKS, CREATED_TASKS, HOME, LOGIN, routeNames, VOLUNTEER_TASKS, LOGOUT, CREATE_TASK, REGISTER_USER } from "../constants/Routes";
import CustomIcon from "../components/TabBarIcon";
import VolunteerTasks from "../screens/VolunteerTasks";
import AssignedTasks from "../screens/AssignedTasks";
import CreatedTasks from "../screens/CreatedTasks";
import RegisterUser from "../screens/RegisterUser";

const Drawer = createDrawerNavigator();

const SideNavigation = (props) => {
  const {address} = props;
  const {pincode} = address || {};
  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);
  props.navigation.setOptions({ headerTitle: getHeaderTitle(props.route, LOGIN, VOLUNTEER_TASKS, ` - In ${pincode}`) });


  useEffect(()=> {
    if (pincode && pincode !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [pincode])

  return (
    <Drawer.Navigator drawerType='slide'>
      {isLoggedIn ? (
        <>
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
        </>
      ) : (
          <>
            <Drawer.Screen name={LOGIN} component={LoginScreen} options={{ title: routeNames[LOGIN].title, drawerIcon: ({ focused }) => < CustomIcon focused={focused} name="ios-contact" /> }} />
            <Drawer.Screen name={REGISTER_USER} component={RegisterUser} options={{ title: routeNames[REGISTER_USER].title, drawerLabel: () => null, drawerIcon: () => null }} />
          </>

        )
      }
    </Drawer.Navigator >
  );
}

function getHeaderTitle(route, INITIAL_ROUTE_NAME, suffixCondition=null, suffix=null) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  if (suffixCondition !== null && routeName === suffixCondition) {
    return `${routeNames[routeName].title}${suffix}`;
  }
  return routeNames[routeName].title;
}

const mapStateToProps = state => ({
  address: state.authentication.address
})

export default connect(mapStateToProps)(SideNavigation);