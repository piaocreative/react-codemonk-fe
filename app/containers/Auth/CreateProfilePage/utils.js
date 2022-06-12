import { change } from 'redux-form/immutable';

export const getSelectedFieldFromList = (list, listCompareKey, value) => list.find(c => c[listCompareKey] === value) || '';

export const getSelectedCountryCode = (list, value) =>
  list.find(
    c =>
      // eslint-disable-next-line prettier/prettier
      c.phoneCode.replace('+', '') === value,
  ) || '';

export const getFormattedObject = (data, fieldKey, valueKey, labelKey) =>
  data[fieldKey][valueKey] && data[fieldKey][labelKey] ? { label: data[fieldKey][labelKey], value: data[fieldKey][valueKey] } : '';

export const setChange = (dispatch, key, fields) => {
  Object.keys(fields).forEach(fieldKey => {
    dispatch(change(key, fieldKey, fields[fieldKey]));
  });
};
