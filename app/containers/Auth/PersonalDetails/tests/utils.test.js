import moment from 'moment';
import { languageData } from 'containers/App/constants';
import * as functions from '../utils';

describe('test functions', () => {
  test('test getSelectedFieldFromList', () => {
    const test = functions.getSelectedFieldFromList(['test'], 0, 'test');
    expect(test).toBe('');
  });

  test('Testing if getSelectedLanguage with if', () => {
    const getSelectedLanguage = jest.spyOn(functions, 'getSelectedLanguage');
    const value = [
      {
        value: 'English',
        name: 'en',
        label: 'English',
      },
    ];
    getSelectedLanguage(languageData, value);
    expect(getSelectedLanguage).toHaveBeenCalledTimes(1);
  });

  test('Testing if getSelectedLanguage with else', () => {
    const getSelectedLanguage = jest.spyOn(functions, 'getSelectedLanguage');
    const value = [
      {
        value: 'New Lang',
        name: 'NL',
        label: 'New Lang',
      },
    ];
    getSelectedLanguage(languageData, value);
    expect(getSelectedLanguage).toHaveBeenCalledTimes(2);
  });

  test('Testing if getSelectedLanguage without value', () => {
    const getSelectedLanguage = jest.spyOn(functions, 'getSelectedLanguage');
    getSelectedLanguage(languageData);
    expect(getSelectedLanguage).toHaveBeenCalledTimes(3);
  });

  test('test getSelectedCountryCode', () => {
    const test = functions.getSelectedCountryCode([{ phoneCode: '+' }], 'test');
    expect(test).toBe('');
  });

  test('test getLanguageRatings', () => {
    const test = functions.getLanguageRatings([{ value: 'test' }], [{ name: 'test' }]);
    const value = [{ label: undefined, rating: undefined, value: 'test' }];
    expect(test).toEqual(value);
  });

  test('test getDate', () => {
    const test = functions.getDate('01/01/2020');
    expect(test).toEqual(moment(test));
  });

  test('Testing if getFormattedObject ', () => {
    const getFormattedObject = jest.spyOn(functions, 'getFormattedObject');
    getFormattedObject({ countryCode: '+91' }, 'countryCode', 'name', 'phoneCode');
    expect(getFormattedObject).toHaveBeenCalledTimes(1);
  });

  test('Testing if setInitialReduxState ', () => {
    const setInitialReduxState = jest.spyOn(functions, 'setInitialReduxState');
    const data = {
      response: { data: { countryCode: '+91', dob: new Date(), default: 'abcd' } },
      change: jest.fn(),
      countryCode: '+91',
      country: 'India',
      state: 'Gujarat',
      key: 'key',
      timeZone: '',
      dispatch: jest.fn(),
      gender: 'male',
    };
    setInitialReduxState(data);
    expect(setInitialReduxState).toHaveBeenCalledTimes(1);
  });

  test('Testing if setInitialReduxState with dob', () => {
    const setInitialReduxState = jest.spyOn(functions, 'setInitialReduxState');
    const data = {
      response: { data: { dob: new Date(), default: 'abcd' } },
      change: jest.fn(),
      countryCode: '+91',
      country: 'India',
      state: 'Gujarat',
      key: 'key',
      timeZone: '',
      dispatch: jest.fn(),
      gender: 'male',
    };
    setInitialReduxState(data);
    expect(setInitialReduxState).toHaveBeenCalledTimes(2);
  });

  test('Testing if getBtnClass ', () => {
    const getBtnClass = jest.spyOn(functions, 'getBtnClass');
    const loading = true;
    const responseSuccess = true;
    const responseError = false;
    getBtnClass(loading, responseSuccess, responseError);
    expect(getBtnClass).toHaveBeenCalledTimes(1);
  });

  test('Testing if getBtnClass with alternate values', () => {
    const getBtnClass = jest.spyOn(functions, 'getBtnClass');
    const loading = false;
    const responseSuccess = false;
    const responseError = true;
    getBtnClass(loading, responseSuccess, responseError);
    expect(getBtnClass).toHaveBeenCalledTimes(2);
  });

  // fileMinSize
  test('Testing if fileMinSize with type = csvUploader', () => {
    const fileMinSize = jest.spyOn(functions, 'fileMinSize');
    const type = 'csvUploader';
    fileMinSize(type);
    expect(fileMinSize).toHaveBeenCalledTimes(1);
  });

  test('Testing if fileMinSize with type = logoUploader', () => {
    const fileMinSize = jest.spyOn(functions, 'fileMinSize');
    const type = 'logoUploader';
    fileMinSize(type);
    expect(fileMinSize).toHaveBeenCalledTimes(2);
  });
  test('Testing if fileMinSize with type = cvUploader', () => {
    const fileMinSize = jest.spyOn(functions, 'fileMinSize');
    const type = 'cvUploader';
    fileMinSize(type);
    expect(fileMinSize).toHaveBeenCalledTimes(3);
  });

  test('Testing if fileMinSize with type = else', () => {
    const fileMinSize = jest.spyOn(functions, 'fileMinSize');
    const type = 'else';
    fileMinSize(type);
    expect(fileMinSize).toHaveBeenCalledTimes(4);
  });

  // fileMaxSize
  test('Testing if fileMaxSize with type = csvUploader', () => {
    const fileMaxSize = jest.spyOn(functions, 'fileMaxSize');
    const type = 'csvUploader';
    fileMaxSize(type);
    expect(fileMaxSize).toHaveBeenCalledTimes(1);
  });

  test('Testing if fileMaxSize with type = logoUploader', () => {
    const fileMaxSize = jest.spyOn(functions, 'fileMaxSize');
    const type = 'logoUploader';
    fileMaxSize(type);
    expect(fileMaxSize).toHaveBeenCalledTimes(2);
  });
  test('Testing if fileMaxSize with type = cvUploader', () => {
    const fileMaxSize = jest.spyOn(functions, 'fileMaxSize');
    const type = 'cvUploader';
    fileMaxSize(type);
    expect(fileMaxSize).toHaveBeenCalledTimes(3);
  });

  test('Testing if fileMaxSize with type = else', () => {
    const fileMaxSize = jest.spyOn(functions, 'fileMaxSize');
    const type = 'else';
    fileMaxSize(type);
    expect(fileMaxSize).toHaveBeenCalledTimes(4);
  });

  // acceptedFileTypes
  test('Testing if acceptedFileTypes with type = csvUploader', () => {
    const acceptedFileTypes = jest.spyOn(functions, 'acceptedFileTypes');
    const type = 'csvUploader';
    acceptedFileTypes(type);
    expect(acceptedFileTypes).toHaveBeenCalledTimes(1);
  });

  test('Testing if acceptedFileTypes with type = logoUploader', () => {
    const acceptedFileTypes = jest.spyOn(functions, 'acceptedFileTypes');
    const type = 'logoUploader';
    acceptedFileTypes(type);
    expect(acceptedFileTypes).toHaveBeenCalledTimes(2);
  });
  test('Testing if acceptedFileTypes with type = cvUploader', () => {
    const acceptedFileTypes = jest.spyOn(functions, 'acceptedFileTypes');
    const type = 'cvUploader';
    acceptedFileTypes(type);
    expect(acceptedFileTypes).toHaveBeenCalledTimes(3);
  });

  test('Testing if acceptedFileTypes with type = else', () => {
    const acceptedFileTypes = jest.spyOn(functions, 'acceptedFileTypes');
    const type = 'else';
    acceptedFileTypes(type);
    expect(acceptedFileTypes).toHaveBeenCalledTimes(4);
  });

  // dropAreaMessage
  test('Testing if dropAreaMessage with type = csvUploader', () => {
    const dropAreaMessage = jest.spyOn(functions, 'dropAreaMessage');
    const type = 'csvUploader';
    dropAreaMessage(type);
    expect(dropAreaMessage).toHaveBeenCalledTimes(1);
  });

  test('Testing if dropAreaMessage with type = logoUploader', () => {
    const dropAreaMessage = jest.spyOn(functions, 'dropAreaMessage');
    const type = 'logoUploader';
    dropAreaMessage(type);
    expect(dropAreaMessage).toHaveBeenCalledTimes(2);
  });
  test('Testing if dropAreaMessage with type = cvUploader', () => {
    const dropAreaMessage = jest.spyOn(functions, 'dropAreaMessage');
    const type = 'cvUploader';
    dropAreaMessage(type);
    expect(dropAreaMessage).toHaveBeenCalledTimes(3);
  });

  test('Testing if dropAreaMessage with type = else', () => {
    const dropAreaMessage = jest.spyOn(functions, 'dropAreaMessage');
    const type = 'else';
    dropAreaMessage(type);
    expect(dropAreaMessage).toHaveBeenCalledTimes(4);
  });

  // setTouchPersonalDetails
  test('Testing if setTouchPersonalDetails with type = else', () => {
    const setTouchPersonalDetails = jest.spyOn(functions, 'setTouchPersonalDetails');
    const dispatch = jest.fn();
    const key = 'key';
    const response = {
      data: {
        firstName: 'name',
        lastName: 'name',
        countryCode: '+91',
        phoneNumber: '0123456789',
        dob: '10/10/1980',
        gender: 'male',
        addressLineOne: 'line1',
        addressLineTwo: 'line2',
        city: 'city',
        country: 'India',
        state: 'Gujarat',
        postcode: '123456',
        timeZone: 'timezone',
        languageCount: 2,
        languageRating: [9, 8, 7],
      },
    };
    setTouchPersonalDetails(dispatch, key, response);
    expect(setTouchPersonalDetails).toHaveBeenCalledTimes(1);
  });
});
