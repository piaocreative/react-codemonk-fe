import produce from 'immer';

import {
  CHANGE_EDUCATION_DETAILS,
  CHANGE_CERTIFICATE_DETAILS,
  CHANGE_COLLEGE,
  CHANGE_COUNTRY,
  CHANGE_START_YEAR,
  CHANGE_END_YEAR,
  CHANGE_DEGREE_TITLE,
  CHANGE_DEGREE_LEVEL,
  CHANGE_CERTIFICATE_NAME,
  CHANGE_ORGANISATION,
  CHANGE_DATE_OBTAINED,
  CHANGE_CERTIFICATE_URL,
} from './constants';

export const initialState = {
  educationDetails: [],
  certificateDetails: [],
  collegeName: '',
  country: '',
  startYear: '',
  endYear: '',
  degreeTitle: '',
  degreeLevel: '',
  name: '',
  issuedBy: '',
  dateObtained: '',
  certificateId: '',
};

const qualificationReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EDUCATION_DETAILS:
        draft.educationDetails = action.payload;
        break;
      case CHANGE_CERTIFICATE_DETAILS:
        draft.certificateDetails = action.payload;
        break;
      case CHANGE_COLLEGE:
        draft.collegeName = action.payload;
        break;
      case CHANGE_COUNTRY:
        draft.country = action.payload;
        break;
      case CHANGE_START_YEAR:
        draft.startYear = action.payload;
        break;
      case CHANGE_END_YEAR:
        draft.endYear = action.payload;
        break;
      case CHANGE_DEGREE_TITLE:
        draft.degreeTitle = action.payload;
        break;
      case CHANGE_DEGREE_LEVEL:
        draft.degreeLevel = action.payload;
        break;
      case CHANGE_CERTIFICATE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_ORGANISATION:
        draft.issuedBy = action.payload;
        break;
      case CHANGE_DATE_OBTAINED:
        draft.dateObtained = action.payload;
        break;
      case CHANGE_CERTIFICATE_URL:
        draft.certificateId = action.payload;
        break;
      default:
    }
    return draft;
  });
export default qualificationReducer;
