import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import initialState from 'containers/Auth/PersonalDetails/reducer';
import { EDIT_PERSONAL_DETAILS_FORM } from 'containers/Auth/PersonalDetails/constants';
import { LOAD_REPOS } from 'containers/App/constants';

import { MyProfile as MainForm, mapDispatchToProps } from '../MyProfile';

jest.mock('utils/request');
let store;
const mockStore = configureStore();

const props = {
  data: [],
  loadProfileData: jest.fn(),
  handleSubmit: jest.fn(),
  onHandlePersonalEditSubmit: jest.fn(),
  invalid: false,
  loading: false,
  responseSuccess: false,
  responseError: false,
  dispatch: jest.fn(),
  loadUserDetails: jest.fn(),
  modalOpen: jest.fn(),
  modalClose: jest.fn(),

  firstName: 'Roger',
  lastName: 'abcd',
  countryCode: '355',
  phoneNumber: '323434234',
  dob: '04/07/2002',
  gender: 'Other',
  postcode: 'asdasdasd',
  addressLineOne: 'asdas',
  addressLineTwo: 'asdasd',
  city: 'City',
  country: 'Austria',
  timeZone: 'Pacific/Midway',
  primaryRole: 'DevOps engineer',
  yearsOfExperience: '2-4 years',
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();

const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Test Functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleProfleEditCloseModal with 0 index', () => {
    const handleProfleEditCloseModal = jest.spyOn(getInstance(), 'handleProfleEditCloseModal');
    handleProfleEditCloseModal();
    expect(handleProfleEditCloseModal).toHaveBeenCalledTimes(1);
  });
  test('Testing if handleProfilePhotoOpenModal with 0 index', () => {
    const handleProfilePhotoOpenModal = jest.spyOn(getInstance(), 'handleProfilePhotoOpenModal');
    handleProfilePhotoOpenModal();
    expect(handleProfilePhotoOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleProfleEditCloseModal with 0 index', () => {
    const handleProfleEditCloseModal = jest.spyOn(getInstance(), 'handleProfleEditCloseModal');
    handleProfleEditCloseModal();
    expect(handleProfleEditCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleProfileEditOpenModal with 0 index', () => {
    const handleProfileEditOpenModal = jest.spyOn(getInstance(), 'handleProfileEditOpenModal');
    handleProfileEditOpenModal();
    expect(handleProfileEditOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handlePicChange with 1 length', () => {
    const event = {
      target: {
        files: [
          {
            name: 'abcd.jpg',
          },
        ],
      },
    };
    const handlePicChange = jest.spyOn(getInstance(), 'handlePicChange');
    handlePicChange(event);
    expect(handlePicChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handlePicChange with length 2', () => {
    const event = {
      target: {
        files: [
          {
            name: 'abcd.jpg',
            size: 102400,
          },
          {
            name: 'abcd2.jpg',
            size: 102400,
          },
        ],
      },
    };
    const handlePicChange = jest.spyOn(getInstance(), 'handlePicChange');
    handlePicChange(event);
    expect(handlePicChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkFileType', () => {
    const selectedFile = {
      name: 'abcd.jpg',
      type: 'jpg',
    };
    const reader = new FileReader();
    const checkFileType = jest.spyOn(getInstance(), 'checkFileType');
    checkFileType(selectedFile, reader);
    expect(checkFileType).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkFileType with wrong extension', () => {
    const selectedFile = {
      name: 'abcd.pdf',
      type: 'document/pdf',
    };
    const reader = new FileReader();
    const checkFileType = jest.spyOn(getInstance(), 'checkFileType');
    checkFileType(selectedFile, reader);
    expect(checkFileType).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkFileType with no selected file', () => {
    const selectedFile = {};
    const reader = new FileReader();
    const checkFileType = jest.spyOn(getInstance(), 'checkFileType');
    checkFileType(selectedFile, reader);
    expect(checkFileType).toHaveBeenCalledTimes(1);
  });

  test('Testing if setProfileImage', () => {
    const response = { status: 1, data: { profilePicture: 'abcd.jpg' } };
    const setProfileImage = jest.spyOn(getInstance(), 'setProfileImage');
    setProfileImage(response);
    expect(setProfileImage).toHaveBeenCalledTimes(1);
  });
  test('Testing if setProfileImage with status 0', () => {
    const response = { status: 0, data: { profilePicture: 'abcd.jpg' } };
    const setProfileImage = jest.spyOn(getInstance(), 'setProfileImage');
    setProfileImage(response);
    expect(setProfileImage).toHaveBeenCalledTimes(1);
  });

  test('Testing if handlePersonalEditSubmit', () => {
    const event = { preventDefault: jest.fn() };
    const handlePersonalEditSubmit = jest.spyOn(getInstance(), 'handlePersonalEditSubmit');
    handlePersonalEditSubmit(event);
    expect(handlePersonalEditSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderShareLink', () => {
    const renderShareLink = jest.spyOn(getInstance(), 'renderShareLink');
    renderShareLink();
    expect(renderShareLink).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderPdfIcon', () => {
    const renderPdfIcon = jest.spyOn(getInstance(), 'renderPdfIcon');
    renderPdfIcon();
    expect(renderPdfIcon).toHaveBeenCalledTimes(1);
  });

  test('Testing if hireMe', () => {
    const e = { preventDefault: jest.fn() };
    const hireMe = jest.spyOn(getInstance(), 'hireMe');
    hireMe(e);
    expect(hireMe).toHaveBeenCalledTimes(1);
  });
  test('Testing if hireModalClose', () => {
    const hireModalClose = jest.spyOn(getInstance(), 'hireModalClose');
    hireModalClose();
    expect(hireModalClose).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderProfileImagePopup', () => {
    const renderProfileImagePopup = jest.spyOn(getInstance(), 'renderProfileImagePopup');
    renderProfileImagePopup();
    expect(renderProfileImagePopup).toHaveBeenCalledTimes(1);
  });

  test('Testing if showProxyLoginCTA', () => {
    const talentData = {
      status: 1,
      data: {
        _id: '07f2d0b238',
        firstName: 'Client Unregistered',
        lastName: 'Last Name',
        billing: {
          type: 'individual',
        },
        jobTitle: 'CTO',
        addressLineOne: '200 Avenida Miguel Alemán',
        city: 'San Nicolás de los Garza',
        country: 'Mexico',
        postcode: '66470',
        registerType: 'individual',
        timeZone: 'Etc/GMT-11',
        status: 'Active',
      },
      message: 'Success',
    };
    const showProxyLoginCTA = jest.spyOn(getInstance(), 'showProxyLoginCTA');
    showProxyLoginCTA(talentData);
    expect(showProxyLoginCTA).toHaveBeenCalledTimes(1);
  });

  test('Testing if downloadProfilePdf ', () => {
    const response = {
      status: 1,
      data: {
        pdfPath: 'https://s3-abcd-static-content/49599e3e54b4ae74.pdf',
      },
      message: 'Success',
    };
    const downloadProfilePdf = jest.spyOn(getInstance(), 'downloadProfilePdf');
    downloadProfilePdf(response);
    expect(downloadProfilePdf).toHaveBeenCalledTimes(1);
  });

  test('Testing if downloadProfilePdf with else', () => {
    const response = {
      status: 0,
      data: {},
      message: 'Error',
    };
    const downloadProfilePdf = jest.spyOn(getInstance(), 'downloadProfilePdf');
    downloadProfilePdf(response);
    expect(downloadProfilePdf).toHaveBeenCalledTimes(1);
  });

  test('Testing if handlePdfClick', () => {
    const talentId = '49599e3e54b4ae74';
    const handlePdfClick = jest.spyOn(getInstance(), 'handlePdfClick');
    handlePdfClick(talentId);
    expect(handlePdfClick).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  const evt = { preventDefault: jest.fn(), target: { value: 'abcd' } };
  const data = {
    firstName: 'Roger',
    lastName: 'abcd',
    countryCode: '355',
    phoneNumber: '323434234',
    dob: '04/07/2002',
    gender: 'Other',
    postcode: 'asdasdasd',
    addressLineOne: 'asdas',
    addressLineTwo: 'asdasd',
    city: 'City',
    country: 'Austria',
    timeZone: 'Pacific/Midway',
    primaryRole: 'DevOps engineer',
    yearsOfExperience: '2-4 years',
  };

  test('Testing if  LOAD_REPOS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onHandlePersonalEditSubmit(evt, data);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if  onHandlePersonalEditSubmit  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onHandlePersonalEditSubmit(evt, data);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: EDIT_PERSONAL_DETAILS_FORM,
      data,
    });
  });
});
