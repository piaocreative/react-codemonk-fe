export const key = 'AgencyCertificationForm';

const prefix = 'AGENCY_CERTIFICATION_FORM_';
export const CHANGE_CERTIFICATE_DETAILS = `${prefix}CHANGE_CERTIFICATE_DETAILS`;
export const SUBMIT_ADD_CERTIFICATE = `${prefix}SUBMIT_ADD_CERTIFICATE`;

export const certificateDetailFields = ['name', 'dateObtained', 'issuedBy', 'certificateId'];
export const profileRegex = {
  linkedInUrl: /http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/,
  gitHubUrl: /http(s)?:\/\/([\w]+\.)?github\.com\/[A-z0-9_-]+\/?/,
  dribbbleUrl: /http(s)?:\/\/([\w]+\.)?dribbble\.com\/[A-z0-9_-]+\/?/,
  clutchUrl: /http(s)?:\/\/([\w]+\.)?clutch\.co\/[A-z0-9_-]+\/?/,
  goodfirmsUrl: /http(s)?:\/\/([\w]+\.)?goodfirms\.co\/[A-z0-9_-]+\/?/,
  otherWebsiteUrl: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%+.~#?&//=]*)/,
};
