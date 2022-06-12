import { createSelector } from 'reselect';
import { initialState } from './reducer';

const talentLogin = state => state.talentLogin || initialState;

const makeSelectEmail = () =>
  createSelector(
    talentLogin,
    formState => formState.email,
  );

const makeSelectPassword = () =>
  createSelector(
    talentLogin,
    formState => formState.password,
  );
export { talentLogin, makeSelectEmail, makeSelectPassword };
