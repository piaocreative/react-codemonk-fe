import request from 'utils/request';
import * as utilFunctions from '../utils';

jest.mock('utils/request');
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('check for functions', () => {
  intializeSetup();

  const maxQuoteFileSize = 'File size is greater than 20MB';

  test('test checkIfQuoteFile ', () => {
    const checkIfQuoteFile = jest.spyOn(utilFunctions, 'checkIfQuoteFile');
    const output = checkIfQuoteFile({ size: 10500, type: 'application/pdf' }, 20971520, maxQuoteFileSize);
    expect(output).toEqual(0);
  });

  test('test checkIfQuoteFile ', () => {
    const checkIfQuoteFile = jest.spyOn(utilFunctions, 'checkIfQuoteFile');
    const output = checkIfQuoteFile({ size: 5242890, type: 'txt/txt' }, 20971520, maxQuoteFileSize);
    expect(output).toEqual('PDF, DOCX, ZIP, RAR Only');
  });

  test('test checkIfQuoteFile ', () => {
    const checkIfQuoteFile = jest.spyOn(utilFunctions, 'checkIfQuoteFile');
    const output = checkIfQuoteFile({ size: 52428900, type: 'image/png' }, 20971520, maxQuoteFileSize);
    expect(output).toEqual('File size is greater than 20MB');
  });
});
