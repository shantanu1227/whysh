export const CREATE_TASK_BEGIN = 'CREATE_TASK_BEGIN';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const createTaskBegin = () => ({
  type: CREATE_TASK_BEGIN
});

export const createTaskSuccess = task => ({
  type: CREATE_TASK_SUCCESS,
  payload: {
    task
  }
});

export const createTaskFailure = error => ({
  type: CREATE_TASK_FAILURE,
  payload: {
    error
  }
});