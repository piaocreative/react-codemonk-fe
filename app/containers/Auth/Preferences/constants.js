/*
 * Preferences Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const INDUSTRIES = 'CodeMonk/Preferences/INDUSTRIES';
export const COMPANY_CULTURES = 'CodeMonk/Preferences/COMPANY_CULTURES';
export const COMPANY_TYPE = 'CodeMonk/Preferences/COMPANY_TYPE';
export const PREFERRED_PROJECT_DURATION = 'CodeMonk/Preferences/PREFERRED_PROJECT_DURATION';
export const TEAM_PREFERENCE = 'CodeMonk/Preferences/TEAM_PREFERENCE';
export const ASSIGNMENTS = 'CodeMonk/Preferences/ASSIGNMENTS';
export const WORKPREFERENCE = 'CodeMonk/Preferences/WORKPREFERENCE';
export const AVAILABILITY = 'CodeMonk/Preferences/AVAILABILITY';
export const UNAVAILABILITY = 'CodeMonk/Preferences/UNAVAILABILITY';
export const SUBMIT_PREFERENCE_DETAILS_FORM = 'CodeMonk/Preferences/SUBMIT_PREFERENCE_DETAILS_FORM';
