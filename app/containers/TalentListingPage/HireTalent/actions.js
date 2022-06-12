import { CHANGE_INTERVIEW_SLOT, SUBMIT_HIRE } from './constants';

export function changeInterviewSlot(data) {
  return {
    type: CHANGE_INTERVIEW_SLOT,
    data,
  };
}

export function submitHire(data) {
  return {
    type: SUBMIT_HIRE,
    data,
  };
}
