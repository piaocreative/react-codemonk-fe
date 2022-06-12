import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { sha256 } from 'js-sha256';
import request from 'utils/request';
import { push } from 'react-router-redux';
import { gtm } from 'utils/Helper';
import StorageService from 'utils/StorageService';
import { redirectPageURL } from 'containers/App/utils';
import { repoLoadingError, reset, popUpSagaAction } from 'containers/App/actions';
import {
  API_URL,
  TALENT,
  SAVE_LATER_API,
  PAY_DETAIL_API,
  RATE,
  PAYMENT_API,
  BILLING_API,
  TALENT_DASHBOARD,
} from 'containers/App/constants';
import { VALIDATION } from 'utils/constants';
import { ToastifyMessage } from 'components';
import { SAVE_FOR_LATER, EDIT_PAYMENT, EDIT_BILLING } from './constants';
import {
  makeSelectRate,
  makeSelectBillingType,
  makeSelectCompanyDetails,
  makeSelectPayType,
  makeSelectBankPayDetails,
  makeSelectPayPalEmail,
  makeSelectPassword,
} from './selectors';

export function* saveForLater(data) {
  const { payload: submitType, validationData } = data;
  const body = {};

  if (validationData.validatePaymentRate) {
    const { currency, ratePerHour } = yield select(makeSelectRate());
    body.currency = currency.value;
    body.ratePerHour = ratePerHour;
  }

  if (validationData.validatePaymentBillingForCompany) {
    const {
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
    } = yield select(makeSelectCompanyDetails());
    const billingType = yield select(makeSelectBillingType());
    body.billingType = billingType;
    body.companyName = companyName;
    body.companyregisteredNumber = companyregisteredNumber;
    body.companyPincode = companyPincode;
    body.companyCity = companyCity;
    body.companyCountry = companyCountry.value;
    body.companyAddressLineOne = companyAddressLineOne;
    body.companyAddressLineTwo = companyAddressLineTwo;
    body.website = website;
    body.vatNumber = vatNumber;
    body.companyProfessionInsuranceValue = companyProfessionInsuranceValue;
    body.companyPublicInsurancesValue = companyPublicInsurancesValue;
    body.companyEmployerInsuranceValue = companyEmployerInsuranceValue;
  }
  if (validationData.validatePaymentBillingForFreelancer) {
    const billingType = yield select(makeSelectBillingType());
    body.billingType = billingType;
  }
  if (validationData.validatePayDataForBank) {
    const payType = yield select(makeSelectPayType());
    const { bankName, bankAccountNumber, bankCode } = yield select(makeSelectBankPayDetails());
    body.payType = payType;
    body.bankName = bankName;
    body.bankAccountNumber = bankAccountNumber;
    body.bankCode = bankCode;
  }
  if (validationData.validatePayDataForFreelancer) {
    const payType = yield select(makeSelectPayType());
    const payPalEmail = yield select(makeSelectPayPalEmail());
    body.payType = payType;
    body.payPalEmail = payPalEmail;
  }

  const apiCallData = {
    method: 'PUT',
    body,
  };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    apiCallData.body.step = 7;
    requestURL = `${API_URL}${TALENT}${SAVE_LATER_API}`;
  } else if (submitType === 'submitForm') {
    requestURL = `${API_URL}${TALENT}${PAY_DETAIL_API}`;
  } else if (submitType === 'editRate') {
    apiCallData.body = { currency: body.currency, ratePerHour: body.ratePerHour };

    const userType = StorageService.get('userType');
    if (userType === '3') apiCallData.body.talentId = StorageService.get('talentId');

    requestURL = `${API_URL}${TALENT}${RATE}`;
  }
  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      if (submitType === 'submitForm') {
        const signupStep = 8;
        StorageService.set('signupStep', signupStep, { hash: true });
        StorageService.set('isPaymentSkipped', false, { hash: true });

        const pathname = redirectPageURL(signupStep);

        yield put(push({ pathname }));

        // GTM
        gtm({
          action: 'Button Click',
          event: 'custom_codemonk_event',
          label: 'registration_success',
          category: 'Talent Portal',
          userType: 'freelancer',
          value: 1,
        });
      } else if (submitType === 'editRate') {
        const userBillingDetailsObj = {
          currency: get(body, 'currency', ''),
          ratePerHour: get(body, 'ratePerHour', ''),
        };
        StorageService.set('userBillingDetails', JSON.stringify(userBillingDetailsObj), { hash: true });
        yield put(popUpSagaAction(false));
      } else if (submitType === 'saveForLater') {
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
          className: 'Toast-success',
        });

        StorageService.set('isPaymentSkipped', true, { hash: true });
        yield put(push({ pathname: TALENT_DASHBOARD }));
      }
    } else {
      yield put(reset());
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, {
        className: 'Toast-error',
      });
      yield put(repoLoadingError(get(log, 'message')));
    }
  } catch (err) {
    yield put(reset());
    toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, {
      className: 'Toast-error',
    });
    yield put(repoLoadingError(err));
  }
}

export function* editPayment(data) {
  const { onSuccess } = data;
  const body = {};

  const payType = yield select(makeSelectPayType());
  const password = yield select(makeSelectPassword());
  const { bankName, bankAccountNumber, bankCode } = yield select(makeSelectBankPayDetails());

  const payPalEmail = yield select(makeSelectPayPalEmail());

  if (payType === 'bank') {
    body.payType = payType;
    body.bankName = bankName;
    body.bankAccountNumber = bankAccountNumber;
    body.bankCode = bankCode;
  } else if (payType === 'paypal') {
    body.payType = payType;
    body.payPalEmail = payPalEmail;
  }
  body.oldPassword = sha256(password);

  const apiCallData = {
    method: 'PUT',
    body,
  };

  const requestURL = `${API_URL}${TALENT}${PAYMENT_API}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      // change isPaymentSkipped
      const isPaymentSkipped = get(log, 'data.isPaymentSkipped');
      StorageService.set('isPaymentSkipped', isPaymentSkipped, { hash: true });
      let signupStep = StorageService.get('signupStep');
      signupStep = !isPaymentSkipped ? 8 : signupStep;
      StorageService.set('signupStep', signupStep, { hash: true });

      if (typeof onSuccess === 'function') {
        onSuccess();
      }

      toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
        className: 'Toast-success',
      });
    } else {
      yield put(reset());
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, {
        className: 'Toast-error',
      });
      yield put(repoLoadingError(get(log, 'message')));
    }
  } catch (err) {
    yield put(reset());
    toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, {
      className: 'Toast-error',
    });
    yield put(repoLoadingError(err));
  }
}
export function* editBilling(data) {
  const { changedFiles, onSuccess } = data;
  const changedFilesKeys = Object.keys(changedFiles);
  const formData = new FormData();
  for (let i = 0; i < changedFilesKeys.length; i++) {
    const files = changedFiles[changedFilesKeys[i]];
    const { 0: file } = files;
    formData.append(changedFilesKeys[i], file);
  }
  const billingType = yield select(makeSelectBillingType());
  formData.append('billingType', billingType);

  if (billingType === 'company') {
    const {
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
    } = yield select(makeSelectCompanyDetails());

    formData.append('companyName', companyName);
    formData.append('companyregisteredNumber', companyregisteredNumber);
    formData.append('companyPincode', companyPincode);
    formData.append('companyCity', companyCity);
    formData.append('companyCountry', companyCountry.value);
    formData.append('companyAddressLineOne', companyAddressLineOne);
    formData.append('companyAddressLineTwo', companyAddressLineTwo);
    formData.append('website', website);
    formData.append('vatNumber', vatNumber);
    formData.append('companyProfessionInsuranceValue', companyProfessionInsuranceValue);
    formData.append('companyPublicInsurancesValue', companyPublicInsurancesValue);
    formData.append('companyEmployerInsuranceValue', companyEmployerInsuranceValue);
  }

  const apiCallData = {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
  };

  const requestURL = `${API_URL}${TALENT}${BILLING_API}`;
  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      // change isPaymentSkipped
      const isPaymentSkipped = get(log, 'data.isPaymentSkipped');
      StorageService.set('isPaymentSkipped', isPaymentSkipped, { hash: true });
      let signupStep = StorageService.get('signupStep');
      signupStep = !isPaymentSkipped ? 8 : signupStep;
      StorageService.set('signupStep', signupStep, { hash: true });

      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
        className: 'Toast-success',
      });
    } else {
      yield put(reset());
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, {
        className: 'Toast-error',
      });
      yield put(repoLoadingError(get(log, 'message')));
    }
  } catch (err) {
    yield put(reset());
    toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, {
      className: 'Toast-error',
    });
    yield put(repoLoadingError(err));
  }
}

export default function* keyProjectForm() {
  yield takeLatest(SAVE_FOR_LATER, saveForLater);
  yield takeLatest(EDIT_PAYMENT, editPayment);
  yield takeLatest(EDIT_BILLING, editBilling);
}
