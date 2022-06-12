import React from 'react';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl';
import { touch } from 'redux-form/immutable';
import moment from 'moment';
import { CSV_MIN_FILE_SIZE, MIN_FILE_SIZE, MAX_FILE_SIZE, MAX_CV_FILE_SIZE } from 'utils/constants';
import messages from './messages';

export const getSelectedFieldFromList = (list, listCompareKey, value) => list.find(c => c[listCompareKey] === value) || '';

export const getSelectedLanguage = (list, value) => {
  const selectedLanguages = [];
  (value || []).forEach(l => {
    const foundLanguage = list.find(language => language.code === l.name);
    if (foundLanguage) {
      selectedLanguages.push({
        value: foundLanguage.code,
        label: foundLanguage.language,
      });
    } else {
      selectedLanguages.push({
        value: l.name,
        label: l.name,
      });
    }
  });
  return selectedLanguages;
};

export const getSelectedCountryCode = (list, value) =>
  list.find(
    c =>
      // eslint-disable-next-line prettier/prettier
      c.phoneCode.replace('+', '') === value,
  ) || '';

export const getLanguageRatings = (language, value) =>
  language.map(l => {
    const found = (value || []).find(responseLanguage => responseLanguage.name === l.value) || { rate: '' };
    return {
      value: l.value,
      label: l.label,
      rating: found.rate,
    };
  });

export const getDate = date => (date ? moment(date) : '');

export const getFormattedObject = (data, fieldKey, valueKey, labelKey) =>
  data[fieldKey][valueKey] && data[fieldKey][labelKey] ? { label: data[fieldKey][labelKey], value: data[fieldKey][valueKey] } : '';

export const setInitialReduxState = ({
  response,
  change,
  countryCode,
  country,
  key,
  timeZone,
  dispatch,
  gender,
  primaryRole,
  yearsOfExperience,
}) => {
  Object.keys(response.data).forEach(fieldKey => {
    let resData;
    switch (fieldKey) {
      case 'countryCode':
      case 'country':
      case 'timeZone':
      case 'gender':
      case 'primaryRole':
      case 'yearsOfExperience':
        resData = getFormattedObject(
          { countryCode, country, timeZone, gender, primaryRole, yearsOfExperience },
          fieldKey,
          'name',
          fieldKey === 'countryCode' ? 'phoneCode' : 'name',
        );
        break;
      case 'dob':
        resData = getDate(response.data.dob);
        break;
      default:
        resData = response.data[fieldKey];
        break;
    }
    dispatch(change(key, fieldKey, resData));
  });
  if (!get(response, 'data.countryCode', '')) {
    const codeData = getFormattedObject({ countryCode }, 'countryCode', 'name', 'phoneCode');
    dispatch(change(key, 'countryCode', codeData));
  }
};

export const getBtnClass = (loading, responseSuccess, responseError) => {
  let output = 'btn-primary ';
  if (loading) output = 'btn-primary loading';
  if (responseSuccess) output = 'btn-primary request-success';
  if (responseError) output = 'btn-primary request-error';
  return output;
};

export const fileMinSize = type => {
  let output = '';
  if (type === 'csvUploader') output = CSV_MIN_FILE_SIZE;
  else if (type === 'logoUploader' || type === 'profilePhotoUploader' || type === 'multiplePhotosUploader') output = MIN_FILE_SIZE;
  else if (type === 'cvUploader') output = CSV_MIN_FILE_SIZE;
  else if (type === 'photoAndFileUploader') output = CSV_MIN_FILE_SIZE;
  return output;
};

export const fileMaxSize = type => {
  let output = '';
  if (type === 'csvUploader') output = MAX_FILE_SIZE;
  else if (type === 'logoUploader' || type === 'profilePhotoUploader' || type === 'multiplePhotosUploader') output = MAX_FILE_SIZE;
  else if (type === 'cvUploader') output = MAX_CV_FILE_SIZE;
  else if (type === 'photoAndFileUploader') output = MAX_CV_FILE_SIZE;
  return output;
};

export const acceptedFileTypes = type => {
  let output = '';
  if (type === 'csvUploader') output = '.csv,.xls,.xlsx';
  else if (type === 'logoUploader' || type === 'profilePhotoUploader' || type === 'multiplePhotosUploader') output = '.jpeg,.jpg,.png';
  else if (type === 'cvUploader') output = '.doc,.docx,.pdf';
  else if (type === 'photoAndFileUploader') output = '.jpeg,.jpg,.png,.pdf';
  return output;
};

export const dropAreaMessage = type => {
  let output = '';
  if (type === 'csvUploader') output = <FormattedMessage {...messages.csvFileSizeInfo} />;
  else if (type === 'logoUploader' || type === 'profilePhotoUploader' || type === 'multiplePhotosUploader') {
    output = <FormattedMessage {...messages.fileSizeInfo} />;
  } else if (type === 'cvUploader') output = <FormattedMessage {...messages.cvFileSizeInfo} />;
  else if (type === 'photoAndFileUploader') output = <FormattedMessage {...messages.photoAndPdfSizeInfo} />;
  return output;
};

export const bytesToSize = bytes => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`;
};

export const getFileExtension = fileName => {
  const temp = Math.max(0, fileName.lastIndexOf('.')) || Infinity;
  return fileName.slice(temp + 0);
};

export const getFileName = fileName => {
  const name = fileName
    .split('.')
    .slice(0, -1)
    .join('.');
  return name;
};

export const setTouchPersonalDetails = (dispatch, key, response) => {
  const { data } = response;

  const fieldData = {
    firstName: get(data, 'firstName'),
    lastName: get(data, 'lastName'),
    countryCode: get(data, 'countryCode'),
    phoneNumber: get(data, 'phoneNumber'),
    dob: get(data, 'dob'),
    gender: get(data, 'gender'),
    addressLineOne: get(data, 'addressLineOne'),
    addressLineTwo: get(data, 'addressLineTwo'),
    city: get(data, 'city'),
    country: get(data, 'country'),
    state: get(data, 'state'),
    postcode: get(data, 'postcode'),
    timeZone: get(data, 'timeZone'),
    languageCount: get(data, 'language', []).length,
    languageRating: get(data, 'language', []).length,
    linkedInUrl: get(data, 'linkedInUrl'),
    gitHubUrl: get(data, 'gitHubUrl'),
    stackOverFlowUrl: get(data, 'stackOverFlowUrl'),
    dribbbleUrl: get(data, 'dribbbleUrl'),
    behanceUrl: get(data, 'behanceUrl'),
    portfolioUrl: get(data, 'portfolioUrl'),
  };

  Object.keys(fieldData).forEach(fieldKey => {
    if (fieldData[fieldKey]) dispatch(touch(key, fieldKey));
  });
};
