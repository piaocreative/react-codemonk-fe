import produce from 'immer';

import { CHANGE_TOKEN, CHANGE_PASSWORD, CHANGE_CONFIRM_PASSWORD } from './constants';
export const initialState = {
  token: '',
  password: '',
  confirmPassword: '',
};

const talentLoginReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    if (action.type === CHANGE_TOKEN) {
      draft.token = action.payload;
    }
    if (action.type === CHANGE_PASSWORD) {
      draft.password = action.payload;
    }
    if (action.type === CHANGE_CONFIRM_PASSWORD) {
      draft.confirmPassword = action.payload;
    }
  });

export default talentLoginReducer;
