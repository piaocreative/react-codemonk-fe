import produce from 'immer';

import { CHANGE_CERTIFICATE_DETAILS } from './constants';
export const initialState = {
  certificate: [],
};

const certificateDetailsReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    if (action.type === CHANGE_CERTIFICATE_DETAILS) {
      draft.certificate = action.payload;
    }
  });

export default certificateDetailsReducer;
