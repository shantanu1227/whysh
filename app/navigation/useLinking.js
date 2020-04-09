import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';
import { HOME, LOGIN, routeNames, VOLUNTEER_TASKS, REGISTER_USER, CREATE_TASK } from "../constants/Routes";

export default function (containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: '/',
        screens: {
          [HOME]: routeNames[HOME].url,
          [LOGIN]: routeNames[LOGIN].url,
          [VOLUNTEER_TASKS]: routeNames[VOLUNTEER_TASKS].url,
          [REGISTER_USER]: routeNames[REGISTER_USER].url,
          [CREATE_TASK]: routeNames[CREATE_TASK].url
        },
      },
    },
  });
}