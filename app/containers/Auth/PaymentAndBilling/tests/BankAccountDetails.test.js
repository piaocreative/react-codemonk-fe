import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BankAccountDetails as MainForm } from '../BankAccountDetails';

configure({ adapter: new Adapter() });

jest.mock('utils/request');

const props = {
  history: { push: jest.fn() },
  dispatch: jest.fn(),
  handleChangeBankPayDetails: jest.fn(),
  bankPayDetails: {},

  invalid: '',
  loading: false,
};

describe('BankAccountDetails Component', () => {
  test('If the Component Renders Without Crashing', () => {
    const wrapper = shallow(<MainForm {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});
