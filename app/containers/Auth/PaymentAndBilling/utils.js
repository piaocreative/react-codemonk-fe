import React from 'react';
import { change } from 'redux-form/immutable';
import { size, includes } from 'lodash';
import { MAX_FILE_SIZE } from 'utils/constants';
import { toastMessages } from '../../App/constants';
import { key } from './constants';
import { changeRate, changeBillingType, changeCompanyDetails, changePayType, changeBankPayDetails, changePayPalDetails } from './actions';

import CompanyDetails from './CompanyDetails';
import BankAccountDetails from './BankAccountDetails';
import PayPalDetails from './PayPalDetails';

export const handleBackButton = (e, history, dispatch) => {
  e.preventDefault();
  dispatch(changePayType(''));
  dispatch(changeBillingType(''));
  history.push({
    pathname: '/talent/preferences',
    redirection: true,
  });
};

export const Billing = (radioBilling, companyDetails, handleChangeCompanyDetails, companyDoc, editFlag = true, props = {}) => [
  {
    Component: null,
    condition: radioBilling === 'freelancer',
    value: 'freelancer',
    label: 'Freelancer',
    className: 'custom-radio',
    selectedRadioClassName: 'custom-radio-focus',
  },
  {
    Component: (
      <CompanyDetails
        companyDetails={companyDetails}
        handleChangeCompanyDetails={handleChangeCompanyDetails}
        editFlag={editFlag}
        {...companyDoc}
        {...props}
        formKey={props.form}
      />
    ),
    condition: radioBilling === 'company',
    value: 'company',
    label: 'Company',
    className: 'custom-radio',
    selectedRadioClassName: 'custom-radio-focus',
  },
];

export const Payment = (
  radioPayment,
  bankPayDetails,
  handleChangeBankPayDetails,
  payPalEmail,
  handleChangePayPalDetails,
  editFlag = true,
) => [
  {
    Component: (
      <BankAccountDetails bankPayDetails={bankPayDetails} handleChangeBankPayDetails={handleChangeBankPayDetails} editFlag={editFlag} />
    ),
    condition: radioPayment === 'bank',
    value: 'bank',
    label: 'Bank Account',
    className: 'mb-3',
  },
  {
    Component: <PayPalDetails payPalEmail={payPalEmail} handleChangePayPalDetails={handleChangePayPalDetails} editFlag={editFlag} />,
    condition: radioPayment === 'paypal',
    value: 'paypal',
    label: 'Paypal',
    className: 'mb-3',
  },
];

export const setChange = (dispatch, data) => {
  Object.keys(data).forEach(fieldKey => {
    dispatch(change(key, fieldKey, data[fieldKey]));
  });
};

export const setInitialValues = (dispatch, data) => {
  const {
    currency,
    ratePerHour,
    companyName,
    companyregisteredNumber,
    companyPincode,
    companyCity,
    companyCountry,
    companyAddressLineOne,
    companyAddressLineTwo,
    website,
    vatNumber,
    companyProfessionInsuranceValue,
    companyPublicInsurancesValue,
    companyEmployerInsuranceValue,
    bankAccountNumber,
    bankCode,
    bankName,
  } = data;
  dispatch(changeRate({ currency, ratePerHour }));
  dispatch(changeBillingType(data.billingType));
  dispatch(
    changeCompanyDetails({
      companyName,
      companyregisteredNumber,
      companyPincode,
      companyCity,
      companyCountry,
      companyAddressLineOne,
      companyAddressLineTwo,
      website,
      vatNumber,
      companyProfessionInsuranceValue,
      companyPublicInsurancesValue,
      companyEmployerInsuranceValue,
    }),
  );
  dispatch(changePayType(data.payType));
  dispatch(changeBankPayDetails({ bankAccountNumber, bankCode, bankName }));

  dispatch(changePayPalDetails(data.payPalEmail));
};

export const validatePaymentRate = rate => {
  const { currency, ratePerHour } = rate;
  let output = 1;

  if (currency === '' || ratePerHour <= 0) {
    output = 0;
  }
  return output;
};

export const validatePaymentBillingForCompany = companyDetails => {
  let output = 1;

  const { companyName, companyregisteredNumber, companyPincode, companyCity, companyCountry, companyAddressLineOne } = companyDetails;

  const newCompanyDetails = {
    companyName,
    companyregisteredNumber,
    companyPincode,
    companyCity,
    companyCountry,
    companyAddressLineOne,
  };

  Object.keys(newCompanyDetails).forEach(fieldKey => {
    if (size(fieldKey) === 0 || newCompanyDetails[fieldKey] <= 0 || newCompanyDetails[fieldKey] === undefined) {
      output = 0;
    }
  });

  return output;
};
export const validatePaymentBilling = (billingType, companyDetails) => {
  let output = 1;
  if (billingType === 'company') {
    output = validatePaymentBillingForCompany(companyDetails);
  } else if (billingType === 'freelancer') {
    output = 1;
  }
  return output;
};

export const validatePayDataForBank = bankPayDetails => {
  let output = 1;
  const { bankName, bankAccountNumber, bankCode } = bankPayDetails;
  if (size(bankName) === 0 || size(bankAccountNumber) === 0 || size(bankCode) === 0) {
    output = 0;
  }
  return output;
};

export const checkForValidation = (rate, billingType, companyDetails, payType, bankPayDetails, payPalEmail) => {
  const validationData = {};
  if (validatePaymentRate(rate)) {
    validationData.validatePaymentRate = 1;
  }
  if (billingType === 'company' && validatePaymentBillingForCompany(companyDetails)) {
    validationData.validatePaymentBillingForCompany = 1;
  }

  if (billingType === 'freelancer') {
    validationData.validatePaymentBillingForFreelancer = 1;
  }

  if (payType === 'bank' && validatePayDataForBank(bankPayDetails)) {
    validationData.validatePayDataForBank = 1;
  }

  if (payType === 'paypal' && size(payPalEmail) > 0) {
    validationData.validatePayDataForFreelancer = 1;
  }
  return validationData;
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
