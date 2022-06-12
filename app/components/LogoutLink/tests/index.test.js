import React from 'react';
import { shallow } from 'enzyme';
import StorageService from 'utils/StorageService';
import { LogoutLink } from '../index';

const defaultProps = {
  dispatch: () => {},
  history: { push: () => {} },
};

describe('<LogoutLink />', () => {
  it('should render the component a', () => {
    const renderedComponent = shallow(<LogoutLink loading error={false} {...defaultProps} />);
    expect(renderedComponent.find('button').length).toEqual(1);
  });
  it('should handle click events', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token);
    const renderedComponent = shallow(<LogoutLink loading error={false} {...defaultProps} />);
    renderedComponent.find('button').simulate('click');
    expect(StorageService.exists('jwtToken')).toEqual(false);
  });
});
