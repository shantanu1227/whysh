import AppContainer from './app/AppContainer';
import * as firebase from 'firebase';
import {FIREBASE_CONFIG} from './app/constants/Environments';

firebase.initializeApp(FIREBASE_CONFIG);

export default AppContainer;