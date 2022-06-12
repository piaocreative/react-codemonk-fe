export const getFileName = (fileArray, fieldName) => {
  let output = '';

  output = fileArray
    .filter(obj => obj.fieldName === fieldName)
    .map(val => val.uploadedFileName)
    .toString();

  return output;
};

export const getFileSize = (fileArray, fieldName) => {
  let output = '';

  output = fileArray
    .filter(obj => obj.fieldName === fieldName)
    .map(val => val.uploadedFileSize)
    .toString();

  return output;
};

export const getFileNameFromUrl = url => {
  let output = '';
  output = url.split('/').pop();
  return output;
};
