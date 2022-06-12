/*
 * Dashboard Reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_INVITE } from './constants';

// The initial state of the App
export const initialState = {
  inviteMails: [{ name: '', email: '' }],
};

const homeReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    if (action.type === CHANGE_INVITE) {
      draft.inviteMails = action.payload;
    }
  });

export default homeReducer;
