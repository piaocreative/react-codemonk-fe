import { change } from 'redux-form/immutable';
import get from 'lodash/get';
import includes from 'lodash/includes';
import { MAX_FILE_SIZE } from 'utils/constants';
import { toastMessages } from 'containers/App/constants';
import { key } from './constants';

export const setChange = (dispatch, data) => {
  Object.keys(data).forEach(fieldKey => {
    dispatch(change(key, fieldKey, data[fieldKey]));
  });
};

export const checkIfFileSize = file => {
  let output = 0;
  const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
  if (file.size / 1024 < 10) {
    output = toastMessages.fileSize;
  } else if (file.size > MAX_FILE_SIZE) {
    output = toastMessages.maxFileSize;
  } else if (!includes(fileTypes, file.type)) {
    output = toastMessages.fileType;
  }
  return output;
};

export const countDirectors = data => {
  let output = 0;
  for (let i = 0; i < data.length; i++) {
    if (get(data[i], 'isDirector', false)) {
      output++;
    }
  }
  return output;
};
