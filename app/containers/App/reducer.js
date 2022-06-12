/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR, RESET, VERIFY, VERIFY_PHONE_OTP, LOADING, POP_UP_SAGA } from './constants';
import { CHANGE_SWITCH_STATUS } from '../Admin/Talents/constants';
export const initialState = {
  loading: false,
  responseError: false,
  responseSuccess: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  popUpSaga: false,
  switchContainerStatus: false,
};

const appReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.responseSuccess = false;
        draft.responseError = false;
        draft.userData.repositories = false;
        break;
      case CHANGE_SWITCH_STATUS:
        draft.switchContainerStatus = action.payload;
        break;
      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.responseSuccess = true;
        draft.responseError = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.responseSuccess = false;
        draft.responseError = true;
        break;

      case VERIFY:
      case VERIFY_PHONE_OTP:
        draft.loading = true;
        draft.error = false;
        break;

      case LOADING:
        draft.loading = action.payload;
        break;

      case RESET:
        draft.loading = false;
        draft.responseSuccess = false;
        draft.responseError = false;
        break;

      case POP_UP_SAGA:
        draft.popUpSaga = action.payload;
        break;

      default:
    }
  });

export default appReducer;
