import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { VALIDATION } from 'utils/constants';
import Emitter from 'utils/emitter';
import { repoLoadingError, reset } from 'containers/App/actions';
import ToastifyMessage from 'components/ToastifyMessage';
import { API_URL, AGENCY, QUOTE, SUBMIT } from 'containers/App/constants';
import request from 'utils/request';
import { SUBMIT_QUOTE } from './constants';

export function* submitQuote(data) {
  const { data: quoteData, onSuccess } = data;
  const formData = new FormData();

  formData.append('projectPlan', get(quoteData, 'projectPlan'));
  formData.append('effrotsBreakdown', get(quoteData, 'effortsBreakdown'));

  formData.append('quoteId', get(quoteData, 'quoteId'));
  formData.append('projectId', get(quoteData, 'projectId'));
  formData.append('assumptions', get(quoteData, 'assumptions'));
  formData.append('outOfScope', get(quoteData, 'outOfScope'));
  formData.append('teamStructure', get(quoteData, 'teamStructure'));
  formData.append('totalCost', get(quoteData, 'totalCost'));
  formData.append('otherInfo', get(quoteData, 'otherInfo'));

  const apiCallData = {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
  };

  const requestURL = `${API_URL}${AGENCY}${QUOTE}${SUBMIT}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      Emitter.emit('quoteSubmit', true);
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
export default function* agencyApplyQuoteForm() {
  yield takeLatest(SUBMIT_QUOTE, submitQuote);
}
