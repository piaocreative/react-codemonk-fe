import produce from 'immer';

import { CHANGE_OLD_PASSWORD, CHANGE_PASSWORD, CHANGE_CONFIRM_PASSWORD } from './constants';
export const initialState = {
  oldPassword: '',
  password: '',
  confirmPassword: '',
};

const updatePasswordReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    if (action.type === CHANGE_OLD_PASSWORD) {
      draft.oldPassword = action.payload;
    }
    if (action.type === CHANGE_PASSWORD) {
      draft.password = action.payload;
    }
    if (action.type === CHANGE_CONFIRM_PASSWORD) {
      draft.confirmPassword = action.payload;
    }
  });

export default updatePasswordReducer;
