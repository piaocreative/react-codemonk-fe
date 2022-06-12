/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectSuccess = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.responseSuccess,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.responseError,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectPopUpSaga = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.popUpSaga,
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectSuccess,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectPopUpSaga,
};
