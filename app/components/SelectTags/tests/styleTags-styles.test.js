import * as functions from '../styleTags-styles';

describe('check for functions', () => {
  test('for the boxShadowSelect', () => {
    expect(functions.boxShadowSelect({ isFocused: true }, false)).toEqual('0px 0px 0px 2px rgba(24, 51, 204, 0.2)');
  });

  test('for the boxShadowSelect isFocused', () => {
    expect(functions.boxShadowSelect({ isFocused: false }, true)).toEqual('0px 0px 0px 2px rgba(234, 61, 61, 0.2)');
  });

  test('Testing if StyleSelect ', () => {
    const StyleSelect = jest.spyOn(functions, 'StyleSelect');
    StyleSelect({ errorSelect: '' });
    expect(StyleSelect).toHaveBeenCalledTimes(1);
  });
});
