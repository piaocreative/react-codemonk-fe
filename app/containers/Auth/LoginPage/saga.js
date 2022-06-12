import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { push } from 'react-router-redux';
import { toast } from 'react-toastify';
import { sha256 } from 'js-sha256';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import AuthTokenService from 'utils/AuthTokenService';
import StorageService from 'utils/StorageService';
import { getUserRoleFromURL, gtm } from 'utils/Helper';
import { storeApiSignupStep } from 'containers/Auth/utils';
import { repoLoadingError, reset } from 'containers/App/actions';
import ToastifyMessage from 'components/ToastifyMessage';
import { redirectPageURL, agencyRedirectPageURL, clientRedirectPageURL } from 'containers/App/utils';
import { API_URL, AUTH, LOGIN_API } from 'containers/App/constants';
import { LOGIN } from './constants';
import { makeSelectEmail, makeSelectPassword } from './selectors';
import messages from './messages';

export function* login() {
  let email = yield select(makeSelectEmail());
  email = email ? email.replace(/ /g, '') : '';
  const password = yield select(makeSelectPassword());

  const body = { email, password: sha256(password) };

  const apiCallData = {
    method: 'POST',
    body,
  };

  const requestURL = `${API_URL}${AUTH}${LOGIN_API}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    const userType = get(log, 'data.role', '');

    if (get(log, 'status') === 1) {
      // GTM
      gtm({ action: 'Button Click', label: 'login', category: `${getUserRoleFromURL()} Portal`, directGA: true });

      AuthTokenService.storeToken(get(log, 'data.token'));
      StorageService.set('profilePicture', get(log, 'data.profilePicture', ''), { hash: true });
      StorageService.set('firstName', get(log, 'data.firstName', ''), { hash: true });
      const userBillingDetailsObj = {
        currency: get(log, 'data.currency', ''),
        ratePerHour: get(log, 'data.ratePerHour', ''),
      };
      StorageService.set('userBillingDetails', JSON.stringify(userBillingDetailsObj), { hash: true });
      StorageService.set('userEmail', email, { hash: true });

      const registerType = get(log, 'data.registerType');
      StorageService.set('userType', userType, { hash: true });
      StorageService.set('registerType', registerType, { hash: true });
      yield put(reset());
      let redirectPage = '';

      storeApiSignupStep(get(log, 'data.signupStep'));
      if (userType === 1) {
        let signupStep;
        signupStep = get(log, 'data.signupStep') === 0.1 ? 1 : get(log, 'data.signupStep', 0) + 1;

        const requestChangeEmail = get(log, 'data.requestChangeEmail') ? get(log, 'data.requestChangeEmail') : 0;
        if (registerType === 'agency') {
          signupStep = signupStep >= 6 ? 8 : signupStep;
        }
        StorageService.set('signupStep', signupStep, { hash: true });
        StorageService.set('userVersion', get(log, 'data.version'), { hash: true });
        StorageService.set('requestChangeEmail', requestChangeEmail, { hash: true });
        redirectPage = redirectPageURL(signupStep);
      } else if (userType === 3) {
        const signupStep = get(log, 'data.signupStep') === 0.1 ? 1 : get(log, 'data.signupStep', 0) + 1;
        StorageService.set('signupStep', signupStep, { hash: true });
        StorageService.set('agencyLogo', get(log, 'data.trading.logo', ''), { hash: true });
        redirectPage = agencyRedirectPageURL(signupStep);
      } else if (userType === 2) {
        const currentSignupStep = get(log, 'data.signupStep', '');
        const signupStep = currentSignupStep >= 3 ? 4 : currentSignupStep;
        StorageService.set('signupStep', signupStep, { hash: true });
        StorageService.set('clientID', get(log, 'data._id'), { hash: true });
        redirectPage = clientRedirectPageURL(signupStep);
      } else if (userType === 4) {
        redirectPage = '/admin';
      }

      const redirectToPage = StorageService.get('redirectToPage');
      if (redirectToPage) {
        redirectPage = redirectToPage;
        StorageService.delete('redirectToPage');
      }
      yield put(push({ pathname: redirectPage }));
    } else {
      yield put(reset());
      if (get(log, 'message') === messages.noVerificationText.defaultMessage && userType === 1) {
        StorageService.set('userEmail', get(log, 'data.email'));
        yield put(push({ pathname: `/talent/verification` }));
      } else if (get(log, 'message') === messages.noVerificationText.defaultMessage && userType === 2) {
        StorageService.set('userEmail', get(log, 'data.email'));
        yield put(push({ pathname: `/client/verification` }));
      } else {
        toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
        yield put(repoLoadingError(get(log, 'message')));
      }
    }
  } catch (err) {
    yield put(reset());
    toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}

export default function* talentLoginForm() {
  yield takeLatest(LOGIN, login);
}
