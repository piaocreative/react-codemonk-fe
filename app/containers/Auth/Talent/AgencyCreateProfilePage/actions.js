import { SUBMIT_CREATE_PROFILE_FORM } from './constants';

export function submitCreateProfile(payload, data) {
  return {
    type: SUBMIT_CREATE_PROFILE_FORM,
    payload,
    data,
  };
}
