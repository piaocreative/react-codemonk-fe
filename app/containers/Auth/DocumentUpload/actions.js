import { EXPERIENCE_SAVE_FOR_LATER, ADD_EXPERIENCE } from './constants';

export function saveForLater(payload) {
  return {
    type: EXPERIENCE_SAVE_FOR_LATER,
    payload,
  };
}

export function addExperience(payload, data, onSuccess) {
  return {
    type: ADD_EXPERIENCE,
    payload,
    data,
    onSuccess,
  };
}
