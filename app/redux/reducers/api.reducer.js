import {GET_ASSIGNED_TASKS, GET_CREATED_TASKS, GET_PENDING_TASKS_FOR_PINCODE, TAKE_ACTION_ON_TASK} from "../types";

const INITIAL_STATE = {
  pendingTasksForPincode: {},
  assignedTasks: {},
  createdTasks: {},
  actionTakenOnTask: {}
};

export default function (state = INITIAL_STATE, action) {
  const {type, payload, err} = action;

  switch (type) {
    case GET_PENDING_TASKS_FOR_PINCODE:
      return {...state, pendingTasksForPincode: payload};
    case GET_ASSIGNED_TASKS:
      return {...state, assignedTasks: payload};
    case GET_CREATED_TASKS:
      return {...state, createdTasks: payload};
    case TAKE_ACTION_ON_TASK:
      return {...state, actionTakenOnTask: payload};

    default:
      return state;
  }
}

