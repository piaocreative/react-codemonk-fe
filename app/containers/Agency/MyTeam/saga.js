import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import Emitter from 'utils/emitter';
import { VALIDATION } from 'utils/constants';
import StorageService from 'utils/StorageService';
import { repoLoadingError, reset } from 'containers/App/actions';
import { API_URL, SAVE_LATER_API, AGENCY, TALENT, TALENTS } from 'containers/App/constants';
import request from 'utils/request';
import ToastifyMessage from 'components/ToastifyMessage';
import { agencyRedirectPageURL } from 'containers/App/utils';
import { CHANGE_TALENT, SUBMIT_ADD_TALENTS } from './constants';

export function* changeTalent(data) {
  const { payload: submitType, data: formData } = data;

  const body = formData;
  const requestURL = `${API_URL}${AGENCY}${TALENT}`;
  let method = 'POST';

  if (submitType === 'add') {
    method = 'POST';
  } else if (submitType === 'edit') {
    method = 'PUT';
  } else if (submitType === 'delete') {
    method = 'DELETE';
  }

  const apiCallData = {
    method,
    body,
  };

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      if (submitType === 'add') Emitter.emit('addTalentSaga', true);
      else if (submitType === 'edit') Emitter.emit('editTalentSaga', true);
      else if (submitType === 'delete') Emitter.emit('deleteTalentSaga', true);
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

export function* submitAddTalents(data) {
  const submitType = data.payload;
  const formData = data.data;

  const body = { talents: formData };

  const apiCallData = {
    method: 'POST',
    body,
  };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    apiCallData.method = 'PUT';
    apiCallData.body.step = 2;
    requestURL = `${API_URL}${AGENCY}${SAVE_LATER_API}`;
  } else if (submitType === 'continue') {
    requestURL = `${API_URL}${AGENCY}${TALENTS}`;
  }

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      if (submitType === 'continue') {
        yield put(reset());
        StorageService.set('signupStep', 3, { hash: true });
        const pathname = agencyRedirectPageURL(3);
        yield put(push({ pathname }));
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

export default function* agencyTalentForm() {
  yield takeLatest(CHANGE_TALENT, changeTalent);
  yield takeLatest(SUBMIT_ADD_TALENTS, submitAddTalents);
}
