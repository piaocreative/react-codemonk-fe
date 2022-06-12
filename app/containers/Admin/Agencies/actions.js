import { CHANGE_AGENCY_STATUS } from './constants';

export function changeAgencyStatus(data, onSuccess) {
  return {
    type: CHANGE_AGENCY_STATUS,
    data,
    onSuccess,
  };
}
