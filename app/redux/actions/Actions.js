import Apis from "../../services/apis";
import * as taskTypes from '../types';

const apis = new Apis();

export function getPendingTasksForPincode(pincode) {
  const tasks = apis.getPendingTasksForPincode(pincode);

  return (dispatch) => {
    tasks.then(res => {
      if (res) {
        dispatch({type: taskTypes.GET_PENDING_TASKS_FOR_PINCODE, payload: res});
      }
    })
  };
}

export function getAssignedTasks() {
  const tasks = apis.getAssignedTasks();

  return (dispatch) => {
    tasks.then(res => {
      if (res) {
        dispatch({type: taskTypes.GET_ASSIGNED_TASKS, payload: res});
      }
    })
  };
}

export function getCreatedTasks() {
  const tasks = apis.getCreatedTasks();

  return (dispatch) => {
    tasks.then(res => {
      if (res) {
        dispatch({type: taskTypes.GET_CREATED_TASKS, payload: res});
      }
    })
  };
}

export function takeActionOnTask(taskId, action) {
  const task = apis.takeActionOnTask(taskId, action);

  return (dispatch) => {
    task.then(res => {
      if (res) {
        dispatch({type: taskTypes.TAKE_ACTION_ON_TASK, payload: res});
      }
    })
  }
}

export function registerUser(phone, name, pincode) {
  const user = apis.registerUser(phone, name, pincode);
  
  return (dispatch) => {
    user.then(res => {
      if (res) {
        dispatch({type: taskTypes.REGISTER_USER_TASK, payload: res});
      }
    });
  }
}
