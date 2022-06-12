/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { reducer as formReducer } from 'redux-form/immutable';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducers(injectedReducers = {}) {
  return combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    form: formReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
}
