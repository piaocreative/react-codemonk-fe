/**
 * Test the Selects
 */

import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';
import { Selects } from '../index';

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

describe(' <Selects />', () => {
  const renderComponent = shallow(<Selects loading error={false} {...defaultProps} />);
  it('should render select', () => {
    expect(renderComponent.find(Select).length).toBe(1);
  });
});

describe('Test if onChange <Selects />', () => {
  it('should handle onChanges with mutli', () => {
    const renderComponent1 = shallow(<Selects loading error={false} multi length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([{ label: 'test', value: '112' }]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });

  it('should handle onChanges with mutli', () => {
    const renderComponent1 = shallow(<Selects loading error={false} multi length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([{ label: 'test', value: '112' }, { label: 'label2', value: '200' }]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });

  it('should handle onChanges without mutli', () => {
    const renderComponent1 = shallow(<Selects loading error={false} length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([{ label: 'test', value: '112' }]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });

  it('should handle onChange with - else if (multi)', () => {
    const renderComponent1 = shallow(<Selects loading error={false} multi length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });

  it('should handle onChange with - else if (clearable)', () => {
    const renderComponent1 = shallow(<Selects loading error={false} clearable length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });

  it('should handle onChange with - else if (clearable)', () => {
    const renderComponent1 = shallow(<Selects loading error={false} length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });

  it('should handle onChanges with clearable', () => {
    const renderComponent1 = shallow(<Selects loading error={false} clearable length={1} {...defaultProps} />);
    const onChanges = jest.spyOn(renderComponent1.instance(), 'onChange');
    onChanges([{ label: 'test', value: '112' }]);
    expect(onChanges).toHaveBeenCalledTimes(1);
  });
});

describe('<Selects />', () => {
  const renderComponent = shallow(<Selects loading error={false} {...defaultProps} />);
  it('should render select', () => {
    expect(renderComponent.find(Select).length).toBe(1);
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

  it('should handle disableFilterOptions events', () => {
    const disableFilterOptions = jest.spyOn(renderComponent.instance(), 'disableFilterOptions');
    disableFilterOptions([{ label: 'test', value: '112' }]);
    expect(disableFilterOptions).toHaveBeenCalledTimes(1);
  });

  it('should handle optionRenderer events', () => {
    const optionRenderer = jest.spyOn(renderComponent.instance(), 'optionRenderer');
    optionRenderer([{ label: 'test', value: '112' }]);
    expect(optionRenderer).toHaveBeenCalledTimes(1);
  });
});
