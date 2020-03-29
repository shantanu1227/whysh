export const HOME = 'Home';
export const LOGIN = 'Login';
export const VOLUNTEER_TASKS = 'volunteerTasks';
export const CREATED_TASKS = 'createdTasks';
export const ASSIGNED_TASKS = 'assignedTasks';

export const routeNames = {
  [HOME]: {
    url: 'home',
    title: 'Home'
  },
  [LOGIN]: {
    url: 'login',
    title: 'Login'
  },
  [VOLUNTEER_TASKS]: {
    url: 'volunteer/tasks',
    title: 'Pending Tasks'
  },
  [ASSIGNED_TASKS]: {
    url: 'assigned-tasks',
    title: 'Assigned Tasks'
  },
  [CREATED_TASKS]: {
    url: 'created-tasks',
    title: 'Created Tasks'
  }
};
