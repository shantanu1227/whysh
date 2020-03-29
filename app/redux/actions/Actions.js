import Apis from "../../services/apis";
import {GET_ASSIGNED_TASKS, GET_CREATED_TASKS, GET_PENDING_TASKS_FOR_PINCODE, TAKE_ACTION_ON_TASK} from "../types";

const apis = new Apis();

export function getPendingTasksForPincode(pincode) {
  const tasks = apis.getPendingTasksForPincode(pincode);

  return (dispatch) => {
    tasks.then(res => {
      if (res) {
        dispatch({type: GET_PENDING_TASKS_FOR_PINCODE, payload: res});
      }
    })
  };
}

export function getAssignedTasks() {
  const tasks = apis.getAssignedTasks();

  return (dispatch) => {
    tasks.then(res => {
      if (res) {
        dispatch({type: GET_ASSIGNED_TASKS, payload: res});
      }
    })
  };
}

export function getCreatedTasks() {
  const tasks = apis.getCreatedTasks();

  return (dispatch) => {
    tasks.then(res => {
      if (res) {
        dispatch({type: GET_CREATED_TASKS, payload: res});
      }
    })
  };
}

export function takeActionOnTask(taskId, action) {
  const task = apis.takeActionOnTask(taskId, action);

  return (dispatch) => {
    task.then(res => {
      if (res) {
        dispatch({type: TAKE_ACTION_ON_TASK, payload: res});
      }
    })
  }
}
