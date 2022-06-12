import React from 'react';
import { shallow } from 'enzyme';

import StyledButton from '../StyledButton';

describe('<StyledButton />', () => {
  it('should have a className attribute', () => {
    const renderedComponent = shallow(<StyledButton className="test" />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<StyledButton id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<StyledButton attribute="test" />);
    expect(renderedComponent.prop('attribute')).toBe('test');
  });
});
