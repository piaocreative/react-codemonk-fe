import produce from 'immer';
import { CHANGE_TALENT_STATUS } from './constants';

export const initialState = {
  status: '',
};

const updateTalentStatusReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    if (action.type === CHANGE_TALENT_STATUS) {
      draft.status = action.data;
    }
  });

export default updateTalentStatusReducer;
