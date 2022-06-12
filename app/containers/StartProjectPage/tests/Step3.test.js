import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Step3 as MainForm } from '../Step3';
import { key } from '../constants';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  untouch: jest.fn(),
  onUXDesignChange: jest.fn(),
  onSoftwareDevelopmentChange: jest.fn(),
  onDevelopmentTeamChange: jest.fn(),
  onDataAiMiChange: jest.fn(),
  onGrowthHackingChange: jest.fn(),
  onAgileCoachChange: jest.fn(),
  lookingForDesign: ['test'],
  lookingForSoftwareDevelopment: ['test'],
  lookingForDevelopmentTeam: ['test'],
  lookingForDataAiMl: ['test'],
  lookingForGrowthHacking: false,
  lookingForAgileCoach: false,
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Step3 Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
  test('Testing if handleUXDesignChange', () => {
    intializeSetup();
    getWrapper()
      .instance()
      .handleUXDesignChange({ target: { checked: true, name: 'test' } });

    getWrapper()
      .instance()
      .handleUXDesignChange({ target: { checked: false, name: 'test' } });

    expect(props.onUXDesignChange).toBeCalled();
  });
  test('Testing if handleSoftwareDevChnage', () => {
    intializeSetup();
    getWrapper()
      .instance()
      .handleSoftwareDevChnage({ target: { checked: true, name: 'test' } });

    getWrapper()
      .instance()
      .handleSoftwareDevChnage({ target: { checked: false, name: 'test' } });

    expect(props.onSoftwareDevelopmentChange).toBeCalled();
  });
  test('Testing if handleDevTeamChange', () => {
    intializeSetup();
    getWrapper()
      .instance()
      .handleDevTeamChange({ target: { checked: true, name: 'test' } });

    getWrapper()
      .instance()
      .handleDevTeamChange({ target: { checked: false, name: 'test' } });

    expect(props.onDevelopmentTeamChange).toBeCalled();
  });
  test('Testing if handleDataAiMLChange', () => {
    intializeSetup();
    getWrapper()
      .instance()
      .handleDataAiMLChange({ target: { checked: true, name: 'test' } });

    getWrapper()
      .instance()
      .handleDataAiMLChange({ target: { checked: false, name: 'test' } });

    expect(props.onDataAiMiChange).toBeCalled();
  });
  test('Testing if onChangeGrowthHacking', () => {
    const onChangeGrowthHacking = jest.spyOn(getInstance(), 'onChangeGrowthHacking');
    onChangeGrowthHacking(key, 0, 'other');
    expect(onChangeGrowthHacking).toHaveBeenCalledTimes(1);
  });
  test('Testing if onChangeAgileCoach', () => {
    const onChangeAgileCoach = jest.spyOn(getInstance(), 'onChangeAgileCoach');
    onChangeAgileCoach(key, 0, 'other');
    expect(onChangeAgileCoach).toHaveBeenCalledTimes(1);
  });
});
