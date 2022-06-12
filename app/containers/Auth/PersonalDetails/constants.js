/*
 * PersonalDetails Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_FIRSTNAME = 'CodeMonk/PersonalDetails/CHANGE_FIRSTNAME';
export const CHANGE_LASTNAME = 'CodeMonk/PersonalDetails/CHANGE_LASTNAME';
export const CHANGE_COUNTRYCODE = 'CodeMonk/PersonalDetails/CHANGE_COUNTRYCODE';
export const CHANGE_PHONENUMBER = 'CodeMonk/PersonalDetails/CHANGE_PHONENUMBER';
export const CHANGE_DOB = 'CodeMonk/PersonalDetails/CHANGE_DOB';
export const CHANGE_GENDER = 'CodeMonk/PersonalDetails/CHANGE_GENDER';
export const CHANGE_POSTCODE = 'CodeMonk/PersonalDetails/CHANGE_POSTCODE';
export const CHANGE_ADDRESSLINEONE = 'CodeMonk/PersonalDetails/CHANGE_ADDRESSLINEONE';
export const CHANGE_ADDRESSLINETWO = 'CodeMonk/PersonalDetails/CHANGE_ADDRESSLINETWO';
export const CHANGE_CITY = 'CodeMonk/PersonalDetails/CHANGE_CITY';
export const CHANGE_COUNTRY = 'CodeMonk/PersonalDetails/CHANGE_COUNTRY';
export const CHANGE_STATE = 'CodeMonk/PersonalDetails/CHANGE_STATE';
export const CHANGE_TIMEZONE = 'CodeMonk/PersonalDetails/CHANGE_TIMEZONE';
export const CHANGE_LANGUAGE = 'CodeMonk/PersonalDetails/CHANGE_LANGUAGE';

export const CHANGE_LINKEDIN_PROFILE = 'CHANGE_LINKEDIN_PROFILE';
export const CHANGE_GITHUB_PROFILE = 'CHANGE_GITHUB_PROFILE';
export const CHANGE_STACKOVERFLOW_PROFILE = 'CHANGE_STACKOVERFLOW_PROFILE';
export const CHANGE_DRIBBBLE_PROFILE = 'CHANGE_DRIBBBLE_PROFILE';
export const CHANGE_BEHANCE_PROFILE = 'CHANGE_BEHANCE_PROFILE';
export const CHANGE_PERSONAL_PROFILE = 'CHANGE_PERSONAL_PROFILE';

export const CHANGE_PRIMARY_ROLE = 'CHANGE_PRIMARY_ROLE';
export const CHANGE_EXPERIENCE = 'CHANGE_EXPERIENCE';
export const CHANGE_VERIFIED_STATUS = 'CHANGE_VERIFIED_STATUS';

export const SAVE_FOR_LATER = 'CodeMonk/PersonalDetails/SAVE_FOR_LATER';
export const SUBMIT_PERSONAL_DETAILS_FORM = 'CodeMonk/PersonalDetails/SUBMIT_PERSONAL_DETAILS_FORM';
export const EDIT_PERSONAL_DETAILS_FORM = 'CodeMonk/PersonalDetails/EDIT_PERSONAL_DETAILS_FORM';

export const key = 'personalDetails';
