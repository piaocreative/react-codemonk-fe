import { SUBMIT_ADD_TIMESHEET } from './constants';

export function submitTimesheet(payload, data, onSuccess) {
  return {
    type: SUBMIT_ADD_TIMESHEET,
    payload,
    data,
    onSuccess,
  };
}
