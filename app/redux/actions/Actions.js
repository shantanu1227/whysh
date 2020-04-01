import Apis from "../../services/apis";
import * as taskTypes from '../types';
import * as categoryAction from '../actions/categoryAction';
import * as createTaskAction from '../actions/createTaskAction';
import {SAVE_PINCODE} from "../types";

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
    dispatch({type: SAVE_PINCODE, payload: pincode});
  }
}
