import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';
import {HOME, LOGIN, routeNames, VOLUNTEER_TASKS} from "../constants/Routes";

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          [HOME]: routeNames[HOME].url,
          [LOGIN]: routeNames[LOGIN].url,
          Links: 'links',
          Settings: 'settings',
          [VOLUNTEER_TASKS]: routeNames[VOLUNTEER_TASKS].url
        },
      },
    },
  });
}
