import { SUBMIT_HIRE } from './constants';

export function submitAllocate(data) {
  return {
    type: SUBMIT_HIRE,
    data,
  };
}
