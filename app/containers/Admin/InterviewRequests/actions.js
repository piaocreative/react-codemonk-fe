import { CHANGE_INTERVIEW_STATUS } from './constants';

export function changeStatus(data, onSuccess) {
  return {
    type: CHANGE_INTERVIEW_STATUS,
    data,
    onSuccess,
  };
}
