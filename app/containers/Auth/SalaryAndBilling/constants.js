/*
 * SalaryAndBilling Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_EMPLOYMENT_TYPE = 'CodeMonk/SalaryAndBilling/CHANGE_EMPLOYMENT_TYPE';
export const CHANGE_ANNUAL_RATE_CURRENCY = 'CodeMonk/SalaryAndBilling/CHANGE_ANNUAL_RATE_CURRENCY';
export const CHANGE_ANNUAL_RATE = 'CodeMonk/SalaryAndBilling/CHANGE_ANNUAL_RATE';
export const CHANGE_HOURLY_RATE_CURRENCY = 'CodeMonk/SalaryAndBilling/CHANGE_HOURLY_RATE_CURRENCY';
export const CHANGE_HOURLY_RATE = 'CodeMonk/SalaryAndBilling/CHANGE_HOURLY_RATE';
export const CHANGE_BILL_TYPE = 'CodeMonk/SalaryAndBilling/CHANGE_BILL_TYPE';
export const CHANGE_COMPANY_NAME = 'CodeMonk/SalaryAndBilling/CHANGE_COMPANY_NAME';
export const CHANGE_COMPANY_REGISTRATION_NUMBER = 'CodeMonk/SalaryAndBilling/CHANGE_COMPANY_REGISTRATION_NUMBER';
export const CHANGE_COMPANY_WEBSITE = 'CodeMonk/SalaryAndBilling/CHANGE_COMPANY_WEBSITE';
export const CHANGE_COMPANY_VAT = 'CodeMonk/SalaryAndBilling/CHANGE_COMPANY_VAT';
export const CHANGE_COMPANY_LINE1 = 'CodeMonk/SalaryAndBilling/CHANGE_COMPANY_LINE1';
export const CHANGE_COMPANY_LINE2 = 'CodeMonk/SalaryAndBilling/CHANGE_COMPANY_LINE2';
export const CHANGE_COMPANY_COUNTRY = 'CodeMonk/SalaryAndBilling/CHANGE_COMPANY_COUNTRY';
export const CHANGE_COMPANY_POSTCODE = 'CodeMonk/SalaryAndBilling/CHANGE_COMPANY_POSTCODE';
export const CHANGE_COMPANY_CITY = 'CodeMonk/SalaryAndBilling/CHANGE_COMPANY_CITY';
export const CHANGE_COMPANY_STATE = 'CodeMonk/SalaryAndBilling/CHANGE_COMPANY_STATE';

export const CHANGE_INDEMNITY_CURRENCY = 'CodeMonk/SalaryAndBilling/CHANGE_INDEMNITY_CURRENCY';
export const CHANGE_INDEMNITY = 'CodeMonk/SalaryAndBilling/CHANGE_INDEMNITY';
export const CHANGE_PUBLIC_LIABILITY_CURRENCY = 'CodeMonk/SalaryAndBilling/CHANGE_PUBLIC_LIABILITY_CURRENCY';
export const CHANGE_PUBLIC_LIABILITY = 'CodeMonk/SalaryAndBilling/CHANGE_PUBLIC_LIABILITY';
export const CHANGE_EMPLOYEE_LIABILITY_CURRENCY = 'CodeMonk/SalaryAndBilling/CHANGE_EMPLOYEE_LIABILITY_CURRENCY';
export const CHANGE_EMPLOYEE_LIABILITY = 'CodeMonk/SalaryAndBilling/CHANGE_EMPLOYEE_LIABILITY';

export const SAVE_FOR_LATER = 'CodeMonk/SalaryAndBilling/SAVE_FOR_LATER';
export const SUBMIT_SALARYBILL_FORM = 'CodeMonk/SalaryAndBilling/SUBMIT_SALARYBILL_FORM';

export const key = 'salaryAndBilling';

export const UPDATE_SUCCESS_MESSAGE = 'Updated Successfully.';
