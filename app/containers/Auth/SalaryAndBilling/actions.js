import {
  CHANGE_EMPLOYMENT_TYPE,
  CHANGE_ANNUAL_RATE_CURRENCY,
  CHANGE_ANNUAL_RATE,
  CHANGE_HOURLY_RATE_CURRENCY,
  CHANGE_HOURLY_RATE,
  CHANGE_BILL_TYPE,
  CHANGE_COMPANY_NAME,
  CHANGE_COMPANY_REGISTRATION_NUMBER,
  CHANGE_COMPANY_WEBSITE,
  CHANGE_COMPANY_VAT,
  CHANGE_COMPANY_LINE1,
  CHANGE_COMPANY_LINE2,
  CHANGE_COMPANY_COUNTRY,
  CHANGE_COMPANY_CITY,
  CHANGE_COMPANY_STATE,
  CHANGE_COMPANY_POSTCODE,
  CHANGE_INDEMNITY_CURRENCY,
  CHANGE_INDEMNITY,
  CHANGE_PUBLIC_LIABILITY_CURRENCY,
  CHANGE_PUBLIC_LIABILITY,
  CHANGE_EMPLOYEE_LIABILITY_CURRENCY,
  CHANGE_EMPLOYEE_LIABILITY,
  SUBMIT_SALARYBILL_FORM,
  SAVE_FOR_LATER,
} from './constants';

export function changeEmploymentType(payload) {
  return {
    type: CHANGE_EMPLOYMENT_TYPE,
    payload,
  };
}

export function changeAnnualRateCurrency(payload) {
  return {
    type: CHANGE_ANNUAL_RATE_CURRENCY,
    payload,
  };
}

export function changeAnnualRate(payload) {
  return {
    type: CHANGE_ANNUAL_RATE,
    payload,
  };
}

export function changeHourlyRateCurrecy(payload) {
  return {
    type: CHANGE_HOURLY_RATE_CURRENCY,
    payload,
  };
}

export function changeHourlyRate(payload) {
  return {
    type: CHANGE_HOURLY_RATE,
    payload,
  };
}

export function changeBillType(payload) {
  return {
    type: CHANGE_BILL_TYPE,
    payload,
  };
}

export function changeCompanyName(payload) {
  return {
    type: CHANGE_COMPANY_NAME,
    payload,
  };
}

export function changeCompanyRegistrationNumber(payload) {
  return {
    type: CHANGE_COMPANY_REGISTRATION_NUMBER,
    payload,
  };
}

export function changeCompanyWebsite(payload) {
  return {
    type: CHANGE_COMPANY_WEBSITE,
    payload,
  };
}

export function changeCompanyVat(payload) {
  return {
    type: CHANGE_COMPANY_VAT,
    payload,
  };
}

export function changeCompanyCountry(payload) {
  return {
    type: CHANGE_COMPANY_COUNTRY,
    payload,
  };
}

export function changeCompanyLine1(payload) {
  return {
    type: CHANGE_COMPANY_LINE1,
    payload,
  };
}

export function changeCompanyLine2(payload) {
  return {
    type: CHANGE_COMPANY_LINE2,
    payload,
  };
}

export function changeCompanyCity(payload) {
  return {
    type: CHANGE_COMPANY_CITY,
    payload,
  };
}

export function changeCompanyState(payload) {
  return {
    type: CHANGE_COMPANY_STATE,
    payload,
  };
}

export function changeCompanyPostcode(payload) {
  return {
    type: CHANGE_COMPANY_POSTCODE,
    payload,
  };
}

export function changeIndemnityCurrency(payload) {
  return {
    type: CHANGE_INDEMNITY_CURRENCY,
    payload,
  };
}

export function changeIndemnity(payload) {
  return {
    type: CHANGE_INDEMNITY,
    payload,
  };
}

export function changePublicLiabilityCurrency(payload) {
  return {
    type: CHANGE_PUBLIC_LIABILITY_CURRENCY,
    payload,
  };
}

export function changePublicLiability(payload) {
  return {
    type: CHANGE_PUBLIC_LIABILITY,
    payload,
  };
}

export function changeEmployeeLiabilityCurrency(payload) {
  return {
    type: CHANGE_EMPLOYEE_LIABILITY_CURRENCY,
    payload,
  };
}

export function changeEmployeeLiability(payload) {
  return {
    type: CHANGE_EMPLOYEE_LIABILITY,
    payload,
  };
}

export function submitSalaryBillForm(payload, data = []) {
  return {
    type: SUBMIT_SALARYBILL_FORM,
    payload,
    userData: data,
  };
}

export function saveForLater(payload, data = []) {
  return {
    type: SAVE_FOR_LATER,
    payload,
    userData: data,
  };
}
