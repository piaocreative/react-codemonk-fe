import { SUBMIT_QUOTE } from './constants';

export function submitQuote(payload, data, onSuccess) {
  return {
    type: SUBMIT_QUOTE,
    payload,
    data,
    onSuccess,
  };
}
