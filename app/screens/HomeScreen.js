import * as React from 'react';
import {View} from "react-native";
import {Button} from "react-native-web";
import {LOGIN, VOLUNTEER_TASKS} from "../constants/Routes";
import {REQUEST_USER, VOLUNTEER} from "../constants/UserTypes";

export default function HomeScreen(props) {
  return (
    <View>
      <Button title="Register to Volunteer"
              onPress={() => props.navigation.navigate(VOLUNTEER_TASKS, {
                userType: VOLUNTEER
              })}
      />
      <Button title="Request a Delivery"
              onPress={() => props.navigation.navigate(LOGIN, {
                userType: REQUEST_USER
              })}
      />
    </View>
  )
}

HomeScreen.navigationOptions = {
  header: null,
};
