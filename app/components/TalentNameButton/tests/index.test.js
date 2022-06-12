/**
 * Test the TalentNameButton
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import Select from 'react-select';
import * as utilFunctions from 'containers/App/utils';
import * as functions from '../index';

jest.mock('utils/request');

const extra = { projectId: 'id', tab: '2' };
const defaultProps = {
  redirectTo: '',
  talentId: 'id',
  redirectType: '',
  talentName: '',
  extra,
  profilePicture: '',
};

describe(' <TalentNameButton />', () => {
  const renderComponent = shallow(<functions.TalentNameButton {...defaultProps} />);
  it('should render component', () => {
    expect(renderComponent.find(Select).length).toBe(0);
  });
});

describe('test functions', () => {
  test('imgError', () => {
    const e = { target: { onError: jest.fn(), src: '' } };
    const imgError = jest.spyOn(functions, 'imgError');
    imgError(e);
    expect(imgError).toHaveBeenCalledTimes(1);
  });

  test('TalentNameBtn click', () => {
    const wrapper = mount(<functions.TalentNameButton {...defaultProps} />);
    const talentProfileRedirect = jest.spyOn(utilFunctions, 'talentProfileRedirect');
    wrapper.find('button').simulate('click', { target: { value: 'New title' } });
    expect(talentProfileRedirect).toHaveBeenCalledTimes(1);
  });
});
