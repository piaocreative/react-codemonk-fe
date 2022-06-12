import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PayPalDetails as MainForm } from '../PayPalDetails';

configure({ adapter: new Adapter() });

jest.mock('utils/request');

const props = {
  history: { push: jest.fn() },

  invalid: '',
  loading: false,

  payPalEmail: '',
  handleChangePayPalDetails: jest.fn(),
};

describe('CompanyDetails Component', () => {
  test('If the Component Renders Without Crashing', () => {
    const wrapper = shallow(<MainForm {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});
