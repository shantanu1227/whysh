import Crud from "./crud";
import {BASE_URL} from '../constants/Environments';

export default class Apis {

  constructor() {
    this.crud = new Crud();
  }

  registerUser(phone, name, pincode) {
    const url = `${BASE_URL}/users`;
    const data = {
      phone,
      name,
      pincode
    }
    return this.crud.postCall(url, data);
  }

  getPendingTasksForPincode(pincode) {
    const url = `${BASE_URL}/tasks/${pincode}/incomplete`;
    return this.crud.getCall(url);
  }

  getAssignedTasks() {
    const url = `${BASE_URL}/users/assignee/tasks`;
    return this.crud.getCall(url);
  }

  getCreatedTasks() {
    const url = `${BASE_URL}/users/creator/tasks`;
    return this.crud.getCall(url);
  }

  takeActionOnTask(taskId, action) {
    const url = `${BASE_URL}/tasks/${taskId}/${action}`;
    return this.crud.patchCall(url);
  }
}
