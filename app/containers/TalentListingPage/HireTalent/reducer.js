import produce from 'immer';

import { CHANGE_INTERVIEW_SLOT } from './constants';
export const initialState = {
  interviewSlotArray: [''],
};

const HireTalentFormReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    if (action.type === CHANGE_INTERVIEW_SLOT) {
      draft.interviewSlotArray = action.data;
    }
  });

export default HireTalentFormReducer;
