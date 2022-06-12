import { SAVE_BRIEF_STEP1, SAVE_BRIEF_STEP2, SAVE_BRIEF_STEP3 } from './constants';

export function submitBriefStep1Form(payload, data, onSuccess) {
  return {
    type: SAVE_BRIEF_STEP1,
    payload,
    data,
    onSuccess,
  };
}

export function submitBriefStep2Form(payload, data, onSuccess) {
  return {
    type: SAVE_BRIEF_STEP2,
    payload,
    data,
    onSuccess,
  };
}

export function submitBriefStep3Form(payload, data, onSuccess) {
  return {
    type: SAVE_BRIEF_STEP3,
    payload,
    data,
    onSuccess,
  };
}
