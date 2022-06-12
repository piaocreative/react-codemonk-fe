import { CHANGE_TALENT_STATUS, CHANGE_SWITCH_STATUS } from './constants';

export function changeStatus(data, onSuccess) {
  return {
    type: CHANGE_TALENT_STATUS,
    data,
    onSuccess,
  };
}
export function changeSwitchComponent(data) {
  return {
    type: CHANGE_SWITCH_STATUS,
    payload: data,
  };
}
