import request from 'utils/request';
import * as functions from '../utils';

jest.mock('utils/request');

global.navigator.clipboard = {
  writeText: jest.fn(),
};

const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};
describe('test functions', () => {
  intializeSetup();

  test('Testing if getArrayLabels ', () => {
    const data = ['development', 'analysis'];
    const list = [
      {
        id: 1,
        label: 'Data analysis and modeling',
        isChecked: false,
        value: 'analysis',
      },
      {
        id: 2,
        label: 'AI/ML development',
        isChecked: false,
        value: 'development',
      },
    ];

    const getArrayLabels = jest.spyOn(functions, 'getArrayLabels');
    getArrayLabels(data, list);
    expect(getArrayLabels).toHaveBeenCalledTimes(1);
  });

  test('Testing if getLabel ', () => {
    const values = 'development';
    const list = [
      {
        id: 1,
        label: 'Data analysis and modeling',
        isChecked: false,
        value: 'analysis',
      },
      {
        id: 2,
        label: 'AI/ML development',
        isChecked: false,
        value: 'development',
      },
    ];
    const getLabel = jest.spyOn(functions, 'getLabel');
    getLabel(values, list);
    expect(getLabel).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkIfFileSize with if', () => {
    const file = { size: 1024, type: 'image/png' };
    const checkIfFileSize = jest.spyOn(functions, 'checkIfFileSize');
    checkIfFileSize(file);
    expect(checkIfFileSize).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkIfFileSize with file.size > MAX_FILE_SIZE', () => {
    const file = { size: 5342880, type: 'image/png' };
    const checkIfFileSize = jest.spyOn(functions, 'checkIfFileSize');
    checkIfFileSize(file);
    expect(checkIfFileSize).toHaveBeenCalledTimes(2);
  });

  test('Testing if checkIfFileSize with !includes(fileTypes, file.type)', () => {
    const file = { size: 10240, type: 'document/pdf' };
    const checkIfFileSize = jest.spyOn(functions, 'checkIfFileSize');
    checkIfFileSize(file);
    expect(checkIfFileSize).toHaveBeenCalledTimes(3);
  });
  test('Testing if checkIfFileSize with else', () => {
    const file = { size: 10240, type: 'image/png' };
    const checkIfFileSize = jest.spyOn(functions, 'checkIfFileSize');
    checkIfFileSize(file);
    expect(checkIfFileSize).toHaveBeenCalledTimes(4);
  });

  test('Testing if languageLabel ', () => {
    const item = { name: 'English', lable: 'English', code: 'en' };
    const languageLabel = jest.spyOn(functions, 'languageLabel');
    languageLabel(item);
    expect(languageLabel).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleLinkClick', () => {
    const link = 'http://app.codemonk.com/user/profile-view/5f0550f5f00078d7c97';
    const handleLinkClick = jest.spyOn(functions, 'handleLinkClick');
    handleLinkClick(link);
    expect(handleLinkClick).toHaveBeenCalledTimes(1);
  });
});
