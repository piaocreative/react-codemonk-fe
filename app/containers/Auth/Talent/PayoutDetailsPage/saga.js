/**
 * Gets the repositories of the user from Github
 */
import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import StorageService from 'utils/StorageService';
import { VALIDATION } from 'utils/constants';
import Emitter from 'utils/emitter';
import { repoLoadingError, isLoading, reset } from 'containers/App/actions';
import { API_URL, AGENCY, SAVE_LATER_API, PAY_DETAILS_API } from 'containers/App/constants';
import request from 'utils/request';
import { agencyRedirectPageURL } from 'containers/App/utils';
import ToastifyMessage from 'components/ToastifyMessage';
import { SUBMIT_PAYOUT_DETAILS_FORM } from './constants';
import { makeSelectBankName, makeSelectAccountNumber, makeSelectBankCode } from './selectors';

export function* getPayoutDetails(data) {
  const submitType = data.payload;
  let bankName = yield select(makeSelectBankName());
  let bankAccountNumber = yield select(makeSelectAccountNumber());
  let bankCode = yield select(makeSelectBankCode());

  if (bankName.length < 2 || bankName.length > 50) bankName = '';
  if (bankAccountNumber.length < 2 || bankAccountNumber.length > 40) bankAccountNumber = '';
  if (bankCode.length < 2 || bankCode.length > 50) bankCode = '';

  const apiCallData = {
    method: 'PUT',
    body: {
      bankName,
      bankAccountNumber,
      bankCode,
    },
  };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    apiCallData.body.step = 4;
    requestURL = `${API_URL}${AGENCY}${SAVE_LATER_API}`;
  } else if (submitType === 'editPayout') {
    requestURL = `${API_URL}${AGENCY}${PAY_DETAILS_API}`;
  } else {
    requestURL = `${API_URL}${AGENCY}${PAY_DETAILS_API}`;
  }

  try {
    // Call our request helper (see 'utils/request')
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(isLoading(false));
      if (submitType === 'continue') {
        yield put(reset());
        StorageService.set('signupStep', 5, { hash: true });
        const pathname = agencyRedirectPageURL(5);
        yield put(push({ pathname }));
      } else if (submitType === 'editPayout') {
        yield put(reset());
        Emitter.emit('editPayout', true);
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
          className: 'Toast-success',
        });
      } else {
        yield put(reset());
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
          className: 'Toast-success',
        });
      }
    } else {
      yield put(reset());
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(repoLoadingError(get(log, 'message')));
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
export default function* payoutDetailsForm() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield takeLatest(SUBMIT_PAYOUT_DETAILS_FORM, getPayoutDetails);
}
