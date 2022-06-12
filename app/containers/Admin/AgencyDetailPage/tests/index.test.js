import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { AgencyDetailPage as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },

  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('AgencyDetailPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  const response = {
    status: 1,
    data: {
      name: 'name',
      registeredNumber: 'z',
      addressLineOne: 'Paldi',
      addressLineTwo: '',
      city: 'Ahmedabad',
      country: 'India',
      postcode: '111111',
      duns: 'asd',
      vatNumber: '2222',
      _id: 'adsda40',
      signupStep: 6,
      designation: 'CCC',
      trading: {
        name: 'adasd',
        website: 'https://googlee.com',
        summary: '<p>Small summary lorem ipsum is lorem ipsum</p>\n<p>lorem ipsum</p>\n',
        logo: 'https://3217530637e6459e8',
        postcode: '111111',
        addressLineOne: 'Paldi',
        addressLineTwo: '',
        city: 'Ahmedabad',
        country: 'India',
      },
      certificateDetails: [
        {
          _id: '5fae9150ace72b16bc5b',
          name: 'Certificate-12',
          dateObtained: '2020-11-02T00:00:00.000Z',
          issuedBy: 'Cisco',
        },
      ],
      socialProfile: {
        clutchUrl: '',
        dribbbleUrl: '',
        gitHubUrl: 'https://github.com/',
        goodfirmsUrl: '',
        linkedInUrl: 'https://www.linkedin.com/user/myname',
        otherWebsiteUrl: 'http://google.com/',
      },
      payDetails: {
        bankName: 'dda',
        accNumber: 'adyyrtygh',
        bankCode: '123456745901234567890',
      },
      directors: [
        {
          _id: '5f7d9b16496e43',
          firstName: 'Roger',
          lastName: 'Federer',
          dob: '2005-08-30T00:00:00.000Z',
          postcode: '123',
          city: 'City',
          country: 'Albania',
          addressLineOne: "Company's Registered address line1",
          addressLineTwo: 'line2',
          isShareHolder: true,
          isDirector: false,
          holdingPercent: 20,
        },
      ],
      directorDocuments: {
        '0': {
          idProofUrl:
            'https://k-static-content/development-documents/5f4ce1b3217530637e6459e8/idProof0/Screenshot from 2020-08-07 08-32-22.png',
          addressProofUrl: '217530637e6459e8/addressProof0/Screenshot from 2020-07-31 15-24-30.png',
        },
      },
      status: 'Active',
    },
    message: 'Success',
  };

  const responseWith0 = {
    status: 0,
    data: {},
    message: 'Error',
  };

  test('Testing if loadAdminAgencyDetails', () => {
    const loadAdminAgencyDetails = jest.spyOn(getInstance(), 'loadAdminAgencyDetails');
    loadAdminAgencyDetails();
    expect(loadAdminAgencyDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAdminAgencyDetails with status 0', () => {
    const setAdminAgencyDetails = jest.spyOn(getInstance(), 'setAdminAgencyDetails');
    setAdminAgencyDetails(responseWith0);
    expect(setAdminAgencyDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAdminAgencyDetails with status 1', () => {
    const setAdminAgencyDetails = jest.spyOn(getInstance(), 'setAdminAgencyDetails');
    setAdminAgencyDetails(response);
    expect(setAdminAgencyDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderAgencyPersonalDetails', () => {
    const renderAgencyPersonalDetails = jest.spyOn(getInstance(), 'renderAgencyPersonalDetails');
    renderAgencyPersonalDetails(response.data);
    expect(renderAgencyPersonalDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderAgencyCompanyDetails', () => {
    const renderAgencyCompanyDetails = jest.spyOn(getInstance(), 'renderAgencyCompanyDetails');
    renderAgencyCompanyDetails(response.data);
    expect(renderAgencyCompanyDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderAgencyCompanyAddress', () => {
    const renderAgencyCompanyAddress = jest.spyOn(getInstance(), 'renderAgencyCompanyAddress');
    renderAgencyCompanyAddress(response.data);
    expect(renderAgencyCompanyAddress).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderAgencyTradingDetails', () => {
    const renderAgencyTradingDetails = jest.spyOn(getInstance(), 'renderAgencyTradingDetails');
    renderAgencyTradingDetails(response.data);
    expect(renderAgencyTradingDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderAgencyLogo', () => {
    const renderAgencyLogo = jest.spyOn(getInstance(), 'renderAgencyLogo');
    renderAgencyLogo(response.data);
    expect(renderAgencyLogo).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderAgencyTradingOfficeAddress', () => {
    const renderAgencyTradingOfficeAddress = jest.spyOn(getInstance(), 'renderAgencyTradingOfficeAddress');
    renderAgencyTradingOfficeAddress(response.data);
    expect(renderAgencyTradingOfficeAddress).toHaveBeenCalledTimes(1);
  });
});
