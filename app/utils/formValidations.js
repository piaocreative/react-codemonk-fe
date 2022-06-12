import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import includes from 'lodash/includes';
import { untouch } from 'redux-form/immutable';

/* eslint-disable arrow-body-style,no-param-reassign,radix,no-useless-escape */
import { VALIDATION, MAX_FILE_SIZE, MAX_QUOTE_FILE_SIZE, MAX_AGENCY_QUOTE_FILE_SIZE } from './constants';
const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data, props) => rules.map(rule => rule(value, data, props)).filter(error => !!error)[0]; /* first error */

// email validation
export function email(value) {
  if (!isEmpty(value) && !/^[A-Za-z0-9](\.?[A-Za-z0-9_-]){0,}@[A-Za-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i.test(value)) {
    return VALIDATION.EMAIL;
  }
  return '';
}

export function required(value) {
  if (isEmpty(value)) {
    return VALIDATION.REQUIRED;
  }
  if (isEmpty(value.trim())) {
    return VALIDATION.REQUIRED;
  }
  return '';
}
export function requiredSelect(selectedOption) {
  const value = (selectedOption && selectedOption.value) || '';
  if (isEmpty(value)) {
    return VALIDATION.REQUIRED;
  }
  return '';
}

export function requiredDate(value) {
  if (isEmpty(value)) {
    return VALIDATION.REQUIRED;
  }
  return '';
}

// checked validation
export function checked(value) {
  if (!value) {
    return VALIDATION.CHECKED;
  }
  if (isEmpty(value)) {
    return VALIDATION.CHECKED;
  }
  return '';
}

// string length validations
export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `${VALIDATION.MIN_LENGTH} ${min} characters required`;
    }
    return '';
  };
}

export function requiredArray(value) {
  if (!isEmpty(value) && value.length < 1) {
    return `${VALIDATION.MIN_LENGTH} 1 characters required`;
  }
  return '';
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `${VALIDATION.MAX_LENGTH} ${max} characters allowed`;
    }
    return '';
  };
}

export const minLength2 = minLength(2);
export const minLength10 = minLength(10);
export const minLength50 = minLength(50);
export const minLength100 = minLength(100);
export const maxLength3 = maxLength(3);
export const maxLength30 = maxLength(30);
export const maxLength40 = maxLength(40);
export const maxLength50 = maxLength(50);
export const maxLength70 = maxLength(70);
export const maxLength500 = maxLength(500);
export const maxLength1000 = maxLength(1000);
export const maxLength1500 = maxLength(1500);
export const maxLength5000 = maxLength(5000);

// phone number validation
export function phoneNumber(max) {
  return value => {
    const reWhiteSpace = new RegExp('\\s+');
    const newValue = reWhiteSpace.test(value) ? value.split(/\s/).join('') : value;
    return maxLength(max)(newValue);
  };
}

export function phoneNumberMax(max) {
  return value => {
    let output = '';
    if (!isEmpty(value) && typeof value === 'string') {
      const newValue = value.replace(/ /g, '');
      if (newValue.length > max) {
        output = `${VALIDATION.MAX_LENGTH} ${max} characters allowed`;
      }
      if (!/^[0-9\s]*$/.test(newValue)) {
        output = 'Only numerical values and space allowed';
      }
    }
    return output;
  };
}

export const phoneNumberMax12 = phoneNumberMax(12);

// Allow characters validation
export function allow(rex, msg) {
  return value => {
    // /^[-_ a-zA-Z0-9]+$/i
    const regularRex = new RegExp(`^[${rex}]+$`, 'i');
    if (!isEmpty(value) && !regularRex.test(value)) {
      return `${msg}`;
    }
    return '';
  };
}

export function password(value) {
  if (!isEmpty(value) && !/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\^£$%&*()}{@#~?><>,|=_+!-]).{8,}$/.test(value)) {
    return VALIDATION.PASSWORD;
    // return `Must be no more than ${max} characters`;
  }
  return '';
}

export function mailVerification(value) {
  if (!isEmpty(value) && !/^[0-9]{6}$/.test(value)) {
    return VALIDATION.MAIL_VERIFICATION_CODE;
  }
  return '';
}

export function otp(value) {
  if (!isEmpty(value) && !/^[0-9]{6}$/.test(value)) {
    return VALIDATION.OTP;
  }
  return '';
}

export function rateValidation(value) {
  if (!isEmpty(value) && !/^[0-9]*\.*[0-9]{0,2}$/.test(value)) {
    return VALIDATION.TALENT_RATE;
  }
  return '';
}

// Richtext editor validations
export function minLengthRichText(min) {
  return value => {
    if (value) {
      const htmlText = draftToHtml(convertToRaw(value.getCurrentContent()));
      const text = htmlText.replace(/<[^>]*>?/gm, '');
      if (text.length > 1) {
        if (text.length < min) {
          return `${VALIDATION.MIN_LENGTH} ${min} characters required`;
        }
      } else {
        return VALIDATION.REQUIRED;
      }
    }
    return '';
  };
}

export function maxLengthRichText(max) {
  return value => {
    if (!isEmpty(value)) {
      const htmlText = draftToHtml(convertToRaw(value.getCurrentContent()));
      const text = htmlText.replace(/<[^>]*>?/gm, '');

      if (text.length > max) {
        return `${VALIDATION.MAX_LENGTH} ${max} characters allowed`;
      }
    }
    return '';
  };
}

export const minLengthRichText2 = minLengthRichText(2);
export const minLengthRichText50 = minLengthRichText(50);
export const minLengthRichText100 = minLengthRichText(100);
export const maxLengthRichText500 = maxLengthRichText(500);
export const maxLengthRichText1000 = maxLengthRichText(1000);
export const maxLengthRichText1500 = maxLengthRichText(1500);
export const maxLengthRichText5000 = maxLengthRichText(5000);

// skills/language rating validations
export function ratingCount(value) {
  let error = '';
  if (isEmpty(value) || value.length < 1) {
    error = VALIDATION.REQUIRED;
  }

  return error;
}

export function maxRatingCount(value) {
  let error = '';
  if (isEmpty(value) || value.length < 1) {
    error = VALIDATION.REQUIRED;
  }

  if (isEmpty(value) || value.length > 7) {
    error = 'max 7 skills';
  }
  return error;
}

export function skillsRating(value) {
  let error = '';
  if (!isEmpty(value)) {
    if (Array.isArray(value) && value.length >= 1) {
      for (let i = 0; i < value.length; i++) {
        if (value[i].rating === 0 || value[i].rating === undefined) {
          error = VALIDATION.REQUIRED;
          break;
        }
      }
    } else if (value === 0) {
      error = VALIDATION.REQUIRED;
    }
  }
  return error;
}

export function checkRatingForEmpty(value) {
  let error = '';
  if (value && Array.isArray(value) && value.length >= 1) {
    for (let i = 0; i < value.length; i++) {
      if (value[i].rating === 0 || value[i].rating === undefined) {
        error = VALIDATION.REQUIRED;
        break;
      }
    }
  } else {
    error = VALIDATION.REQUIRED;
  }
  return error;
}

// paymentValidations
export function requiredField(value) {
  if (isEmpty(value)) {
    return VALIDATION.REQUIRED;
  }

  return '';
}

export function requiredDocument(value, allValues, props, name) {
  let output = '';
  if (isEmpty(value)) {
    output = VALIDATION.REQUIRED;
  }
  if (typeof value === 'object' && value.length === 0) {
    const { dispatch } = props;
    output = VALIDATION.REQUIRED;
    dispatch(untouch(props.form, name));
  }
  if (typeof value === 'object' && value.length === 1) {
    const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (value[0].size / 1024 < 10) {
      output = VALIDATION.MIN_DOCUMENT_SIZE;
    } else if (value[0].size > MAX_FILE_SIZE) {
      output = VALIDATION.MAX_DOCUMENT_SIZE;
    } else if (!includes(fileTypes, value[0].type)) {
      output = VALIDATION.DOCUMENT_FILE_TYPE;
    }
  }
  return output;
}

// quoteDocument Validation
export function quoteDocument(value, allValues, props, name) {
  let output = '';
  if (isEmpty(value)) {
    output = VALIDATION.REQUIRED;
  }
  if (typeof value === 'object' && value.length === 0) {
    const { dispatch } = props;
    output = VALIDATION.REQUIRED;
    dispatch(untouch(props.form, name));
  }
  if (typeof value === 'object' && value.length === 1) {
    const fileTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/zip',
      'application/x-rar-compressed',
    ];
    if (value[0].size > MAX_QUOTE_FILE_SIZE) {
      output = VALIDATION.MAX_QUOTE_FILE_SIZE;
    } else if (!includes(fileTypes, value[0].type)) {
      output = VALIDATION.QUOTE_DOCUMENT_FILE_TYPE;
    }
  }
  return output;
}

// agencyQuoteDocument Validation
export function agencyQuoteDocument(value, allValues, props, name) {
  let output = '';
  if (isEmpty(value)) {
    output = VALIDATION.REQUIRED;
  }
  if (typeof value === 'object' && value.length === 0) {
    const { dispatch } = props;
    output = VALIDATION.REQUIRED;
    dispatch(untouch(props.form, name));
  }
  if (typeof value === 'object' && value.length === 1) {
    const fileTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/zip',
      'application/x-rar-compressed',
    ];
    if (value[0].size > MAX_AGENCY_QUOTE_FILE_SIZE) {
      output = VALIDATION.MAX_AGENCY_QUOTE_FILE_SIZE;
    } else if (!includes(fileTypes, value[0].type)) {
      output = VALIDATION.QUOTE_DOCUMENT_FILE_TYPE;
    }
  }
  return output;
}

export function passwordsMustMatch(value, allValues, props) {
  if (!isEmpty(value) && value !== props.password) {
    return VALIDATION.CONFIRM_PASSWORD;
  }
  return '';
}

// ownershipValidation
export function ownershipValidation(value, allValues, props) {
  if (!isEmpty(value) && Number(value) < 20) {
    return VALIDATION.OWNERSHIP_LESS_THAN_20;
  }
  if (!isEmpty(value) && Number(value) + Number(props.totalShares) > 100) {
    return VALIDATION.OWNERSHIP_MORE_THAN_100;
  }
  return '';
}

// directorSelection
export function directorSelection(value, allValues, props) {
  if (!isEmpty(value) && !props.shareholder && !props.director) {
    return VALIDATION.SHAREHOLDER_OR_DIRECTOR;
  }
  return '';
}

// *** URL REGEX validations
// website url match
export function websiteURL(value) {
  const otherWebsiteUrl = /(http(s)?:\/\/www\.)?[-a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%+.~#?&//=]*)/;
  const urlRule = new RegExp(otherWebsiteUrl);
  if (!isEmpty(value) && !urlRule.test(value)) {
    return VALIDATION.INVALID_URL;
  }
  return '';
}

// linkedIn url match
export function linkedInURL(value) {
  const linkedInProfile = /http(s)?:\/\/([\w]+\.)?linkedin\.com\/.*$/;
  const urlRule = new RegExp(linkedInProfile);
  if (!isEmpty(value) && !urlRule.test(value)) {
    return VALIDATION.INVALID_URL;
  }
  return '';
}

// github url match
export function githubURL(value) {
  const githubProfile = /http(s)?:\/\/([\w]+\.)?github\.com\/[A-z0-9_-]+\/?/;
  const urlRule = new RegExp(githubProfile);
  if (!isEmpty(value) && !urlRule.test(value)) {
    return VALIDATION.INVALID_URL;
  }
  return '';
}

// stackoverflow url match
export function stackoverflowURL(value) {
  const stackoverflowProfile = /http(s)?:\/\/([\w]+\.)?stackoverflow\.com\/users\/[0-9_-]+\/[A-z0-9_-]+\/?/;
  const urlRule = new RegExp(stackoverflowProfile);
  if (!isEmpty(value) && !urlRule.test(value)) {
    return VALIDATION.INVALID_URL;
  }
  return '';
}

// dribbbleURL match
export function dribbbleURL(value) {
  const dribbbleProfile = /http(s)?:\/\/([\w]+\.)?dribbble\.com\/[A-z0-9_-]+\/?/;
  const urlRule = new RegExp(dribbbleProfile);
  if (!isEmpty(value) && !urlRule.test(value)) {
    return VALIDATION.INVALID_URL;
  }
  return '';
}

// behanceURL match
export function behanceURL(value) {
  const behanceProfile = /http(s)?:\/\/([\w]+\.)?behance\.net\/[A-z0-9_-]+\/?/;
  const urlRule = new RegExp(behanceProfile);
  if (!isEmpty(value) && !urlRule.test(value)) {
    return VALIDATION.INVALID_URL;
  }
  return '';
}

// clutchURL  match
export function clutchURL(value) {
  const clutchProfile = /http(s)?:\/\/([\w]+\.)?clutch\.co\/[A-z0-9_-]+\/?/;
  const urlRule = new RegExp(clutchProfile);
  if (!isEmpty(value) && !urlRule.test(value)) {
    return VALIDATION.INVALID_URL;
  }
  return '';
}

// goodfirmsURL  match
export function goodfirmsURL(value) {
  const goodfirmsProfile = /http(s)?:\/\/([\w]+\.)?goodfirms\.co\/[A-z0-9_-]+\/?/;
  const urlRule = new RegExp(goodfirmsProfile);
  if (!isEmpty(value) && !urlRule.test(value)) {
    return VALIDATION.INVALID_URL;
  }
  return '';
}

export function createValidator(rules, partial) {
  return (data = {}, props) => {
    const errors = {};
    Object.keys(rules).forEach(key => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = partial ? rule(data[key], data, data) : rule(data.get(key), data, props);
      if (error) {
        errors[key] = error;
      }
    });
    // errors = customValidation(data, errors);
    return errors;
  };
}

// nameField validation
export function nameValidation(value) {
  const urlRule = new RegExp(/^[a-zA-Z0-9,'~._^ -]+$/);
  if (!isEmpty(value) && !urlRule.test(value)) {
    return VALIDATION.NAME_FIELD;
  }
  return '';
}

// companyregisteredNumber validation
export function companyRegisteredNumber(value) {
  const urlRule = new RegExp(/^[a-zA-Z0-9 ']+$/);
  if (!isEmpty(value) && !urlRule.test(value)) {
    return VALIDATION.COMPANY_REGISTERED_NUMBER;
  }
  return '';
}

// postCode
export function postCode(value) {
  const urlRule = new RegExp(/^[a-zA-Z0-9 -]+$/);
  if (!isEmpty(value) && !urlRule.test(value)) {
    return VALIDATION.POST_CODE;
  }
  return '';
}

// positiveInteger
export function positiveInteger(value) {
  const regex = new RegExp(/^[1-9]\d*$/);
  if (!isEmpty(value) && !regex.test(value)) {
    return VALIDATION.POSITIVE_INTEGER;
  }
  return '';
}

/* eslint-disable arrow-body-style */
