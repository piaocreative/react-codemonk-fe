/*
 * PayoutDetailsPage Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_BANKNAME = 'CodeMonk/PayoutDetailsPage/CHANGE_BANKNAME';
export const CHANGE_ACCOUNT_NUMBER = 'CodeMonk/PayoutDetailsPage/CHANGE_ACCOUNT_NUMBER';
export const CHANGE_BANK_CODE = 'CodeMonk/PayoutDetailsPage/CHANGE_BANK_CODE';
export const SAVE_FOR_LATER = 'CodeMonk/PayoutDetailsPage/SAVE_FOR_LATER';
export const SUBMIT_PAYOUT_DETAILS_FORM = 'CodeMonk/PayoutDetailsPage/SUBMIT_PAYOUT_DETAILS_FORM';
export const key = 'PayoutDetails';
