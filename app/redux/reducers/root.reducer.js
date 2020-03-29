import {combineReducers} from 'redux';
import apisReducer from './api.reducer';

export default combineReducers({
  apisResp: apisReducer
});
