import * as functions from '../filterOptions';

describe('check for selectStyle', () => {
  test('Testing if trim ', () => {
    const trim = jest.spyOn(functions, 'trim');
    const value = trim(' abcd ');
    expect(value).toEqual('abcd');
  });

  test('Testing if stripDiacritics', () => {
    const stripDiacritics = jest.spyOn(functions, 'stripDiacritics');
    const value = stripDiacritics('test');
    expect(value).toEqual('test');
  });

  test('Testing if isValid', () => {
    const isValid = jest.spyOn(functions, 'isValid');
    const value = isValid('someString');
    expect(value).toEqual(true);
  });

  test('Testing if filterOptions', () => {
    const options = [{ label: 'options1', value: 'options1' }, { label: 'options2', value: 'options2' }];
    const filterValue = 'test';
    const excludeOptions = false;
    const props = { ignoreAccents: true };
    const filterOptions = jest.spyOn(functions, 'filterOptions');
    const value = filterOptions(options, filterValue, excludeOptions, props);
    expect(value).toEqual([]);
  });

  test('Testing if filterOptions', () => {
    const options = [{ label: 'options1', value: 'options1' }, { label: 'options2', value: 'options2' }];
    const filterValue = 'options1';
    const excludeOptions = [{ label: 'options3', value: 'options3' }];
    const props = { ignoreCase: true, trimFilter: true, valueKey: 'value', labelKey: 'label' };
    const filterOptions = jest.spyOn(functions, 'filterOptions');
    const value = filterOptions(options, filterValue, excludeOptions, props);
    expect(value).toEqual([{ label: 'options1', value: 'options1' }]);
  });

  test('Testing if filterOptions with filterValue-> false', () => {
    const options = [{ label: 'options1', value: 'options1' }, { label: 'options2', value: 'options2' }];
    const filterValue = '';
    const excludeOptions = [{ label: 'options3', value: 'options3' }];
    const props = { ignoreCase: true, trimFilter: true, valueKey: 'value', labelKey: 'label' };
    const filterOptions = jest.spyOn(functions, 'filterOptions');
    const value = filterOptions(options, filterValue, excludeOptions, props);
    expect(value).toEqual([{ label: 'options1', value: 'options1' }, { label: 'options2', value: 'options2' }]);
  });

  test('Testing if filterOptions with hasValue & hasLable-> false', () => {
    const options = [{ data: 'options1', dataValue: 'options1' }, { data: 'options2', dataValue: 'options2' }];
    const filterValue = '';
    const excludeOptions = [{ label: 'options3', value: 'options3' }];
    const props = { ignoreCase: true, trimFilter: true, valueKey: 'value', labelKey: 'label' };
    const filterOptions = jest.spyOn(functions, 'filterOptions');
    const value = filterOptions(options, filterValue, excludeOptions, props);
    expect(value).toEqual([{ data: 'options1', dataValue: 'options1' }, { data: 'options2', dataValue: 'options2' }]);
  });

  test('Testing if filterOptions with ignoreAccents->true', () => {
    const options = [{ data: 'options1', dataValue: 'options1' }, { data: 'options2', dataValue: 'options2' }];
    const filterValue = '';
    const excludeOptions = [{ label: 'options3', value: 'options3' }];
    const props = { ignoreAccents: true, trimFilter: true, matchProp: 'data', dataValue: 'value', labelKey: 'data' };
    const filterOptions = jest.spyOn(functions, 'filterOptions');
    const value = filterOptions(options, filterValue, excludeOptions, props);
    expect(value).toEqual([]);
  });
});
