import Crud from "./crud";
import {REACT_APP_API_URL, REACT_APP_API_VERSION} from 'react-native-dotenv'

export default class Apis {

  constructor() {
    this.crud = new Crud();
    this.baseUrl = REACT_APP_API_URL + REACT_APP_API_VERSION;
  }

  getPendingTasksForPincode(pincode) {
    const url = this.baseUrl + `/tasks/${pincode}/incomplete`;
    return this.crud.getCall(url);
  }

  getAssignedTasks() {
    const url = this.baseUrl + `/user/assignee/tasks`;
    return this.crud.getCall(url);
  }

  getCreatedTasks() {
    const url = this.baseUrl + `/user/creator/tasks`;
    return this.crud.getCall(url);
  }

  takeActionOnTask(taskId, action) {
    const url = this.baseUrl + `/tasks/${taskId}/${action}`;
    return this.crud.patchCall(url);
  }
}
