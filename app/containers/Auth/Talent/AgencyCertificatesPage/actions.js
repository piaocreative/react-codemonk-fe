import { CHANGE_CERTIFICATE_DETAILS, SUBMIT_ADD_CERTIFICATE } from './constants';

export function changeCertificateDetails(data) {
  return { type: CHANGE_CERTIFICATE_DETAILS, payload: data };
}

export function submitAddCertificate(payload, data) {
  return {
    type: SUBMIT_ADD_CERTIFICATE,
    payload,
    data,
  };
}
