/*
 * PersonalDetails Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import produce from 'immer';
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
  CHANGE_COMPANY_POSTCODE,
  CHANGE_COMPANY_COUNTRY,
  CHANGE_COMPANY_LINE1,
  CHANGE_COMPANY_LINE2,
  CHANGE_COMPANY_CITY,
  CHANGE_COMPANY_STATE,
  CHANGE_INDEMNITY_CURRENCY,
  CHANGE_INDEMNITY,
  CHANGE_PUBLIC_LIABILITY_CURRENCY,
  CHANGE_PUBLIC_LIABILITY,
  CHANGE_EMPLOYEE_LIABILITY_CURRENCY,
  CHANGE_EMPLOYEE_LIABILITY,
} from './constants';

// The initial state of the App
export const initialState = {
  employmentType: [],
  currencyAnnualRate: {
    label: '$',
    value: 'USD',
  },
  annualRate: '',
  currency: {
    label: '$',
    value: 'USD',
  },
  ratePerHour: '',
  billingType: 'freelancer',
  companyName: '',
  companyregisteredNumber: '',
  companyPincode: '',
  companyCity: '',
  companyCountry: '',
  companyAddressLineOne: '',
  companyAddressLineTwo: '',
  website: '',
  vatNumber: '',
  companyLogo: '',
  companyState: '',
  currencyCompanyProfessionInsuranceValue: {
    label: '$',
    value: 'USD',
  },
  companyProfessionInsuranceValue: '',
  currencyCompanyPublicInsurancesValue: {
    label: '$',
    value: 'USD',
  },
  companyPublicInsurancesValue: '',
  currencyCompanyEmployerInsuranceValue: {
    label: '$',
    value: 'USD',
  },
  companyEmployerInsuranceValue: '',
};

const billReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EMPLOYMENT_TYPE:
        draft.employmentType = action.payload;
        break;
      case CHANGE_ANNUAL_RATE_CURRENCY:
        draft.currencyAnnualRate = action.payload;
        break;
      case CHANGE_ANNUAL_RATE:
        draft.annualRate = action.payload;
        break;
      case CHANGE_HOURLY_RATE_CURRENCY:
        draft.currency = action.payload;
        break;
      case CHANGE_HOURLY_RATE:
        draft.ratePerHour = action.payload;
        break;
      case CHANGE_BILL_TYPE:
        draft.billingType = action.payload;
        break;
      case CHANGE_COMPANY_NAME:
        draft.companyName = action.payload;
        break;
      case CHANGE_COMPANY_REGISTRATION_NUMBER:
        draft.companyregisteredNumber = action.payload;
        break;
      case CHANGE_COMPANY_WEBSITE:
        draft.website = action.payload;
        break;
      case CHANGE_COMPANY_VAT:
        draft.vatNumber = action.payload;
        break;
      case CHANGE_COMPANY_POSTCODE:
        draft.companyPincode = action.payload;
        break;
      case CHANGE_COMPANY_COUNTRY:
        draft.companyCountry = action.payload;
        break;
      case CHANGE_COMPANY_LINE1:
        draft.companyAddressLineOne = action.payload;
        break;
      case CHANGE_COMPANY_LINE2:
        draft.companyAddressLineTwo = action.payload;
        break;
      case CHANGE_COMPANY_CITY:
        draft.companyCity = action.payload;
        break;
      case CHANGE_COMPANY_STATE:
        draft.companyState = action.payload;
        break;
      case CHANGE_INDEMNITY_CURRENCY:
        draft.currencyCompanyProfessionInsuranceValue = action.payload;
        break;
      case CHANGE_INDEMNITY:
        draft.companyProfessionInsuranceValue = action.payload;
        break;
      case CHANGE_PUBLIC_LIABILITY_CURRENCY:
        draft.currencyCompanyPublicInsurancesValue = action.payload;
        break;
      case CHANGE_PUBLIC_LIABILITY:
        draft.companyPublicInsurancesValue = action.payload;
        break;
      case CHANGE_EMPLOYEE_LIABILITY_CURRENCY:
        draft.currencyCompanyEmployerInsuranceValue = action.payload;
        break;
      case CHANGE_EMPLOYEE_LIABILITY:
        draft.companyEmployerInsuranceValue = action.payload;
        break;
      default:
    }
    return draft;
  });

export default billReducer;
