import { SUBMIT_REGISTRATION_TYPE } from './constants';

export function submitRegistrationType(payload, data) {
  return {
    type: SUBMIT_REGISTRATION_TYPE,
    payload,
    data,
  };
}
