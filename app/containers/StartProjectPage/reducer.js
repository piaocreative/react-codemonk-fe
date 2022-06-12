/*
 * StartProjectPage Reducer
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
import {
  CHANGE_PROJECTNAME,
  CHANGE_PROJECT_DESCRIPTION,
  WORKPROGRESS,
  CHANGE_PROJECTURL,
  UX_DESIGN,
  SOFTWARE_DEVELOPMENT,
  DEVELOPMENT_TEAM,
  DATA_AI_ML,
  GROWTH_HACKING,
  AGILE_COACH,
  CHANGE_OTHER,
  BUDGET,
  CHANGE_MESSAGE,
  PROJECT_SPEED,
  MANAGE_TEAM,
  RESET,
} from './constants';

// The initial state of the App
export const initialState = {
  name: '',
  description: '',
  buildStatus: '',
  projectUrl: '',
  lookingForDesign: [],
  lookingForSoftwareDevelopment: [],
  lookingForDevelopmentTeam: [],
  lookingForDataAiMl: [],
  lookingForGrowthHacking: false,
  lookingForAgileCoach: false,
  lookingForOther: '',
  budget: '',
  messageToPreSales: '',
  speed: '',
  teamManageType: '',
};

const startProjectReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_PROJECTNAME:
        draft.name = action.payload;
        break;
      case CHANGE_PROJECT_DESCRIPTION:
        draft.description = action.payload;
        break;
      case WORKPROGRESS:
        draft.buildStatus = action.payload;
        break;
      case CHANGE_PROJECTURL:
        draft.projectUrl = action.payload;
        break;
      case UX_DESIGN:
        draft.lookingForDesign = action.payload;
        break;
      case SOFTWARE_DEVELOPMENT:
        draft.lookingForSoftwareDevelopment = action.payload;
        break;
      case DEVELOPMENT_TEAM:
        draft.lookingForDevelopmentTeam = action.payload;
        break;
      case DATA_AI_ML:
        draft.lookingForDataAiMl = action.payload;
        break;
      case GROWTH_HACKING:
        draft.lookingForGrowthHacking = action.payload;
        break;
      case AGILE_COACH:
        draft.lookingForAgileCoach = action.payload;
        break;
      case CHANGE_OTHER:
        draft.lookingForOther = action.payload;
        break;
      case BUDGET:
        draft.budget = action.payload;
        break;
      case CHANGE_MESSAGE:
        draft.messageToPreSales = action.payload;
        break;
      case PROJECT_SPEED:
        draft.speed = action.payload;
        break;
      case MANAGE_TEAM:
        draft.teamManageType = action.payload;
        break;
      case RESET:
        return initialState;
      default:
    }
    return draft;
  });

export default startProjectReducer;
