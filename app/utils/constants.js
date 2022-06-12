export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const VALIDATION = {
  EMAIL: 'Please enter a valid email address',
  PHONE: 'Please enter a valid phone number',
  EMAILEXIST: 'email already exist',
  REQUIRED: 'This is a required field',
  WHITESPACE: 'only white space not allowed',
  MIN_LENGTH: 'Minimum ',
  MAX_LENGTH: 'Maximum ',
  MAX_COMMENT: 'You have exceeded the maximum character limit',
  INTEGER: 'Only numerical values allowed',
  ONEOF: 'Must be one of:',
  MATCH: 'Passwords do not match',
  RANG: 'Please enter valid ',
  PASSWORD: 'At least 8 characters long, 1 Upper Case, 1 Lower Case, 1 number & 1 special character',
  CHECKED: 'Please consent to the Terms and Conditions and Privacy Policy',
  ACCEPT: 'Please consent to the Terms and Conditions',
  NOT_EMAIL: "You can't use email as username",
  NOT_ALLOWED: 'accept all characters except "<" ">" "/" "\\" "?"',
  NOT_ALLOWED_COMMENT: 'accept all characters except "<" ">" "/" "\\"',
  ALLOWED: 'accept characters are ',
  RESOLUTION: 'Width and Height must be greater than or equal to ',
  FILESIZE: 'File size must be less than ',
  REUPLOAD: 'Please ReUpload file.',
  FILETYPE: 'Please select correct file, only supports ',
  NO_RECORD: 'No results found',
  NO_NOTES: 'No notes found for the applicant.',
  NO_FEED: 'No Posts available',
  NO_RECORD_INVITATION: 'No pending invitations',
  NO_RECORD_RETAILERS: 'No retailers found',
  DUPLICATE_RECORD: 'Duplicate record found',
  GREATER_THEN: 'To Year must be greater than From Year ',
  GREATER_THEN_AGE: 'Max Age must be greater than min Age ',
  GREATER_THEN_DATE: 'Your end date can’t be earlier than your start date ',
  WARNING_LENGTH: 'you reached',
  URL: 'Invalid URL. Please enter valid URL (e.g http://google.com/ or google.com or https://google.com/)',
  DELETED_POST: 'Post is deleted.',
  NO_UNREAD_NOTIFICATION: 'You do not have any unread notifications.',
  NO_READ_NOTIFICATION: 'You do not have any read notifications.',
  VALID_DATE: 'Please enter a valid date DD/MM/YYYY',
  VALID_DOB: 'date of birth must be grater then 18 year and less then 90 year',
  GENDER: 'Please select gender',
  OTP: 'Please enter a valid 6 digits verification code',
  MAIL_VERIFICATION_CODE: 'Please enter a valid 6 digits verification code',
  wentWrong: 'Something went wrong. please try again.',
  invalidFileType: 'Please upload a valid file. Only PNG, JPG and JPEG file format allowed',
  invalidCSVFileType: 'Please upload a valid file. Only CSV, XLS and XLSX file format allowed',
  invalidCVFileType: 'Please upload a valid file. Only DOC, DOCX and PDF file format allowed',
  invalidFile: 'Please upload a valid file. Min 5kb and maximum 5mb file is allowed',
  invalidCVFile: 'Please upload a valid file. Min 5kb and maximum 2mb file is allowed',
  maxOneFileLength: 'Only one file can be uploaded at a time',
  maxFiveFileLength: 'Only five files can be uploaded at a time',
  REQUIRE_ONE_PROJECT: 'Minimum one project detail is required to continue',
  REQUIRE_ONE_EXPERIENCE: 'Minimum one experience detail is required to continue',
  REQUIRE_ONE_EDUCATION_DETAIL: 'Minimum one education detail is required to continue',
  INVALID_PROJECT_URL: 'Invalid project URL',
  INVALID_URL: 'Invalid URL',
  MIN_PROFILE_PIC_SIZE: 'File size is less than 5KB',
  MAX_PROFILE_PIC_SIZE: 'File size is greater than 2MB',
  MIN_DOCUMENT_SIZE: 'File size is less than 10KB',
  MAX_DOCUMENT_SIZE: 'File size is greater than 5MB',
  MAX_QUOTE_FILE_SIZE: 'File size is greater than 50MB',
  MAX_AGENCY_QUOTE_FILE_SIZE: 'File size is greater than 50MB',
  DOCUMENT_FILE_TYPE: 'PNG, JPEG, JPG, PDF Only',
  QUOTE_DOCUMENT_FILE_TYPE: 'PDF, DOCX, ZIP, RAR Only',
  CONFIRM_PASSWORD: 'Passwords do not match',
  TALENT_RATE: 'Only numerical values up to two decimal places allowed',
  DUPLICATE_TALENT_EMAIL:
    'One or more talents are already registered on the platform. Only unique and unregistered talents are allowed to be added.',
  AGENCY_TALENT_FILE_ERROR:
    'There seems to be an issue with file you are trying to upload. Please check the upload guidelines for better details.',
  AGENCY_TALENT_FILE_SOME_ERROR:
    'It seems there are issues with one or more records in the file. Please correct and try again to add these records.',
  OWNERSHIP_LESS_THAN_20: 'Minimum of 20% shareholding required',
  OWNERSHIP_MORE_THAN_100: 'The total shareholding is exceeding 100% now. Please correct the percentage to continue.',
  SHAREHOLDER_OR_DIRECTOR: 'Select atleast shareholder or director',
  COMPANY_REGISTERED_NUMBER: "Only alphanumeric characters, space and ' allowed",
  POST_CODE: 'Only alphanumeric characters, space and dash(-) allowed',
  NAME_FIELD: 'Only alphanumeric and special characters allowed',
  POSITIVE_INTEGER: 'Only positive number with no decimal value allowed',
};

export const ADDRESS_SAVED = 'Address saved successfully.';
export const CSV_MIN_FILE_SIZE = 10;
export const MIN_FILE_SIZE = 5120;
export const MAX_FILE_SIZE = 5242880;
export const MAX_CV_FILE_SIZE = 2097152;
export const MAX_QUOTE_FILE_SIZE = 50 * 1024 * 1024;
export const MAX_AGENCY_QUOTE_FILE_SIZE = 50 * 1024 * 1024;
export const DOC_FILE_SIZE = 2097152;
export const VIDEO_FILE_SIZE = 20971520;
export const MIN_CROPBOX_WIDTH = 200;
export const MIN_CROPBOX_HEIGHT = 200;
