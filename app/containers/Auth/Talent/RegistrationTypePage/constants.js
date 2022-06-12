/*
 * RegistrationTypePage Constants
 */

export const key = 'talentRegistrationType';
export const CHANGE_REGISTRATION_TYPE = 'CodeMonk/RegistrationTypePage/CHANGE_REGISTRATION_TYPE';
export const SAVE_FOR_LATER = 'CodeMonk/RegistrationTypePage/SAVE_FOR_LATER';
export const SUBMIT_REGISTRATION_TYPE = 'CodeMonk/RegistrationTypePage/SUBMIT_REGISTRATION_TYPE';

export const registrationTypes = [
  {
    id: 1,
    label: 'Freelancer',
    isChecked: false,
    value: 'freelancer',
    groupName: 'registrationType',
  },
  {
    id: 2,
    label: 'Digital Agency',
    isChecked: false,
    value: 'agency',
    groupName: 'registrationType',
  },
];
