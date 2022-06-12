import { CHANGE_CLIENT_STATUS } from './constants';

export function changeStatus(data, onSuccess) {
  return {
    type: CHANGE_CLIENT_STATUS,
    data,
    onSuccess,
  };
}
