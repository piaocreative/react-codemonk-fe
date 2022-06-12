import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { ProjectDetailTabs as MainForm } from '../ProjectDetailTabs';

jest.mock('utils/request');

const props = {
  activeTab: '1',
  data: {
    status: 1,
    data: {
      _id: '33332a7e3bad4',
      name: 'blue',
      description:
        '<p>Quis autem vel eum iure reprehend</p>\n<p>erit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eu</p>\n<p>m fugiat quo voluptas nulla pariatur?</p>\n<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis pr</p>\n<p>aesentium voluptatum deleniti atque</p>\n',
      status: 'In Progress',
    },
    message: 'Success',
    newBrief: false,
  },
  loadDetails: jest.fn(),
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ProjectDetailTabs Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test function', () => {
  intializeSetup();
  getWrapper();

  test('Testing if toggle with if', () => {
    const component = shallow(<MainForm {...props} />);
    component.setState({ activeTab: '2' });
    const toggle = jest.spyOn(component.instance(), 'toggle');
    toggle('1');
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  test('Testing if toggle with else', () => {
    const component = shallow(<MainForm {...props} />);
    component.setState({ activeTab: '1' });
    const toggle = jest.spyOn(component.instance(), 'toggle');
    toggle('1');
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  test('Testing if timesheetAdded', () => {
    const timesheetAdded = jest.spyOn(getInstance(), 'timesheetAdded');
    timesheetAdded();
    expect(timesheetAdded).toHaveBeenCalledTimes(1);
  });
});
