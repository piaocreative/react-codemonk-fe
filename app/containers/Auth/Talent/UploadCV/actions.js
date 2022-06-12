import { SUBMIT_UPLOAD_CV } from './constants';

export function submitCVFile(data) {
  return {
    type: SUBMIT_UPLOAD_CV,
    data,
  };
}
