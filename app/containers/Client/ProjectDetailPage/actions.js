import { EDIT_PROJECT_DETAILS, ADD_TALENT, CHANGE_TALENT_STATUS, SAVE_QUOTE } from './constants';

export function editProjectDetails(data, onSuccess) {
  return {
    type: EDIT_PROJECT_DETAILS,
    data,
    onSuccess,
  };
}

export function adminAddTalent(data) {
  return {
    type: ADD_TALENT,
    data,
  };
}

export function changeStatus(data, onSuccess) {
  return {
    type: CHANGE_TALENT_STATUS,
    data,
    onSuccess,
  };
}

export function submitQuoteForm(payload, data, onSuccess) {
  return {
    type: SAVE_QUOTE,
    payload,
    data,
    onSuccess,
  };
}
