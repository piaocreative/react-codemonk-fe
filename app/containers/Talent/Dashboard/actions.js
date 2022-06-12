/*
 * Dashboard Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { CHANGE_INVITE, SUBMIT_INVITE_MAILS, SUBMIT_ADD_TALENT } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} payload The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function changeInvite(payload) {
  return {
    type: CHANGE_INVITE,
    payload,
  };
}
export function submitInviteMails() {
  return {
    type: SUBMIT_INVITE_MAILS,
  };
}
export function submitAddTalentsForm(data) {
  return {
    type: SUBMIT_ADD_TALENT,
    data,
  };
}
