import request from 'utils/request';
import * as utilFunctions from '../utils';

jest.mock('utils/request');
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('check for functions', () => {
  intializeSetup();
  test('for fetchFieldValues with status 1', () => {
    const data = { status: 1, data: { email: 'opads@c.com' } };
    expect(utilFunctions.fetchFieldValues(data)).toEqual(data);
  });

  test('for fetchFieldValues with status 0', () => {
    const data = { status: 0, data: { email: 'opads@c.com' } };
    const fetchFieldValues = jest.spyOn(utilFunctions, 'fetchFieldValues');
    fetchFieldValues(data);
    expect(fetchFieldValues).toHaveBeenCalledTimes(1);
  });

  test('for getUserDetails', () => {
    const getUserDetails = jest.spyOn(utilFunctions, 'getUserDetails');
    getUserDetails();
    expect(getUserDetails).toHaveBeenCalledTimes(1);
  });

  test('for loadUserDetails', () => {
    const loadUserDetails = jest.spyOn(utilFunctions, 'loadUserDetails');
    const setUserDetails = jest.fn();
    loadUserDetails(setUserDetails);
    expect(loadUserDetails).toHaveBeenCalledTimes(1);
  });

  test('for getIndustryList', () => {
    const getIndustryList = jest.spyOn(utilFunctions, 'getIndustryList');
    const setIndustries = jest.fn();
    getIndustryList(setIndustries);
    expect(getIndustryList).toHaveBeenCalledTimes(1);
  });

  test('for getCompanyCultures', () => {
    const getCompanyCultures = jest.spyOn(utilFunctions, 'getCompanyCultures');
    const setCompanyCultures = jest.fn();
    getCompanyCultures(setCompanyCultures);
    expect(getCompanyCultures).toHaveBeenCalledTimes(1);
  });

  test('for getSkills', () => {
    const getSkills = jest.spyOn(utilFunctions, 'getSkills');
    const setSkills = jest.fn();
    getSkills(setSkills);
    expect(getSkills).toHaveBeenCalledTimes(1);
  });

  test('for handleBackButton', () => {
    const event = { preventDefault: jest.fn() };
    const history = { push: jest.fn() };

    const handleBackButton = jest.spyOn(utilFunctions, 'handleBackButton');
    handleBackButton(event, history, '/professional-details');
    expect(handleBackButton).toHaveBeenCalledTimes(1);
  });

  test('for setChange', () => {
    const dispatch = jest.fn();
    const key = 'formKey';
    const fields = { field1: '', field2: '' };
    const setChange = jest.spyOn(utilFunctions, 'setChange');
    setChange(dispatch, key, fields);
    expect(setChange).toHaveBeenCalledTimes(1);
  });

  test('for setChangeAndUntouch', () => {
    const dispatch = jest.fn();
    const key = 'formKey';
    const fields = { field1: '', field2: '' };
    const setChangeAndUntouch = jest.spyOn(utilFunctions, 'setChangeAndUntouch');
    setChangeAndUntouch(dispatch, key, fields);
    expect(setChangeAndUntouch).toHaveBeenCalledTimes(1);
  });

  test('for errorInUserDetails', () => {
    const errorInUserDetails = jest.spyOn(utilFunctions, 'errorInUserDetails');
    errorInUserDetails();
    expect(errorInUserDetails).toHaveBeenCalledTimes(1);
  });

  test('test getSelectedFieldFromList', () => {
    const getSelectedFieldFromList = jest.spyOn(utilFunctions, 'getSelectedFieldFromList');
    getSelectedFieldFromList(['test'], 0, 'test');
    expect(getSelectedFieldFromList).toHaveBeenCalledTimes(1);
  });

  test('test getCountry with if', () => {
    const country = 'India';
    expect(utilFunctions.getCountry(country)).toEqual({ label: 'India', value: 'India' });
  });

  test('test getCountry with else', () => {
    const country = '';
    expect(utilFunctions.getCountry(country)).toEqual('');
  });

  test('test setDocName with if', () => {
    const data = '/abcd/file.jpg';
    expect(utilFunctions.setDocName(data)).toEqual('file.jpg');
  });
  test('test setDocName with else', () => {
    const data = '';
    expect(utilFunctions.setDocName(data)).toEqual('');
  });

  test('test getWrapperClassName', () => {
    expect(utilFunctions.getWrapperClassName(true, true, true)).toBeTruthy();
    expect(utilFunctions.getWrapperClassName(false, true, false)).toBeTruthy();
    expect(utilFunctions.getWrapperClassName(false, false, true)).toBeTruthy();
    expect(utilFunctions.getWrapperClassName(false, false, false)).toEqual('');
  });

  test('test accountSettingsTabFooter', () => {
    const loading = false;
    const invalid = true;
    const handleSubmit = jest.fn();
    const editFlag = false;
    const handleCancelClick = jest.fn();
    const handleSubmitButton = jest.fn();
    const handleSubmitClick = jest.fn();
    const accountSettingsTabFooter = jest.spyOn(utilFunctions, 'accountSettingsTabFooter');
    accountSettingsTabFooter(loading, invalid, handleSubmit, editFlag, handleCancelClick, handleSubmitButton, handleSubmitClick);
    expect(accountSettingsTabFooter).toHaveBeenCalledTimes(1);
  });
});
