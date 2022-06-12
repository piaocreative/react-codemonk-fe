import React from 'react';
import { shallow } from 'enzyme';
import { FormControlSelect } from '../index';

const props = {
  errorSelect: true,
};

describe('<Input />', () => {
  it('should render FormControlSelect', () => {
    const children = 'Text';
    const renderedComponent = shallow(<FormControlSelect {...props}>{children}</FormControlSelect>);
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
