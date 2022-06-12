import { CHANGE_TALENT, SUBMIT_ADD_TALENTS } from './constants';

export function changeTalent(payload, data) {
  return {
    type: CHANGE_TALENT,
    payload,
    data,
  };
}

export function submitAddTalents(payload, data) {
  return {
    type: SUBMIT_ADD_TALENTS,
    payload,
    data,
  };
}
