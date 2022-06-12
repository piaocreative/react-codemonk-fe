/**
 * Gets the repositories of the user from Github
 */
import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { repoLoadingError, isLoading } from 'containers/App/actions';
import { API_URL, PROJECT_API } from 'containers/App/constants';
import request from 'utils/request';
import { push } from 'react-router-redux';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { VALIDATION } from 'utils/constants';
import ToastifyMessage from 'components/ToastifyMessage';
import { reset } from './actions';
import { SUBMIT_PROJECT_DETAILS_FORM } from './constants';
import {
  makeSelectProjectName,
  makeSelectProjectDescription,
  makeSelectWorkProgress,
  makeSelectProjectURL,
  makeSelectUXDesign,
  makeSelectSoftwareDevelopment,
  makeSelectDevelopmentTeam,
  makeSelectDataAiMi,
  makeSelectGrowthHacking,
  makeSelectAgileCoach,
  makeSelectOther,
  makeSelectBudget,
  makeSelectMessage,
  makeSelectProjectSpeed,
  makeSelectManageTeam,
} from './selectors';

/**
 * user Forget request/response handler
 */
export function* getProjectDetails(data) {
  const submitType = data.payload;
  const { onSuccess } = data;
  const name = yield select(makeSelectProjectName());
  const getDescriptionText = yield select(makeSelectProjectDescription());
  const buildStatus = yield select(makeSelectWorkProgress());
  const projectUrl = yield select(makeSelectProjectURL());
  const lookingForDesign = yield select(makeSelectUXDesign());
  const lookingForSoftwareDevelopment = yield select(makeSelectSoftwareDevelopment());
  const lookingForDevelopmentTeam = yield select(makeSelectDevelopmentTeam());
  const lookingForDataAiMl = yield select(makeSelectDataAiMi());
  const lookingForGrowthHacking = yield select(makeSelectGrowthHacking());
  const lookingForAgileCoach = yield select(makeSelectAgileCoach());
  const lookingForOther = yield select(makeSelectOther());
  const budget = yield select(makeSelectBudget());
  const getMessageText = yield select(makeSelectMessage());
  const speed = yield select(makeSelectProjectSpeed());
  const teamManageType = yield select(makeSelectManageTeam());
  const messageToPreSales = draftToHtml(convertToRaw(getMessageText.getCurrentContent()));
  const description = draftToHtml(convertToRaw(getDescriptionText.getCurrentContent()));

  const apiCallData = {
    method: 'POST',
    body: {
      name,
      description,
      buildStatus,
      projectUrl,
      lookingForDesign,
      lookingForSoftwareDevelopment,
      lookingForDevelopmentTeam,
      lookingForDataAiMl,
      lookingForGrowthHacking,
      lookingForAgileCoach,
      lookingForOther,
      budget,
      messageToPreSales,
      speed,
      teamManageType,
    },
  };

  let requestURL = '';
  if (submitType === 'formSubmit') {
    requestURL = `${API_URL}${PROJECT_API}`;
  }

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(isLoading(false));
      if (submitType === 'formSubmit') {
        if (typeof onSuccess === 'function') {
          onSuccess();
        }
        yield put(reset());
        yield put(push({ pathname: `/client/request-received` }));
      } else {
        yield put(reset());
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
          className: 'Toast-success',
        });
      }
    } else {
      toast.error(log.message, { className: 'Toast-error' });
      yield put(repoLoadingError(get(log, 'message')));
    }
  } catch (err) {
    toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, {
      className: 'Toast-error',
    });
    yield put(repoLoadingError(err));
  }
}

export default function* personalDetailsForm() {
  yield takeLatest(SUBMIT_PROJECT_DETAILS_FORM, getProjectDetails);
}
