import * as normalize from 'utils/normalize';
describe('normalize', () => {
  it('should trimSpace the value', () => {
    expect(normalize.trimSpace('    ')).toEqual('');
  });
  it('should trimSpace the value', () => {
    expect(normalize.trimSpace(undefined)).toEqual(undefined);
  });
});
