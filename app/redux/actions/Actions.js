import { AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import Apis from "../../services/apis";
import * as taskTypes from '../types';
import * as categoryAction from '../actions/categoryAction';
import * as createTaskAction from '../actions/createTaskAction';
import * as authenticationAction from '../actions/authenticationAction';
import { SAVE_PINCODE } from "../types";
import * as storageKey from '../../constants/Storage';

const apis = new Apis();

export function getPendingTasksForPincode(pincode) {
  const tasks = apis.getPendingTasksForPincode(pincode);

  return (dispatch) => {
    tasks.then(res => {
      if (res) {
        dispatch({
          type: taskTypes.GET_PENDING_TASKS_FOR_PINCODE,
          payload: res
        });
      }
    })
  };
}

export function getAssignedTasks() {
  const tasks = apis.getAssignedTasks();

  return (dispatch) => {
    tasks.then(res => {
      if (res) {
        dispatch({
          type: taskTypes.GET_ASSIGNED_TASKS,
          payload: res
        });
      }
    })
  };
}

export function getCreatedTasks() {
  const tasks = apis.getCreatedTasks();

  return (dispatch) => {
    tasks.then(res => {
      if (res) {
        dispatch({
          type: taskTypes.GET_CREATED_TASKS,
          payload: res
        });
      }
    })
  };
}

export function takeActionOnTask(taskId, action) {
  const task = apis.takeActionOnTask(taskId, action);

  return (dispatch) => {
    task.then(res => {
      if (res) {
        dispatch({
          type: taskTypes.TAKE_ACTION_ON_TASK,
          payload: res
        });
      }
    })
  }
}

export function registerUser(phone, name, pincode) {
  const user = apis.registerUser(phone, name, pincode);

  return (dispatch) => {
    user.then(res => {
      if (res) {
        dispatch({
          type: taskTypes.REGISTER_USER_TASK,
          payload: res
        });
      }
    });
  }
}

export function getCategories() {
  const categories = apis.getCategories();

  return (dispatch) => {
    dispatch(categoryAction.fetchCategoryBegin());
    return categories.then(res => {
      if (res) {
        dispatch(categoryAction.fetchCategorySuccess(res.categories));
        return res.categories;
      }
    }).catch((error) => {
      dispatch(categoryAction.fetchCategoryFailure(error));
    });
  }
}

export function createTask(taskName, address, categories) {
  const task = apis.createTask(taskName, address, categories);

  return (dispatch) => {
    dispatch(createTaskAction.createTaskBegin());
    return task.then(res => {
      if (res) {
        dispatch(createTaskAction.createTaskSuccess(res.task));
        return res.task;
      }
    }).catch((error) => {
      dispatch(createTaskAction.createTaskFailure(error));
    });
  }
}

export function savePincode(pincode) {
  return (dispatch) => {
    dispatch({ type: SAVE_PINCODE, payload: pincode });
  }
}

export function createAddress(results) {
  return (dispatch) => {
    let address = null;
    if (firebase.auth().currentUser !== null) {
      results.forEach((result) => {
        const key = result[0];
        const value = result[1];
        let addressKey = null;
        switch (key) {
          case storageKey.USER_PINCODE_KEY:
            addressKey = 'pincode';
            break;
          case storageKey.USER_FLAT_KEY:
            addressKey = 'flat';
            break;
          case storageKey.USER_STREET1_KEY:
            addressKey = 'street1';
            break;
          case storageKey.USER_STREET2_KEY:
            addressKey = 'street2';
            break;
          case storageKey.USER_CITY_KEY:
            addressKey = 'city';
            break;
          default:
            addressKey = null;
        }
        if (value && addressKey) {
          if (address === null) {
            address = {};
          }
          address[addressKey] = value;
        }
      });
      dispatch(authenticationAction.fetchAuthenticationSuccess(address));
      return address;
    }
    dispatch(authenticationAction.fetchAuthenticationSuccess(address));
    return address;
  }
}

export function loadAuthentication() {
  const storage = AsyncStorage.multiGet([storageKey.USER_PINCODE_KEY, storageKey.USER_FLAT_KEY,
  storageKey.USER_STREET1_KEY, storageKey.USER_STREET2_KEY, storageKey.USER_CITY_KEY]);
  return (dispatch) => {
    dispatch(authenticationAction.fetchAuthenticationBegin());
    storage.then((results) => {
      return dispatch(createAddress(results));
    })
  }
}
