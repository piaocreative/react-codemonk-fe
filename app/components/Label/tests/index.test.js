import React from 'react';
import { shallow } from 'enzyme';

import Label from '../index';

describe('<Label />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(<Label id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(<Label>{children}</Label>);
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
