import produce from 'immer';

import { CHANGE_EMAIL, CHANGE_PASSWORD } from './constants';
export const initialState = {
  email: '',
  password: '',
};

const talentLoginReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    if (action.type === CHANGE_EMAIL) {
      draft.email = action.payload;
    }
    if (action.type === CHANGE_PASSWORD) {
      draft.password = action.payload;
    }
  });

export default talentLoginReducer;
