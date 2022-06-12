import produce from 'immer';

import {
  CHANGE_PROJECT,
  CHANGE_NAME,
  CHANGE_URL,
  CHANGE_DESCRIPTION,
  CHANGE_ROLE,
  CHANGE_EMPLOYER,
  CHANGE_INDUSTRY,
  CHANGE_EMPLOYMENT_TYPE,
  CHANGE_SKILLS,
} from './constants';
export const initialState = {
  projects: [],
  name: '',
  url: '',
  description: '',
  role: '',
  employer: '',
  industry: '',
  employmentType: '',
  skills: [],
};

const projectsReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_PROJECT:
        draft.projects = [...action.payload].map(e => {
          e.skills = [...(e.skills || [])];
          e.skillsCount = [...(e.skillsCount || [])];
          e.skillsRating = [...(e.skillsRating || [])];
          return e;
        });
        break;
      case CHANGE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_URL:
        draft.url = action.payload;
        break;
      case CHANGE_DESCRIPTION:
        draft.description = action.payload;
        break;
      case CHANGE_ROLE:
        draft.role = action.payload;
        break;
      case CHANGE_EMPLOYER:
        draft.employer = action.payload;
        break;
      case CHANGE_INDUSTRY:
        draft.industry = action.payload;
        break;
      case CHANGE_EMPLOYMENT_TYPE:
        draft.employmentType = action.payload;
        break;
      case CHANGE_SKILLS:
        draft.skills = action.payload;
        break;
      default:
    }
    return draft;
  });
export default projectsReducer;
