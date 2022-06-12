import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { ChooseRole as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  history: [],
  dispatch: jest.fn(),
  selectRoleType: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Projects Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('test selectRoleType', () => {
    const wrappper = getWrapper();
    wrappper.instance().selectRoleType('test');
    expect(wrappper.state().selectedType).toEqual('test');
  });

  test('Testing roleClient', () => {
    const wrappper = getWrapper();
    const test = wrappper.find('[data-testid="roleClient"]');
    test.simulate('click');
    expect(wrappper.state().selectedType).toEqual('client');
  });
  test('Testing roleTalent', () => {
    const wrappper = getWrapper();
    const test = wrappper.find('[data-testid="roleTalent"]');
    test.simulate('click');
    expect(wrappper.state().selectedType).toEqual('talent');
  });
  test('Testing roleAgency', () => {
    const wrappper = getWrapper();
    const test = wrappper.find('[data-testid="roleAgency"]');
    test.simulate('click');
    expect(wrappper.state().selectedType).toEqual('agency');
  });
  test('Testing signupBtn', () => {
    const wrappper = getWrapper();
    wrappper.setState({ selectedType: 'agency' });
    const signupBtn = jest.spyOn(wrappper.instance(), 'redirectToSignup');
    const test = wrappper.find('[data-testid="signupBtn"]');
    test.simulate('click');
    expect(signupBtn).toBeCalled();
  });
  test('Testing signupBtn', () => {
    const wrappper = getWrapper();
    wrappper.setState({ selectedType: 'talent' });
    const signupBtn = jest.spyOn(wrappper.instance(), 'redirectToSignup');
    const test = wrappper.find('[data-testid="signupBtn"]');
    test.simulate('click');
    expect(signupBtn).toBeCalled();
  });
});
