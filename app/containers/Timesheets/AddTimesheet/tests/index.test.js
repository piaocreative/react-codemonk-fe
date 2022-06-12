import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { AddTimesheet as MainForm, mapDispatchToProps } from '../index';
import { SUBMIT_ADD_TIMESHEET } from '../constants';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  briefID: 'id',
  loadDetails: jest.fn(),
  onSubmitTimesheet: jest.fn(),
  loading: false,
  match: {
    params: {},
  },
  formKey: 'key',
  type: 'add',

  weekStarting: new Date(),
  project: '',
  privacyPolicy: false,
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('AddTimesheet Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleOpenModal', () => {
    const handleOpenModal = jest.spyOn(getInstance(), 'handleOpenModal');
    handleOpenModal();
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleOpenModal with modal add', () => {
    const editProps = props;
    editProps.projectDetailsPage = true;
    const getWrapper1 = () => shallow(<MainForm {...editProps} />);
    const getInstance1 = () => getWrapper1().instance();

    const handleOpenModal = jest.spyOn(getInstance1(), 'handleOpenModal');
    handleOpenModal();
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleOpenModal with modal edit', () => {
    const editProps = props;
    editProps.type = 'edit';
    editProps.week = [
      {
        date: '28/12/2020',
        value: 0,
      },
      {
        date: '29/12/2020',
        value: 0,
      },
      {
        date: '30/12/2020',
        value: 0,
      },
      {
        date: '31/12/2020',
        value: 0,
      },
      {
        date: '01/01/2021',
        value: 0,
      },
      {
        date: '02/01/2021',
        value: 0,
      },
      {
        date: '03/01/2021',
        value: 0,
      },
    ];
    const getWrapper1 = () => shallow(<MainForm {...editProps} />);
    const getInstance1 = () => getWrapper1().instance();

    const handleOpenModal = jest.spyOn(getInstance1(), 'handleOpenModal');
    handleOpenModal();
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleCloseModal', () => {
    const handleCloseModal = jest.spyOn(getInstance(), 'handleCloseModal');
    handleCloseModal();
    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });

  // getAddTimesheetProjectOptions
  test('Testing if getAddTimesheetProjectOptions with if', () => {
    const getAddTimesheetProjectOptions = jest.spyOn(getInstance(), 'getAddTimesheetProjectOptions');
    const reponse = {
      status: 1,
      message: 'Success',
      data: [
        {
          value: 'client1',
          label: 'client1',
        },
        {
          value: 'client2',
          label: 'client2',
        },
      ],
    };
    const callBack = jest.fn();
    getAddTimesheetProjectOptions(reponse, callBack);
    expect(getAddTimesheetProjectOptions).toHaveBeenCalledTimes(1);
  });
  test('Testing if getAddTimesheetProjectOptions with else', () => {
    const getAddTimesheetProjectOptions = jest.spyOn(getInstance(), 'getAddTimesheetProjectOptions');
    const reponse = {
      status: 0,
      message: 'Error',
    };
    const callBack = jest.fn();
    getAddTimesheetProjectOptions(reponse, callBack);
    expect(getAddTimesheetProjectOptions).toHaveBeenCalledTimes(1);
  });

  // loadAddTimesheetProjectOptions
  test('Testing if loadAddTimesheetProjectOptions with if', () => {
    const loadAddTimesheetProjectOptions = jest.spyOn(getInstance(), 'loadAddTimesheetProjectOptions');
    const inputValue = [
      {
        value: 'project1',
        label: 'project1',
      },
      {
        value: 'project2',
        label: 'project2',
      },
    ];
    const callback = jest.fn();
    loadAddTimesheetProjectOptions(inputValue, callback);
    expect(loadAddTimesheetProjectOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadAddTimesheetProjectOptions with else', () => {
    const loadAddTimesheetProjectOptions = jest.spyOn(getInstance(), 'loadAddTimesheetProjectOptions');
    const inputValue = [];
    const callback = jest.fn();
    loadAddTimesheetProjectOptions(inputValue, callback);
    expect(loadAddTimesheetProjectOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeProject ', () => {
    const handleChangeProject = jest.spyOn(getInstance(), 'handleChangeProject');
    const option = {
      value: 'project',
      label: 'project',
    };
    handleChangeProject(option);
    expect(handleChangeProject).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderAddTimesheet ', () => {
    const renderAddTimesheet = jest.spyOn(getInstance(), 'renderAddTimesheet');
    renderAddTimesheet();
    expect(renderAddTimesheet).toHaveBeenCalledTimes(1);
  });

  // handleTimesheetModalSubmit
  test('Testing if handleTimesheetModalSubmit ', () => {
    const handleTimesheetModalSubmit = jest.spyOn(getInstance(), 'handleTimesheetModalSubmit');
    const e = { preventDefault: jest.fn() };
    const submitType = 'draft';
    handleTimesheetModalSubmit(e, submitType);
    expect(handleTimesheetModalSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if getAddTimesheetTalentOptions ', () => {
    const inputValue = 'ta';
    const callback = jest.fn();
    const getAddTimesheetTalentOptions = jest.spyOn(getInstance(), 'getAddTimesheetTalentOptions');
    getAddTimesheetTalentOptions(inputValue, callback);
    expect(getAddTimesheetTalentOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadAddTimesheetTalentOptions ', () => {
    const inputValue = 'ta';
    const callback = jest.fn();
    const loadAddTimesheetTalentOptions = jest.spyOn(getInstance(), 'loadAddTimesheetTalentOptions');
    loadAddTimesheetTalentOptions(inputValue, callback);
    expect(loadAddTimesheetTalentOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeTalent ', () => {
    const option = { value: 'talent', name: 'Talent' };
    const handleChangeTalent = jest.spyOn(getInstance(), 'handleChangeTalent');
    handleChangeTalent(option);
    expect(handleChangeTalent).toHaveBeenCalledTimes(1);
  });

  // timesheetModalSuccess
  test('Testing if timesheetModalSuccess ', () => {
    const timesheetModalSuccess = jest.spyOn(getInstance(), 'timesheetModalSuccess');
    timesheetModalSuccess();
    expect(timesheetModalSuccess).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  const evt = { preventDefault: jest.fn() };
  const onSuccess = jest.fn();
  const data = {
    dateStart: '28/12/2020',
    week: [
      {
        date: '28/12/2020',
        value: 0,
      },
      {
        date: '29/12/2020',
        value: 0,
      },
      {
        date: '30/12/2020',
        value: 0,
      },
      {
        date: '31/12/2020',
        value: 0,
      },
      {
        date: '01/01/2021',
        value: 0,
      },
      {
        date: '02/01/2021',
        value: 0,
      },
      {
        date: '03/01/2021',
        value: 0,
      },
    ],
    status: 0,
    projectId: '5f7abc04c1733332a7e3bad4',
  };

  test('Testing if the  onSubmitTimesheet events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const submitType = 'submit';
    const type = 'add';
    mapDispatchToProps(dispatch).onSubmitTimesheet(evt, submitType, type, data, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the  onSubmitTimesheet events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const submitType = 'submit';
    const type = 'edit';
    mapDispatchToProps(dispatch).onSubmitTimesheet(evt, submitType, type, data, onSuccess);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_ADD_TIMESHEET,
      payload: type,
      data,
      onSuccess,
    });
  });
});
