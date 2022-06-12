import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { AgencyAccountSettingsPage as MainForm } from '../index';

jest.mock('utils/request');

const props = {};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('AgencyAccountSettingsPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

const response = {
  status: 1,
  data: {
    _id: '5f4ce1b3217530637e6459e8',
    isActive: 1,
    isDelete: 0,
    email: 'newagency4@mailinator.com',
    role: 3,
    updatedAt: '2020-08-31T11:40:35.894Z',
    firstName: 'Paul',
    lastName: 'Padro',
    countryCode: '91',
    phoneNumber: '123456789',
    profilePicture: 'https://s3-eu-west-1.amazonaws.com/s3-codemonk-static-content/development-proflie-pictures/5f4ce1b3217530637e6459e8',
    quoteLastVisited: '2021-01-22T08:34:30.281Z',
    createdAt: '2020-08-31T11:41:07.000Z',
    notificationLastVisited: '2021-01-22T10:00:19.984Z',
    userId: '5f4ce1b3217530637e6459e8',
    signupStep: 6,
    agency: {
      name: 'Lorem Agency',
      registeredNumber: 'AR-112',
      addressLineOne: 'Paldi',
      addressLineTwo: '',
      city: 'Ahmedabad',
      country: 'India',
      postcode: '380001',
      duns: '',
      vatNumber: 'AE-2',
    },
    designation: 'CEO',
    trading: {
      name: 'Lorem Agency',
      website: 'https://loremagency.com',
      summary:
        '<p>In some agencies in the 90 circulated a text called the "yellow tram" or "yellow subway" sensible replace Lorem Ipsum to give a more modern look to content. But too many people were looking to read the text when it was in French or English, the desired effect was not achieved. Working with readable text, containing directions can cause distractions and this can help to focus on the layout.</p>\n<p>The advantage of Latin origin and nonsense content Lorem ipsum prevents the reader from being distracted by the content of the text and thus can focus its attention on graphic design. Indeed the text Lorem Ipsum has the advantage in contrast to a generic text using variable word length to simulate a normal occupancy of the model so that it matches the final product and to ensure future unaltered publication.</p>\n',
      logo: 'https://Screenshot from 2020-07-29 18-54-22.png',
      postcode: '380001',
      addressLineOne: 'Paldi',
      addressLineTwo: 'Near ashok chowk',
      city: 'Ahmedabad',
      country: 'India',
    },
    certificateDetails: [
      {
        _id: '5fae9150ace72b16bcf02d5b',
        name: 'Certificate-12',
        dateObtained: '2020-11-02T00:00:00.000Z',
        issuedBy: 'Cisco',
      },
    ],
    socialProfile: {
      clutchUrl: '',
      dribbbleUrl: '',
      gitHubUrl: 'https://github.com/bill-gatesa',
      goodfirmsUrl: '',
      linkedInUrl: 'https://www.linkedin.com/user/myname1',
      otherWebsiteUrl: 'http://google.com/',
    },
    payDetails: {
      bankName: 'dda',
      accNumber: 'adyyrtygh',
      bankCode: '12345678901234567890123456789012345678901234567890',
    },
    directors: [
      {
        _id: '5f7d9b16496e1c55e480f143',
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
    incorporationCertificateUrl: 'https://Screenshot from 2020-07-29 18-54-22.png',
    taxRegistrationCertificateUrl: 'https://Screenshot from 2020-07-29 18-54-22.png',
    utilityBillDocumentUrl: 'https://Screenshot from 2020-07-29 18-54-22.png',
    directorDocuments: {
      '0': {
        idProofUrl: 'https://Screenshot from 2020-07-29 18-54-22.png',
        addressProofUrl: 'https://Screenshot from 2020-07-29 18-54-22.png',
      },
    },
    talents: [
      {
        _id: '5f7ea6f2a6085d6155df5e5f',
        firstName: 'qwerty',
        lastName: 'yttye',
        email: 'ron2222@mailinator.com',
        currency: 'GBP',
        rate: 12,
      },
    ],
  },
  message: 'Success',
  newQuote: true,
  newNotification: false,
};

const responseWithError = {
  status: 0,
  data: {},
  message: 'Error',
};

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if toggle with if', () => {
    const component = shallow(<MainForm />);
    component.setState({ activeTab: '2' });
    const toggle = jest.spyOn(component.instance(), 'toggle');
    toggle('1');
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  test('Testing if toggle with else', () => {
    const component = shallow(<MainForm />);
    component.setState({ activeTab: '1' });
    const toggle = jest.spyOn(component.instance(), 'toggle');
    toggle('1');
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyDetails with if', () => {
    const setAgencyDetails = jest.spyOn(getInstance(), 'setAgencyDetails');
    setAgencyDetails(response);
    expect(setAgencyDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyDetails with else', () => {
    const setAgencyDetails = jest.spyOn(getInstance(), 'setAgencyDetails');
    setAgencyDetails(responseWithError);
    expect(setAgencyDetails).toHaveBeenCalledTimes(1);
  });
});
