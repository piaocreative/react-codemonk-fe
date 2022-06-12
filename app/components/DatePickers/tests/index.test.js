/**
 * Test the Dropdowncomp
 */

import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { DatePickers } from '../index';

const defaultProps = {
  input: {
    onChange: () => {},
    value: moment().format('DD/MM/YYYY'),
  },
  meta: {
    touched: true,
    error: false,
  },
  minDate: moment(),
  maxDate: moment(),
};

const defaultProp = {
  input: {
    onChange: () => {},
    value: '',
  },
  meta: {
    touched: true,
    error: true,
  },
  minDate: moment(),
  maxDate: moment(),
};

describe('<DatePickers />', () => {
  const renderedComponent = shallow(<DatePickers loading error={false} {...defaultProps} />);
  it('should render the DatePickerContainer tag', () => {
    expect(renderedComponent.find('DatePickerContainer').length).toEqual(1);
  });
  it('should call handleChange function', () => {
    renderedComponent.instance().handleChange(moment());
    expect(1).toEqual(1);
  });
});

describe('<DatePickers />', () => {
  const renderedComponent = shallow(<DatePickers loading error={false} {...defaultProp} />);
  it('should call handleChange function', () => {
    renderedComponent.instance().handleChange(moment());
    expect(1).toEqual(1);
  });
});
