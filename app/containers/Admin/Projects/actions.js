import { ADD_PROJECT, CHANGE_PROJECT_STATUS } from './constants';

export function addProject(data) {
  return {
    type: ADD_PROJECT,
    data,
  };
}

export function changeStatus(data, onSuccess) {
  return {
    type: CHANGE_PROJECT_STATUS,
    data,
    onSuccess,
  };
}
