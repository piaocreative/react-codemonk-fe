/**
 * Test the CardComponent
 */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CardComponent as MainForm } from '../CardComponent';

jest.mock('utils/request');
const props = {
  talentData: {
    _id: '5f06b376f0d53c00085ca567',
    email: 'test@gmail.com',
    skills: [
      {
        _id: '600ebadd3019e157a2224365',
        name: 'Amazon Redshift',
        rate: 8,
      },
    ],
    registerType: 'freelancer',
    talentUserId: '5f06b376f0d53c00085ca566',
    name: null,
    phoneNumber: null,
    status: 'Unregistered',
  },
};
describe('<CardComponent />', () => {
  const renderer = new ShallowRenderer();
  it('should render and match the snapshot', () => {
    renderer.render(<MainForm {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
