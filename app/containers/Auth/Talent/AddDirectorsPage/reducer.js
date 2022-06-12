import produce from 'immer';

import { CHANGE_DIRECTOR_ARRAY, CHANGE_TOTAL_SHARES } from './constants';
export const initialState = {
  directorsArray: [],
  totalShares: 0,
};

const addDirectorsReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    if (action.type === CHANGE_DIRECTOR_ARRAY) {
      draft.directorsArray = action.data;
    } else if (action.type === CHANGE_TOTAL_SHARES) {
      draft.totalShares = action.data;
    }
  });

export default addDirectorsReducer;
