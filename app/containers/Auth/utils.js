import React from 'react';
import { toast } from 'react-toastify';
import { change, untouch } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import StorageService from 'utils/StorageService';
import { logout, getUserRoleFromURL } from 'utils/Helper';
import request from 'utils/request';
import history from 'utils/history';
import { VALIDATION } from 'utils/constants';
import { LinkButtonMod, Button } from 'components';
import {
  API_URL,
  USER,
  DETAILS,
  TALENT,
  PROFESSIONAL_SKILLS_API,
  INDUSTRIES,
  COMPANY_CULTURES,
  CERTIFICATIONS,
} from 'containers/App/constants';
import containerMessage from 'containers/messages';
import ToastifyMessage from 'components/ToastifyMessage';
import { signupLink } from 'containers/App/utils';

export const fetchFieldValues = response => {
  let output = '';
  if (get(response, 'status')) {
    output = response;
  } else {
    toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
  }
  return output;
};

export const getUserDetails = () => {
  const data = {
    method: 'GET',
  };
  const requestURL = `${API_URL}${USER}${DETAILS}`;
  return request(requestURL, data);
};

export const loadUserDetails = setUserDetails => {
  const data = { method: 'GET' };
  const requestURL = `${API_URL}${USER}${DETAILS}`;
  request(requestURL, data)
    .then(setUserDetails)
    .catch(() => {
      history.push(signupLink);
      toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
    });
};

export const getIndustryList = setIndustries => {
  const data = { method: 'GET' };
  const requestURL = `${API_URL}${TALENT}${INDUSTRIES}`;
  request(requestURL, data)
    .then(setIndustries)
    .catch(() => {
      toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
    });
};

export const getCertificationsList = setCertifications => {
  const data = { method: 'GET' };
  const requestURL = `${API_URL}${TALENT}${CERTIFICATIONS}`;
  request(requestURL, data)
    .then(setCertifications)
    .catch(() => {
      toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
    });
};

export const getCompanyCultures = setCompanyCultures => {
  const data = { method: 'GET' };
  const requestURL = `${API_URL}${TALENT}${COMPANY_CULTURES}`;
  request(requestURL, data)
    .then(setCompanyCultures)
    .catch(() => {
      toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
    });
};

export const getSkills = setSkills => {
  const data = { method: 'GET' };
  const requestURL = `${API_URL}${TALENT}${PROFESSIONAL_SKILLS_API}`;
  request(requestURL, data)
    .then(setSkills)
    .catch(() => {
      toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
    });
};

export const handleBackButton = (e, history, pathname) => {
  e.preventDefault();
  history.push({
    pathname,
    redirection: true,
  });
};

export const setChange = (dispatch, key, fields) => {
  Object.keys(fields).forEach(fieldKey => {
    dispatch(change(key, fieldKey, fields[fieldKey]));
  });
};

export const setChangeAndUntouch = (dispatch, key, fields) => {
  Object.keys(fields).forEach(fieldKey => {
    dispatch(change(key, fieldKey, fields[fieldKey]));
    dispatch(untouch(key, fieldKey));
  });
};

export const errorInUserDetails = (message = '') => {
  logout();
  const link = getUserRoleFromURL() === 'talent' ? '/talent/login' : '/client/login';
  history.push(link);
  const toastMSG = message || VALIDATION.wentWrong;

  toast.error(<ToastifyMessage message={toastMSG} type="error" />, { className: 'Toast-error' });
};

export const getSelectedFieldFromList = (list, listCompareKey, value) => list.find(c => c[listCompareKey] === value) || '';

export const getCountry = country => (country ? { label: country, value: country } : '');

export const setDocName = data => {
  let output = '';
  if (data) {
    const fileName = data.split('/');
    output = `${fileName[fileName.length - 1]}`;
  }
  return output;
};

export const storeApiSignupStep = step => {
  if (step) {
    StorageService.set('apiSignupStep', step, { hash: true });
  }
};

export const getWrapperClassName = (loading, responseSuccess, responseError) => {
  let output = '';
  if (loading) {
    output = ' loading';
  } else if (responseSuccess) {
    output = ' request-success';
  } else if (responseError) {
    output = ' request-error';
  }
  return output;
};

export const accountSettingsTabFooter = (
  loading,
  invalid,
  handleSubmit,
  editFlag,
  handleCancelClick,
  handleSubmitButton,
  handleSubmitClick,
) => (
  <React.Fragment>
    <div className="d-flex justify-content-md-end align-items-center flex-wrap justify-content-between">
      <LinkButtonMod
        color="link"
        className="m-link"
        disabled={!editFlag}
        onClick={() => {
          handleCancelClick(editFlag);
        }}
      >
        <FormattedMessage {...containerMessage.btnCancel} />
      </LinkButtonMod>
      <Button
        className={`${loading ? 'loading' : ''} btn-primary mt-0 me-0`}
        disabled={handleSubmitButton(invalid, editFlag)}
        onClick={handleSubmit(e => handleSubmitClick(e))}
      >
        <FormattedMessage {...containerMessage.btnSave} />
      </Button>
    </div>
  </React.Fragment>
);
