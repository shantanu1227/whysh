import {GET_PENDING_TASKS_FOR_PINCODE} from "../types";

const INITIAL_STATE = {
  pendingTasksForPincode: {}
};

export default function (state = INITIAL_STATE, action) {
  const {type, payload, err} = action;

  switch (type) {
    case GET_PENDING_TASKS_FOR_PINCODE:
      return {...state, pendingTasksForPincode: payload};

    default:
      return state;
  }
}

