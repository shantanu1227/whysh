import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import {
  ASSIGNED_TASKS, CREATED_TASKS,
  HOME,
  LOGIN,
  routeNames,
  VOLUNTEER_TASKS
} from "../constants/Routes";
import CustomIcon from "../components/TabBarIcon";
import VolunteerTasks from "../screens/VolunteerTasks";
import AssignedTasks from "../screens/AssignedTasks";
import CreatedTasks from "../screens/CreatedTasks";

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = HOME;

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <Drawer.Navigator drawerType='front' initialRouteName={INITIAL_ROUTE_NAME}>
      <Drawer.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          title: routeNames[HOME].title,
          drawerIcon: ({focused}) => <CustomIcon focused={focused} name="md-home"/>,
        }}
      />
      <Drawer.Screen
        name={LOGIN}
        component={LoginScreen}
        options={{
          title: routeNames[LOGIN].title,
          drawerIcon: ({focused}) => <CustomIcon focused={focused} name="ios-contact"/>,
        }}
      />
      <Drawer.Screen
        name={VOLUNTEER_TASKS}
        component={VolunteerTasks}
        options={{
          title: routeNames[VOLUNTEER_TASKS].title,
          drawerIcon: ({focused}) => <CustomIcon focused={focused} name="ios-list"/>,
        }}
      />
      <Drawer.Screen
        name={ASSIGNED_TASKS}
        component={AssignedTasks}
        options={{
          title: routeNames[ASSIGNED_TASKS].title,
          drawerIcon: ({focused}) => <CustomIcon focused={focused} name="ios-list"/>,
        }}
      />
      <Drawer.Screen
        name={CREATED_TASKS}
        component={CreatedTasks}
        options={{
          title: routeNames[CREATED_TASKS].title,
          drawerIcon: ({focused}) => <CustomIcon focused={focused} name="ios-list"/>,
        }}
      />
    </Drawer.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  return routeNames[routeName].title;
}
