import Apis from "../../services/apis";
import {GET_PENDING_TASKS_FOR_PINCODE} from "../types";

const apis = new Apis();

export default function getPendingTasksForPincode(pincode) {
  const tasks = apis.getPendingTasksForPincode(pincode);

  return (dispatch) => {
    tasks.then(res => {
      if (res) {
        dispatch({type: GET_PENDING_TASKS_FOR_PINCODE, payload: res});
      }
    })
  };
}
