/*
 * Dashboard Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_INVITE = 'codemonk/HomePage/CHANGE_INVITE';
export const SUBMIT_INVITE_MAILS = 'codemonk/HomePage/SUBMIT_INVITE_MAILS';
export const SUBMIT_ADD_TALENT = 'codemonk/HomePage/SUBMIT_ADD_TALENT';

export const key = 'homepageInviteForm';
export const MINIMUM_INVITE_ROWS = 5;
