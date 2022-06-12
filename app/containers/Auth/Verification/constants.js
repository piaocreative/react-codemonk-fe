/*
 * Sign Up Page Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_OTP = 'CodeMonk/Verification/CHANGE_OTP';
export const VERIFY_OTP = 'CodeMonk/Verification/VERIFY_OTP';
export const RESEND_OTP = 'CodeMonk/Verification/RESEND_OTP';
export const RESET_OTP = 'CodeMonk/Verification/RESET_OTP';
