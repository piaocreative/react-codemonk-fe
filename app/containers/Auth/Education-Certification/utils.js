import get from 'lodash/get';

export const checkForTouchedCertificate = data => {
  let output = 0;
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    const formKey = keys[i];
    const dateObtained = get(data, `[${formKey}]`);

    switch (keys[i]) {
      case 'name':
      case 'issuedBy':
      case 'certificateId':
        if (get(data, `[${formKey}]`, '').length >= 1) output = 1;
        break;
      case 'dateObtained':
        if (dateObtained) output = 1;
        break;
      default:
        output = 0;
    }
    if (output === 1) break;
  }
  return output;
};

export const checkForInvalidCertificate = data => {
  let output = 0;
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    const formKey = keys[i];
    const value = get(data, `[${formKey}]`, '');

    switch (keys[i]) {
      case 'name':
      case 'issuedBy':
        if (value.length < 2 || value.length > 50) output = 1;
        break;
      case 'dateObtained':
        if (!value) output = 1;
        break;

      default:
        output = 0;
    }
    if (output === 1) break;
  }
  return output;
};

export const checkForEmptyCertificate = certificateDetail => {
  let output = 0;
  const educationKeys = Object.keys(certificateDetail);
  for (let i = 0; i < educationKeys.length; i++) {
    switch (educationKeys[i]) {
      case 'name':
      case 'dateObtained':
      case 'issuedBy':
      case 'certificateId':
        if (certificateDetail[educationKeys[i]].length <= 1) output = 1;
        break;
      default:
        output = 0;
    }
    if (output === 1) break;
  }
  return output;
};
