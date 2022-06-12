import produce from 'immer';

import {
  CHANGE_RATE,
  CHANGE_BILLING_TYPE,
  CHANGE_PAY_TYPE,
  CHANGE_COMPANY_DETAILS,
  CHANGE_BANK_PAY_DETAILS,
  CHANGE_PAYPAL_DETAILS,
  PASSWORD,
} from './constants';

export const initialState = {
  rate: { currency: {}, ratePerHour: '' },
  billingType: '',
  companyDetails: {
    companyName: '',
    companyregisteredNumber: '',
    companyPincode: '',
    companyCity: '',
    companyCountry: {},
    companyAddressLineOne: '',
    companyAddressLineTwo: '',
    website: '',
    vatNumber: '',
    companyProfessionInsuranceValue: '',
    companyPublicInsurancesValue: '',
    companyEmployerInsuranceValue: '',
  },
  payType: '',
  bankPayDetails: {
    bankName: '',
    bankAccountNumber: '',
    bankCode: '',
  },
  payPalEmail: '',
  password: '',
};

const paymentReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_RATE:
        draft.rate = action.payload;
        break;

      case CHANGE_BILLING_TYPE:
        draft.billingType = action.payload;
        break;
      case CHANGE_PAY_TYPE:
        draft.payType = action.payload;
        break;
      case CHANGE_COMPANY_DETAILS:
        draft.companyDetails = action.payload;
        break;
      case CHANGE_BANK_PAY_DETAILS:
        draft.bankPayDetails = action.payload;
        break;
      case CHANGE_PAYPAL_DETAILS:
        draft.payPalEmail = action.payload;
        break;
      case PASSWORD:
        draft.password = action.payload;
        break;
      default:
    }
  });

export default paymentReducer;
