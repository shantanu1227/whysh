import * as React from 'react';
import {View} from "react-native";
import {Button} from "react-native-web";
import {routeLogin, routeNames} from "../constants/Routes";
import {REQUEST_USER, VOLUNTEER} from "../constants/UserTypes";

export default function HomeScreen(props) {
  return (
    <View>
      <Button title="Register to Volunteer"
              onPress={() => props.navigation.navigate(routeNames[routeLogin].name, {
                userType: VOLUNTEER
              })}
      />
      <Button title="Request a Delivery"
              onPress={() => props.navigation.navigate(routeNames[routeLogin].name, {
                userType: REQUEST_USER
              })}
      />
    </View>
  )
}

HomeScreen.navigationOptions = {
  header: null,
};
