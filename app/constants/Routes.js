export const HOME = 'Home';
export const LOGIN = 'Login';
export const LOGOUT = 'Logout';
export const VOLUNTEER_TASKS = 'volunteerTasks';
export const CREATED_TASKS = 'createdTasks';
export const ASSIGNED_TASKS = 'assignedTasks';
export const REGISTER_USER = 'registerUser';
export const CREATE_TASK = 'createTask';

export const routeNames = {
  [HOME]: {
    url: 'home',
    title: 'Home'
  },
  [LOGIN]: {
    url: 'login',
    title: 'Login'
  },
  [LOGOUT]: {
    url: 'logout',
    title: 'Logout'
  },
  [VOLUNTEER_TASKS]: {
    url: 'volunteer/tasks',
    title: 'Help Someone'
  },
  [ASSIGNED_TASKS]: {
    url: 'assigned-tasks',
    title: 'Assigned Tasks'
  },
  [CREATED_TASKS]: {
    url: 'created-tasks',
    title: 'Created Tasks'
  },
  [REGISTER_USER]: {
    url: 'register-user',
    title: 'Register'
  },
  [CREATE_TASK]: {
    url: 'tasks',
    title: 'Add Task'
  }
};
