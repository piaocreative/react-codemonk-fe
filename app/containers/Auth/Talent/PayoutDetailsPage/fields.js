import * as formValidations from 'utils/formValidations';
export const formFields = ['bankName', 'bankAccountNumber', 'bankCode'];

export const getFieldValidator = (fieldName, required) => {
  let validator = [];
  const nameValidator = [formValidations.minLength2, formValidations.maxLength50];
  switch (fieldName) {
    case 'bankName':
      validator = nameValidator;
      break;
    case 'bankAccountNumber':
      validator = [formValidations.minLength2, formValidations.maxLength40];
      break;
    case 'bankCode':
      validator = nameValidator;
      break;
    default:
  }
  return required ? [formValidations.requiredField, ...validator] : validator;
};
