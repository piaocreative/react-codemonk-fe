import { CHANGE_DIRECTOR_ARRAY, CHANGE_TOTAL_SHARES, SUBMIT_ADD_DIRECTORS } from './constants';

export function changeDirectorsArray(data) {
  return {
    type: CHANGE_DIRECTOR_ARRAY,
    data,
  };
}

export function changeTotalShares(data) {
  return {
    type: CHANGE_TOTAL_SHARES,
    data,
  };
}

export function submitAddDirectors(payload, data) {
  return {
    type: SUBMIT_ADD_DIRECTORS,
    payload,
    data,
  };
}
