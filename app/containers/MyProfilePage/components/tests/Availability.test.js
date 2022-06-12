import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { AVAILABILITY, UNAVAILABILITY } from 'containers/Auth/Preferences/constants';
import { Availability as MainForm, mapDispatchToProps } from '../Availability';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onAvailabilityChange: jest.fn(),
  onUnavailabilityChange: jest.fn(),
  modalOpen: jest.fn(),
  modalClose: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Availability Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if handleEditAvailabilityCloseModal', () => {
    const handleEditAvailabilityCloseModal = jest.spyOn(getInstance(), 'handleEditAvailabilityCloseModal');
    handleEditAvailabilityCloseModal();
    expect(handleEditAvailabilityCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleEditAvailabilityOpenModal', () => {
    const handleEditAvailabilityOpenModal = jest.spyOn(getInstance(), 'handleEditAvailabilityOpenModal');
    handleEditAvailabilityOpenModal(0);
    expect(handleEditAvailabilityOpenModal).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if change AVAILABILITY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onAvailabilityChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: AVAILABILITY,
    });
  });

  test('Testing if change UNAVAILABILITY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onUnavailabilityChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: UNAVAILABILITY,
    });
  });

  test('Testing if the save for later events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitPreferenceForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
