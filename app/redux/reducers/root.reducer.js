import {
  combineReducers
} from 'redux';
import apisReducer from './api.reducer';
import categories from './categories.reducer';
import createTask from './createTask.reducer';

export default combineReducers({
  apisResp: apisReducer,
  categories,
  createTask
});