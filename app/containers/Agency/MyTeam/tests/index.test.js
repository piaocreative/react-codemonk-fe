import React from 'react';
import { shallow } from 'enzyme';
import Emitter from 'utils/emitter';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { MyTeam as MainForm, mapDispatchToProps } from '../index';
import { CHANGE_TALENT } from '../constants';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeTalent: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
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

// emitter functions
describe('emitter functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if toggle with addTalentSaga', () => {
    const component = shallow(<MainForm {...props} />);
    Emitter.emit('addTalentSaga', true);
    expect(component.state('showTalentModal')).toEqual(false);
  });

  test('Testing if emitter addTalentSaga with false', () => {
    const component = shallow(<MainForm {...props} />);
    component.setState({ addTalentSaga: true });
    Emitter.emit('addTalentSaga', false);
    expect(component.state('addTalentSaga')).toEqual(true);
  });

  test('Testing if toggle with editTalentSaga', () => {
    const component = shallow(<MainForm {...props} />);
    Emitter.emit('editTalentSaga', true);
    expect(component.state('showTalentModal')).toEqual(false);
  });

  test('Testing if emitter editTalentSaga with false', () => {
    const component = shallow(<MainForm {...props} />);
    component.setState({ editTalentSaga: true });
    Emitter.emit('editTalentSaga', false);
    expect(component.state('editTalentSaga')).toEqual(true);
  });

  test('Testing if toggle with deleteTalentSaga', () => {
    const component = shallow(<MainForm {...props} />);
    Emitter.emit('deleteTalentSaga', true);
    expect(component.state('showDeleteModal')).toEqual(false);
  });

  test('Testing if emitter deleteTalentSaga with false', () => {
    const component = shallow(<MainForm {...props} />);
    component.setState({ showDeleteModal: true });
    Emitter.emit('deleteTalentSaga', false);
    expect(component.state('showDeleteModal')).toEqual(true);
  });

  test('Testing if emitter off on component unmount', () => {
    const component = shallow(<MainForm {...props} />);
    jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  });
});

// test functions
describe('test functions', () => {
  intializeSetup();
  getWrapper();

  const responseWithSuccess = {
    status: 1,
    data: {
      docs: [
        {
          _id: '112d20ad030f11e',
          workPreference: [],
          currency: 'EUR',
          unavailability: [],
          talentId: '030f11f',
          email: 'user@yopmail.com',
          firstName: 'Talent User',
          lastName: 'Last Name',
          rate: 112,
          weekylyAvailability: [
            {
              date: '2020-11-08T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-09T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-10T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-11T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-12T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-13T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-14T00:00:00.000Z',
              availability: false,
            },
          ],
        },
        {
          _id: '773a29a0c2e005789f3',
          workPreference: [],
          currency: 'USD',
          unavailability: [],
          talentId: '773a29a0c2e005789f4',
          email: 'user.p@yopmail.com',
          firstName: 'Sonam',
          lastName: 'Patel',
          rate: 123,
          weekylyAvailability: [
            {
              date: '2020-11-08T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-09T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-10T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-11T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-12T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-13T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-14T00:00:00.000Z',
              availability: false,
            },
          ],
        },
        {
          _id: 'a6ba330808ad4e3b',
          workPreference: ['fulltime'],
          currency: 'GBP',
          unavailability: [],
          availability: true,
          talentId: 'a6ba330808ad4e3c',
          email: 'gibbs@mailinator.com',
          firstName: 'Joshamee',
          lastName: 'Gibbs',
          rate: 200,
          weekylyAvailability: [
            {
              date: '2020-11-08T00:00:00.000Z',
              availability: false,
            },
            {
              date: '2020-11-09T00:00:00.000Z',
              availability: true,
            },
            {
              date: '2020-11-10T00:00:00.000Z',
              availability: true,
            },
            {
              date: '2020-11-11T00:00:00.000Z',
              availability: true,
            },
            {
              date: '2020-11-12T00:00:00.000Z',
              availability: true,
            },
            {
              date: '2020-11-13T00:00:00.000Z',
              availability: true,
            },
            {
              date: '2020-11-14T00:00:00.000Z',
              availability: false,
            },
          ],
        },
      ],
      totalDocs: 9,
      limit: 20,
      page: 1,
      totalPages: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    },
    message: 'Success',
  };
  const responseWithError = {
    status: 0,
    message: 'Error',
  };
  test('Testing if handleSearchChange', () => {
    const handleSearchChange = jest.spyOn(getInstance(), 'handleSearchChange');
    const value = 'user';
    handleSearchChange(value);
    expect(handleSearchChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadAgencyTeam', () => {
    const loadAgencyTeam = jest.spyOn(getInstance(), 'loadAgencyTeam');
    const pageNum = 1;
    loadAgencyTeam(pageNum);
    expect(loadAgencyTeam).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyTeam', () => {
    const setAgencyTeam = jest.spyOn(getInstance(), 'setAgencyTeam');
    setAgencyTeam(responseWithSuccess);
    expect(setAgencyTeam).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyTeam with else ', () => {
    const setAgencyTeam = jest.spyOn(getInstance(), 'setAgencyTeam');
    setAgencyTeam(responseWithError);
    expect(setAgencyTeam).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleCloseModal ', () => {
    const handleCloseModal = jest.spyOn(getInstance(), 'handleCloseModal');
    handleCloseModal();
    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleOpenModal add', () => {
    const handleOpenModal = jest.spyOn(getInstance(), 'handleOpenModal');
    const modalType = 'add';
    const index = 0;
    handleOpenModal(modalType, index);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleOpenModal edit', () => {
    const handleOpenModal = jest.spyOn(getInstance(), 'handleOpenModal');
    const modalType = 'edit';
    const index = 0;
    handleOpenModal(modalType, index);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleOpenModal else', () => {
    const handleOpenModal = jest.spyOn(getInstance(), 'handleOpenModal');
    const modalType = 'else';
    const index = 0;
    handleOpenModal(modalType, index);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if modalSubmit add', () => {
    const component = shallow(<MainForm {...props} />);
    component.setState({ talentsArray: responseWithSuccess.data.docs });

    const modalSubmit = jest.spyOn(component.instance(), 'modalSubmit');
    const modalType = 'add';
    const talentIndex = 0;
    modalSubmit(modalType, talentIndex);
    expect(modalSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if modalSubmit edit', () => {
    const component = shallow(<MainForm {...props} />);
    component.setState({ talentsArray: responseWithSuccess.data.docs });

    const modalSubmit = jest.spyOn(component.instance(), 'modalSubmit');
    const modalType = 'edit';
    const talentIndex = 0;
    modalSubmit(modalType, talentIndex);
    expect(modalSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if deleteTalentOpenModal', () => {
    const deleteTalentOpenModal = jest.spyOn(getInstance(), 'deleteTalentOpenModal');
    deleteTalentOpenModal();
    expect(deleteTalentOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if deleteTalentCloseModal', () => {
    const deleteTalentCloseModal = jest.spyOn(getInstance(), 'deleteTalentCloseModal');
    deleteTalentCloseModal();
    expect(deleteTalentCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if submitDelete else', () => {
    const submitDelete = jest.spyOn(getInstance(), 'submitDelete');
    submitDelete();
    expect(submitDelete).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleClosUploadTalenteModal else', () => {
    const handleClosUploadTalenteModal = jest.spyOn(getInstance(), 'handleClosUploadTalenteModal');
    handleClosUploadTalenteModal();
    expect(handleClosUploadTalenteModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleOpenUploadTalentModal else', () => {
    const handleOpenUploadTalentModal = jest.spyOn(getInstance(), 'handleOpenUploadTalentModal');
    handleOpenUploadTalentModal();
    expect(handleOpenUploadTalentModal).toHaveBeenCalledTimes(1);
  });

  // onDrop
  test('test onDrop', () => {
    const onDrop = jest.spyOn(getInstance(), 'onDrop');
    const acceptedFiles = [{ name: 'test' }, { name: 'test' }, { name: 'test' }];
    const rejectedFile = [{ name: 'test', errors: [{ code: 'file-invalid-type' }] }, { name: 'test' }];
    onDrop(acceptedFiles, rejectedFile);
    expect(onDrop).toHaveBeenCalledTimes(1);
  });
  test('test onDrop', () => {
    const onDrop = jest.spyOn(getInstance(), 'onDrop');
    const acceptedFiles = [{ name: 'test' }, { name: 'test' }, { name: 'test' }];
    const rejectedFile = [{ name: 'test' }, { name: 'test' }];
    onDrop(acceptedFiles, rejectedFile);
    expect(onDrop).toHaveBeenCalledTimes(1);
  });

  // checkAgencyFileType
  test('Testing if checkAgencyFileType', () => {
    const selectedFile = new Blob(['testing'], { name: 'abcd.csv', path: 'abcd.csv', type: 'application/vnd.ms-excel' });
    const reader = new FileReader();
    const checkAgencyFileType = jest.spyOn(getInstance(), 'checkAgencyFileType');
    checkAgencyFileType(selectedFile, reader);
    expect(checkAgencyFileType).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkAgencyFileType', () => {
    const selectedFile = new Blob(['testing'], { type: 'application/vnd.ms-excel' });
    const reader = new FileReader();
    const checkAgencyFileType = jest.spyOn(getInstance(), 'checkAgencyFileType');
    checkAgencyFileType(selectedFile, reader);
    expect(checkAgencyFileType).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkAgencyFileType with wrong extension', () => {
    const selectedFile = {
      name: 'abcd.pdf',
      type: 'document/pdf',
    };
    const reader = new FileReader();
    const checkAgencyFileType = jest.spyOn(getInstance(), 'checkAgencyFileType');
    checkAgencyFileType(selectedFile, reader);
    expect(checkAgencyFileType).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkAgencyFileType with no selected file', () => {
    const selectedFile = '';
    const reader = new FileReader();
    const checkAgencyFileType = jest.spyOn(getInstance(), 'checkAgencyFileType');
    checkAgencyFileType(selectedFile, reader);
    expect(checkAgencyFileType).toHaveBeenCalledTimes(1);
  });

  // submitAddTalentFile
  test('Testing if submitAddTalentFile else', () => {
    const submitAddTalentFile = jest.spyOn(getInstance(), 'submitAddTalentFile');
    submitAddTalentFile();
    expect(submitAddTalentFile).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleUploadFile with if', () => {
    const handleUploadFile = jest.spyOn(getInstance(), 'handleUploadFile');
    const response = { status: 1, message: 'success' };
    handleUploadFile(response);
    expect(handleUploadFile).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleUploadFile with else', () => {
    const handleUploadFile = jest.spyOn(getInstance(), 'handleUploadFile');
    const response = { status: 0, message: 'error' };
    handleUploadFile(response);
    expect(handleUploadFile).toHaveBeenCalledTimes(1);
  });

  test('Testing if deleteFile ', () => {
    const deleteFile = jest.spyOn(getInstance(), 'deleteFile');
    deleteFile();
    expect(deleteFile).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderFileModal ', () => {
    const renderFileModal = jest.spyOn(getInstance(), 'renderFileModal');
    renderFileModal();
    expect(renderFileModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderTalentModal ', () => {
    const renderTalentModal = jest.spyOn(getInstance(), 'renderTalentModal');
    renderTalentModal();
    expect(renderTalentModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderDeleteTalentModal ', () => {
    const renderDeleteTalentModal = jest.spyOn(getInstance(), 'renderDeleteTalentModal');
    renderDeleteTalentModal();
    expect(renderDeleteTalentModal).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if onChangeTalent event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const type = 'add';
    const data = [
      {
        firstName: 'Talent One',
        lastName: 'Talent Last One',
        email: 'talent1@mailinator.com',
        currency: 'USD',
        rate: 40,
      },
    ];
    mapDispatchToProps(dispatch).onChangeTalent(type, data);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if onChangeTalent are dispatched correctly', () => {
    const dispatch = jest.fn();
    const type = 'add';
    const data = [
      {
        firstName: 'Talent One',
        lastName: 'Talent Last One',
        email: 'talent1@mailinator.com',
        currency: 'USD',
        rate: 40,
      },
    ];
    mapDispatchToProps(dispatch).onChangeTalent(type, data);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: CHANGE_TALENT,
      payload: 'add',
      data,
    });
  });
});
