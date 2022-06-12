import produce from 'immer';

import {
  RESET_DATA,
  CHANGE_LINKEDIN_PROFILE,
  CHANGE_GITHUB_PROFILE,
  CHANGE_STACKOVERFLOW_PROFILE,
  CHANGE_DRIBBBLE_PROFILE,
  CHANGE_BEHANCE_PROFILE,
  CHANGE_PERSONAL_PROFILE,
  CHANGE_PRIMARY_ROLE,
  CHANGE_EXPERIENCE,
  RESET_PROFESSIONAL_DETAILS,
} from './constants';

export const initialState = {
  brief: '',
  linkedInProfile: '',
  githubProfile: '',
  stackoverflowProfile: '',
  dribbbleProfile: '',
  behanceProfile: '',
  personalProfile: '',
  primaryRole: '',
  yearsOfExperience: '',
  skills: [],
};

const professionalReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_DATA:
        draft.linkedInProfile = '';
        break;
      case CHANGE_LINKEDIN_PROFILE:
        draft.linkedInProfile = action.payload;
        break;
      case CHANGE_GITHUB_PROFILE:
        draft.githubProfile = action.payload;
        break;
      case CHANGE_STACKOVERFLOW_PROFILE:
        draft.stackoverflowProfile = action.payload;
        break;
      case CHANGE_DRIBBBLE_PROFILE:
        draft.dribbbleProfile = action.payload;
        break;
      case CHANGE_BEHANCE_PROFILE:
        draft.behanceProfile = action.payload;
        break;
      case CHANGE_PERSONAL_PROFILE:
        draft.personalProfile = action.payload;
        break;
      case CHANGE_PRIMARY_ROLE:
        draft.primaryRole = action.payload;
        break;
      case CHANGE_EXPERIENCE:
        draft.yearsOfExperience = action.payload;
        break;
      case RESET_PROFESSIONAL_DETAILS:
        draft.linkedInProfile = '';
        draft.githubProfile = '';
        draft.stackoverflowProfile = '';
        draft.dribbbleProfile = '';
        draft.behanceProfile = '';
        draft.personalProfile = '';
        draft.primaryRole = '';
        draft.yearsOfExperience = '';

        break;
      default:
    }
  });

export default professionalReducer;
