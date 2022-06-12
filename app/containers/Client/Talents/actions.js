import { CHANGE_TALENT_STATUS } from './constants';

export function changeStatus(data, onSuccess) {
  return {
    type: CHANGE_TALENT_STATUS,
    data,
    onSuccess,
  };
}
