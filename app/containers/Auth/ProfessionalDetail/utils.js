import React from 'react';
import { touch } from 'redux-form/immutable';
import get from 'lodash/get';
import { roleYears } from 'containers/App/constants';
import { key } from './constants';
import {
  changeLinkedInProfile,
  changeGithubProfile,
  changeStackoverflowProfile,
  changeDribbleProfile,
  changeBehanceProfile,
  changePersonalProfile,
  changePrimaryRole,
  changeExperience,
  changeSkills,
} from './actions';

export const renderRoleYears = fieldValue => {
  const output = [];
  for (let i = 0; i < roleYears.length; i++) {
    if (fieldValue === roleYears[i].name) {
      output.push(
        <option value={roleYears[i].name} key={i} selected>
          {roleYears[i].name}
        </option>,
      );
    } else {
      output.push(
        <option value={roleYears[i].name} key={i}>
          {roleYears[i].name}
        </option>,
      );
    }
  }
  return output;
};

export const handleBackButton = (e, history) => {
  e.preventDefault();
  history.push({
    pathname: '/talent/about-you',
    redirection: true,
  });
};

export const setChange = (dispatch, change, fields) => {
  Object.keys(fields).forEach(fieldKey => {
    dispatch(change(key, fieldKey, fields[fieldKey]));
  });
};

// profile code

// set values
export const setInitialValues = (dispatch, fields) => {
  dispatch(changeLinkedInProfile(fields.linkedInProfile));
  dispatch(changeGithubProfile(fields.githubProfile));
  dispatch(changeStackoverflowProfile(fields.stackoverflowProfile));
  dispatch(changeDribbleProfile(fields.dribbbleProfile));
  dispatch(changeBehanceProfile(fields.behanceProfile));
  dispatch(changePersonalProfile(fields.personalProfile));
  dispatch(changePrimaryRole(fields.primaryRole));
  dispatch(changeExperience(fields.yearsOfExperience));
  dispatch(changeSkills(fields.skillsCount));
  // dispatch(changeBrief(fields.newBrief, fields.professionalSummary));
};

export const setTouchProfessionalDetails = (dispatch, key, response) => {
  const { data } = response;
  const fieldData = {
    linkedInProfile: get(data, 'linkedInUrl'),
    githubProfile: get(data, 'gitHubUrl'),
    stackoverflowProfile: get(data, 'stackOverFlowUrl'),
    dribbbleProfile: get(data, 'dribbbleUrl'),
    behanceProfile: get(data, 'behanceUrl'),
    personalProfile: get(data, 'portfolioUrl'),
    primaryRole: get(data, 'primaryRole'),
    yearsOfExperience: get(data, 'yearsOfExperience'),
    skillsCount: get(data, 'skills', []).length,
    skillsRating: get(data, 'skills', []).length,
  };

  Object.keys(fieldData).forEach(fieldKey => {
    if (fieldData[fieldKey]) dispatch(touch(key, fieldKey));
  });
};
