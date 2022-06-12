import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { PreferenceComponent as MainForm } from '../Preference';

jest.mock('utils/request');

const props = {
  history: [],
  dispatch: jest.fn(),
  teamPreference: '',
  assignments: '',
  workPreference: [],
  companyType: [],
  preferredProjectDuration: [],
  companyCultures: [],
  industries: [],
  onTeamPreferenceChange: jest.fn(),
  onAssignmentChange: jest.fn(),
  onWorkPreferenceChange: jest.fn(),
  onSubmitPreferenceForm: jest.fn(),
  handleSubmit: jest.fn(),
  handleIndustrySelectChangeTags: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('PreferenceComponent Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  // test('Testing if handleCompanyTypeChange', () => {
  //   intializeSetup();
  //   getWrapper()
  //     .instance()
  //     .handleCompanyTypeChange({ target: { checked: true, name: 'test' } });

  //   getWrapper()
  //     .instance()
  //     .handleCompanyTypeChange({ target: { checked: false, name: 'test' } });

  //   expect(props.onTeamPreferenceChange).toBeCalled();
  // });
  // test('Testing if handlePreferredProjectChange', () => {
  //   intializeSetup();
  //   getWrapper()
  //     .instance()
  //     .handlePreferredProjectChange({ target: { checked: true, name: 'test' } });

  //   getWrapper()
  //     .instance()
  //     .handlePreferredProjectChange({ target: { checked: false, name: 'test' } });

  //   expect(props.onTeamPreferenceChange).toBeCalled();
  // });
  // test('Testing if handleTeamPreferenceChange', () => {
  //   intializeSetup();
  //   getWrapper()
  //     .instance()
  //     .handleTeamPreferenceChange({ target: { checked: true, name: 'test' } });

  //   getWrapper()
  //     .instance()
  //     .handleTeamPreferenceChange({ target: { checked: false, name: 'test' } });

  //   expect(props.onTeamPreferenceChange).toBeCalled();
  // });
  // test('Testing if handleAssignmentChange', () => {
  //   intializeSetup();
  //   getWrapper()
  //     .instance()
  //     .handleAssignmentChange({ target: { checked: true, name: 'test' } });

  //   getWrapper()
  //     .instance()
  //     .handleAssignmentChange({ target: { checked: false, name: 'test' } });

  //   expect(props.onAssignmentChange).toBeCalled();
  // });
  // test('Testing if handleWorkPreferenceChange', () => {
  //   intializeSetup();
  //   getWrapper()
  //     .instance()
  //     .handleWorkPreferenceChange({ target: { checked: true, name: 'test' } });

  //   getWrapper()
  //     .instance()
  //     .handleWorkPreferenceChange({ target: { checked: false, name: 'test' } });

  //   expect(props.onWorkPreferenceChange).toBeCalled();
  // });
});
