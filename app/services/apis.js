import Crud from "./crud";
import {REACT_APP_API_URL, REACT_APP_API_VERSION} from 'react-native-dotenv'

export default class Apis {

  constructor() {
    this.crud = new Crud()
    this.baseUrl = REACT_APP_API_URL + REACT_APP_API_VERSION;
  }

  getPendingTasksForPincode(pincode) {
    const url = this.baseUrl + `/tasks/${pincode}/incomplete`;
    return this.crud.getCall(url);
  }

}
