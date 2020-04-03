import { CREATE_TASK_BEGIN, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE } from '../actions/createTaskAction';

const initialState = {
  task: null,
  loading: false,
  error: null
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        task: action.payload.task
      };

    case CREATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        task: null
      };

    default:
      return state;
  }
}