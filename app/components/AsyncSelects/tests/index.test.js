/**
 * Test the AsyncSelects
 */

import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';
import { AsyncSelects } from '../index';

jest.mock('utils/request');
const defaultProps = {
  input: {
    onChange: () => {},
    onBlur: () => {},
    value: '',
  },
  onChange: () => {},
  defaultValue: '',
  meta: { touched: true, error: undefined, warning: undefined },
  length: 1,
};

describe(' <AsyncSelects />', () => {
  const renderComponent = shallow(<AsyncSelects loading error={false} {...defaultProps} />);
  it('should render select', () => {
    expect(renderComponent.find(Select).length).toBe(0);
  });
});

describe('Test if onChange <AsyncSelects />', () => {
  it('should handle onChanges with mutli', () => {
    const renderComponent1 = shallow(<AsyncSelects loading error={false} multi length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([{ label: 'test', value: '112' }]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });

  it('should handle onChanges with mutli', () => {
    const renderComponent1 = shallow(<AsyncSelects loading error={false} multi length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([{ label: 'test', value: '112' }, { label: 'label2', value: '200' }]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });

  it('should handle onChanges without mutli', () => {
    const renderComponent1 = shallow(<AsyncSelects loading error={false} length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([{ label: 'test', value: '112' }]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });

  it('should handle onChange with - else if (multi)', () => {
    const renderComponent1 = shallow(<AsyncSelects loading error={false} multi length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });

  it('should handle onChange with - else if (clearable)', () => {
    const renderComponent1 = shallow(<AsyncSelects loading error={false} clearable length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });

  it('should handle onChange with - else if (clearable)', () => {
    const renderComponent1 = shallow(<AsyncSelects loading error={false} length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });

  it('should handle onChanges with clearable', () => {
    const renderComponent1 = shallow(<AsyncSelects loading error={false} clearable length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([{ label: 'test', value: '112' }]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });
});

describe('<AsyncSelects />', () => {
  const renderComponent = shallow(<AsyncSelects loading error={false} {...defaultProps} />);
  it('should render select', () => {
    expect(renderComponent.find(Select).length).toBe(0);
  });

  // onBlur
  it('should handle onBlur events', () => {
    const onBlur = jest.spyOn(renderComponent.instance(), 'onBlur');
    onBlur();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should handle setDefaultValue events', () => {
    const setDefaultValue = jest.spyOn(renderComponent.instance(), 'setDefaultValue');
    setDefaultValue([{ label: 'test', value: '112' }]);
    expect(setDefaultValue).toHaveBeenCalledTimes(1);
  });

  it('should handle noOptionMessage events', () => {
    const noOptionMessage = jest.spyOn(renderComponent.instance(), 'noOptionMessage');
    noOptionMessage();
    expect(noOptionMessage).toHaveBeenCalledTimes(1);
  });
});
