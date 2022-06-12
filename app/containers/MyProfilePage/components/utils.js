import React from 'react';
import { toast } from 'react-toastify';
import includes from 'lodash/includes';
import { languageData } from 'containers/App/constants';
import { VALIDATION, MAX_FILE_SIZE } from 'utils/constants';
import { ToastifyMessage } from 'components';
import messages from '../messages';

export const getArrayLabels = (values, list) => (values || []).map(v => (list.find(l => l.value === v) || {}).label);

export const getLabel = (value, list, key) => (list.find(p => p.value === value) || {})[key || 'label'];

export const getTimzoneOffest = (list, listCompareKey, value) => (list.find(c => c[listCompareKey] === value) || {}).offset;
export const getTimzoneCountry = (list, listCompareKey, value) => (list.find(c => c[listCompareKey] === value) || {}).countryName;
export const getCurrencySymbol = (list, listCompareKey, value) => (list.find(c => c[listCompareKey] === value) || {}).symbol_native;
export const getLanguageLabel = (list, listCompareKey, value) => (list.find(c => c[listCompareKey] === value) || {}).language;

export const checkIfFileSize = file => {
  let output = 0;
  const fileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (file.size / 1024 < 5) {
    output = VALIDATION.invalidFile;
  } else if (file.size > MAX_FILE_SIZE) {
    output = VALIDATION.invalidFile;
  } else if (!includes(fileTypes, file.type)) {
    output = VALIDATION.invalidFileType;
  }
  return output;
};

export const languageLabel = item => {
  let output = getLanguageLabel(languageData, 'code', item.name);
  output = output || item.name;
  return output;
};

export const handleLinkClick = link => {
  navigator.clipboard.writeText(link);
  toast.success(<ToastifyMessage message={messages.talentLinkCopiedToClipBoard.defaultMessage} type="success" />, {
    className: 'Toast-success',
  });
};
