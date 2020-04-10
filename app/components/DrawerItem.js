import {Text} from "react-native";
import React from "react";
import Colors from '../constants/Colors';

export default function DrawerItem({title, focused}) {
  return (<Text style={{color: focused ? Colors.tabIconSelected : Colors.tabIconDefault}}>
    {title}
  </Text>)
};
