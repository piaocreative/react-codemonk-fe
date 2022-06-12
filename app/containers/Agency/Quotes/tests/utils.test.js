import * as functions from '../utils';

describe('Testing functions', () => {
  test('test downloadAttachment ', () => {
    const downloadAttachment = jest.spyOn(functions, 'downloadAttachment');
    const url = 'https:/375246a7e76b/cookies list.pdf';
    const event = {
      preventDefault: jest.fn(),
    };
    downloadAttachment(event, url);
    expect(downloadAttachment).toHaveBeenCalledTimes(1);
  });
});
