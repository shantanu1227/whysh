import * as taskType from "../types";
import {AsyncStorage} from "react-native";
import {USER_PINCODE_KEY} from "../../constants/Storage";

const INITIAL_STATE = async () => {
  return {
    pendingTasksForPincode: {},
    assignedTasks: {},
    createdTasks: {},
    actionTakenOnTask: {},
    registerUserTask: {},
    pincode: await AsyncStorage.getItem(USER_PINCODE_KEY)
  };
}

export default function (state = INITIAL_STATE, action) {
  const {
    type,
    payload,
    err
  } = action;

  switch (type) {
    case taskType.GET_PENDING_TASKS_FOR_PINCODE:
      return {
        ...state, pendingTasksForPincode: payload
      };
    case taskType.GET_ASSIGNED_TASKS:
      return {
        ...state, assignedTasks: payload
      };
    case taskType.GET_CREATED_TASKS:
      return {
        ...state, createdTasks: payload
      };
    case taskType.TAKE_ACTION_ON_TASK:
      return {
        ...state, actionTakenOnTask: payload
      };
    case taskType.REGISTER_USER_TASK:
      return {
        ...state, registerUserTask: payload
      };
    case taskType.SAVE_PINCODE:
      return {
        ...state, pincode: payload
      }

    default:
      return state;
  }
}
