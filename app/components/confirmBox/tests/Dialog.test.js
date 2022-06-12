import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Dialog as MainForm } from '../Dialog';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitSubscribe: jest.fn(),
  options: { className: '', displayHeader: false, moreContent: true, subTitle: '', buttons: { ok: 'ok', discard: 'discard' } },
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
});
