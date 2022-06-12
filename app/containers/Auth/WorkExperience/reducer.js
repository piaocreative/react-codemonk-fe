import produce from 'immer';

import {
  CHANGE_EXPERIENCE,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  CHANGE_EMPLOYER,
  CHANGE_COUNTRY,
  CHANGE_ROLE,
  CHANGE_EMPLOYMENT_TYPE,
  CHANGE_SHORT_DESCRIPTION,
} from './constants';

export const initialState = {
  experiences: [],
  jobTitle: '',
  employmentType: '',
  employer: '',
  country: '',
  startDate: '',
  endDate: '',
  shortDescription: '',
};

const experiencesReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EXPERIENCE:
        draft.experiences = action.payload;
        break;
      case CHANGE_ROLE:
        draft.jobTitle = action.payload;
        break;
      case CHANGE_EMPLOYMENT_TYPE:
        draft.employmentType = action.payload;
        break;
      case CHANGE_EMPLOYER:
        draft.employer = action.payload;
        break;
      case CHANGE_COUNTRY:
        draft.country = action.payload;
        break;
      case CHANGE_START_DATE:
        draft.startDate = action.payload;
        break;
      case CHANGE_END_DATE:
        draft.endDate = action.payload;
        break;
      case CHANGE_SHORT_DESCRIPTION:
        draft.shortDescription = action.payload;
        break;
      default:
    }
    return draft;
  });
export default experiencesReducer;
