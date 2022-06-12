/*
 * EnterPhonePage Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const key = 'enterPhonePageForm';
export const CHANGE_COUNTRYCODE = 'CodeMonk/EnterPhonePage/CHANGE_COUNTRYCODE';
export const CHANGE_PHONENUMBER = 'CodeMonk/EnterPhonePage/CHANGE_PHONENUMBER';
export const SUBMIT_ENTER_PHONE_PAGE_FORM = 'CodeMonk/EnterPhonePage/SUBMIT_ENTER_PHONE_PAGE_FORM';
