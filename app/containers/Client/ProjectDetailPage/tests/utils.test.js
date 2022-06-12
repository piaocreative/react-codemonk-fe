import * as functions from '../utils';

describe('Testing checkForZero', () => {
  test('If checkIfWhatAreYouLooking with if', () => {
    const lookingFor = { design: [], softwareDevelopment: [], developmentTeam: [], dataAiMl: [] };
    expect(functions.checkIfWhatAreYouLooking(lookingFor)).toEqual(false);
  });

  test('If checkIfWhatAreYouLooking with else', () => {
    const lookingFor = { design: [], softwareDevelopment: [], developmentTeam: [], dataAiMl: ['development', 'analysis'] };
    expect(functions.checkIfWhatAreYouLooking(lookingFor)).toEqual(true);
  });

  const maxQuoteFileSize = 'File size is greater than 20MB';
  test('test checkIfQuoteFile ', () => {
    const checkIfQuoteFile = jest.spyOn(functions, 'checkIfQuoteFile');
    const output = checkIfQuoteFile({ size: 10500, type: 'application/pdf' }, 20971520, maxQuoteFileSize);
    expect(output).toEqual(0);
  });

  test('test checkIfQuoteFile ', () => {
    const checkIfQuoteFile = jest.spyOn(functions, 'checkIfQuoteFile');
    const output = checkIfQuoteFile({ size: 5242890, type: 'txt/txt' }, 20971520, maxQuoteFileSize);
    expect(output).toEqual('PDF, DOCX, ZIP, RAR Only');
  });

  test('test checkIfQuoteFile ', () => {
    const checkIfQuoteFile = jest.spyOn(functions, 'checkIfQuoteFile');
    const output = checkIfQuoteFile({ size: 52428900, type: 'image/png' }, 20971520, maxQuoteFileSize);
    expect(output).toEqual('File size is greater than 20MB');
  });
});
