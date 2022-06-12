import { SUBMIT_QUOTE } from './constants';

export function submitQuote(data, onSuccess) {
  return {
    type: SUBMIT_QUOTE,
    data,
    onSuccess,
  };
}
