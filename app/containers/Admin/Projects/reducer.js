import produce from 'immer';

import { CHANGE_PROJECT_STATUS } from './constants';
export const initialState = {
  status: '',
};

const addTaletnsReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    if (action.type === CHANGE_PROJECT_STATUS) {
      draft.status = action.data;
    }
  });

export default addTaletnsReducer;
