/**
 * saga for Enter Client Phone  component
 */
import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get, split } from 'lodash';
import { change, untouch } from 'redux-form/immutable';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import { repoLoadingError, reset } from 'containers/App/actions';
import { API_URL, CLIENT, PHONE_NUMBER_API } from 'containers/App/constants';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import { VALIDATION } from 'utils/constants';
import { gtm } from 'utils/Helper';
import ToastifyMessage from 'components/ToastifyMessage';
import { SUBMIT_ENTER_PHONE_PAGE_FORM, key } from './constants';
import { changeCountryCode, changePhoneNumber } from './actions';
import { makeSelectCountryCode, makeSelectPhoneNumber } from './selectors';

/**
 * submit Enter Client Phone
 */
export function* submitPhonePageForm() {
  const countryCodeLabel = yield select(makeSelectCountryCode());
  const [, countryCode] = split(countryCodeLabel.label, '+', 2);
  let phoneNumber = yield select(makeSelectPhoneNumber());
  phoneNumber = phoneNumber ? phoneNumber.replace(/ /g, '') : '';
  phoneNumber = phoneNumber.replace(/^0+/, '');

  const apiCallData = {
    method: 'PUT',
    body: {
      countryCode,
      phoneNumber,
    },
  };

  const requestURL = `${API_URL}${CLIENT}${PHONE_NUMBER_API}`;
  const pathname = `/client/verify-phone`;
  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      // GTM
      gtm({
        action: 'Button Click',
        event: 'custom_codemonk_event',
        label: 'start_registration',
        category: 'Client Portal',
        userType: 'Client',
        value: 1,
      });
      StorageService.set('userPhone', `+${countryCode}-${phoneNumber}`, { hash: true });
      StorageService.set('userPhoneCountry', `${countryCode}`, { hash: true });
      StorageService.set('userPhoneNumber', `${phoneNumber}`, { hash: true });
      yield put(reset());
      yield put(changeCountryCode(''));
      yield put(change(key, 'phoneNumber', ''));
      yield put(untouch(key, 'phoneNumber'));
      yield put(changePhoneNumber(''));
      yield put(push({ pathname }));
    } else {
      yield put(reset());
      toast.error(log.message, { className: 'Toast-error' });
      yield put(repoLoadingError(log.response.statusText));
    }
  } catch (err) {
    yield put(reset());
    toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* enterPhonePage() {
  yield takeLatest(SUBMIT_ENTER_PHONE_PAGE_FORM, submitPhonePageForm);
}
