import React from 'react';

import { shallow } from 'enzyme';
import SwitchContainer from '../index';

const defaultProps = {
  input: {
    onChange: () => {},
    checked: false,
  },
};

describe('<SwitchContainer />', () => {
  const renderedComponent = shallow(<SwitchContainer {...defaultProps} />);
  it('should render the SwitchContainer tag', () => {
    expect(renderedComponent.find('SwitchContainer').length).toEqual(0);
  });
});
