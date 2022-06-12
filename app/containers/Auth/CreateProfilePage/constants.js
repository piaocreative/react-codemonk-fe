/*
 * CreateProfilePage Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const key = 'createProfile';

export const CHANGE_REGISTRATION_TYPE = 'CodeMonk/CreateProfilePage/CHANGE_REGISTRATION_TYPE';

export const CHANGE_FIRSTNAME = 'CodeMonk/CreateProfilePage/CHANGE_FIRSTNAME';
export const CHANGE_LASTNAME = 'CodeMonk/CreateProfilePage/CHANGE_LASTNAME';
export const CHANGE_COUNTRYCODE = 'CodeMonk/CreateProfilePage/CHANGE_COUNTRYCODE';
export const CHANGE_PHONENUMBER = 'CodeMonk/CreateProfilePage/CHANGE_PHONENUMBER';
export const CHANGE_POSTCODE = 'CodeMonk/CreateProfilePage/CHANGE_POSTCODE';
export const CHANGE_ADDRESSLINEONE = 'CodeMonk/CreateProfilePage/CHANGE_ADDRESSLINEONE';
export const CHANGE_ADDRESSLINETWO = 'CodeMonk/CreateProfilePage/CHANGE_ADDRESSLINETWO';
export const CHANGE_CITY = 'CodeMonk/CreateProfilePage/CHANGE_CITY';
export const CHANGE_COUNTRY = 'CodeMonk/CreateProfilePage/CHANGE_COUNTRY';
export const CHANGE_TIMEZONE = 'CodeMonk/CreateProfilePage/CHANGE_TIMEZONE';

export const CHANGE_COMPANY_DETAILS = 'CodeMonk/CreateProfilePage/CHANGE_COMPANY_DETAILS';

export const SAVE_FOR_LATER = 'CodeMonk/CreateProfilePage/SAVE_FOR_LATER';
export const SUBMIT_CREATE_PROFILE_FORM = 'CodeMonk/CreateProfilePage/SUBMIT_CREATE_PROFILE_FORM';

export const registrationTypes = [
  {
    id: 1,
    label: 'Individual',
    isChecked: false,
    value: 'individual',
    groupName: 'registrationType',
  },
  {
    id: 2,
    label: 'Company',
    isChecked: false,
    value: 'company',
    groupName: 'registrationType',
  },
];
