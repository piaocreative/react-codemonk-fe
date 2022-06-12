/*
 * ForgotPasswordPage Reducer
 */
import produce from 'immer';
import { CHANGE_EMAIL } from './constants';

// The initial state of the App
export const initialState = { email: '' };

const forgotPasswordReducer = (state = initialState, action = '') =>
  produce(state, draft => {
    if (action.type === CHANGE_EMAIL) {
      draft.email = action.payload;
    }
  });

export default forgotPasswordReducer;
