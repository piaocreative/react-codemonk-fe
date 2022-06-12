/*
 * PayoutDetailsPage Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import produce from 'immer';
import { CHANGE_BANKNAME, CHANGE_ACCOUNT_NUMBER, CHANGE_BANK_CODE } from './constants';

// The initial state of the App
export const initialState = {
  bankName: '',
  bankAccountNumber: '',
  bankCode: '',
};

const personalReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_BANKNAME:
        draft.bankName = action.payload;
        break;
      case CHANGE_ACCOUNT_NUMBER:
        draft.bankAccountNumber = action.payload;
        break;
      case CHANGE_BANK_CODE:
        draft.bankCode = action.payload;
        break;
      default:
    }
    return draft;
  });

export default personalReducer;
