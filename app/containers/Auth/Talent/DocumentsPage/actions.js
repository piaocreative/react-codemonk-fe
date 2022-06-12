import { SAVE_FOR_LATER } from './constants';

export function saveForLater(payload, validationData) {
  return {
    type: SAVE_FOR_LATER,
    payload,
    validationData,
  };
}
