import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { VALIDATION } from 'utils/constants';
import { repoLoadingError, reset } from 'containers/App/actions';
import { API_URL, QUOTE } from 'containers/App/constants';
import request from 'utils/request';
import ToastifyMessage from 'components/ToastifyMessage';
import { SUBMIT_QUOTE } from './constants';

export function* submitQuote(data) {
  const { payload, data: quoteData, onSuccess } = data;

  const formData = new FormData();
  if (payload === 'add') {
    formData.append('projectId', get(quoteData, 'projectId'));
  } else if (payload === 'edit') {
    formData.append('id', get(quoteData, 'id'));
  }
  formData.append('name', get(quoteData, 'name'));
  formData.append('description', get(quoteData, 'description'));
  formData.append('quote', get(quoteData, 'quote'));

  const method = payload === 'add' ? 'POST' : 'PUT';
  const apiCallData = {
    method,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
  };

  const requestURL = `${API_URL}${QUOTE}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      if (typeof onSuccess === 'function') {
        onSuccess();
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

export default function* addQuoteForm() {
  yield takeLatest(SUBMIT_QUOTE, submitQuote);
}
