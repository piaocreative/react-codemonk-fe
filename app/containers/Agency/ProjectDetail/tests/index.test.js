import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { AgencyProjectDetail as MainForm } from '../index';

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

describe('AgencyProjectDetail Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  const projectData = {
    status: 1,
    data: {
      _id: '2a7e3bae3',
      lookingFor: {
        design: ['ux'],
        softwareDevelopment: [],
        developmentTeam: [],
        dataAiMl: [],
        isGrowthHacking: false,
        isAgileCoach: false,
      },
      clientId: '3ee032fe6f',
      name: 'Dummy Project',
      description:
        "<p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</p>\n",
      buildStatus: 'inception',
      budget: '<$50K',
      messageToPreSales:
        "<p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</p>\n",
      speed: 'standard',
      teamManageType: 'direct',
      talentsDetails: [
        {
          _id: '85d6155df5e60',
          email: 'user@mailinator.com',
          name: 'User Name',
          shortName: 'UN',
          status: 'Active',
          allocationTill: '',
          talentUserId: '6155df5e60',
          talentId: '155df5e61',
          primaryRole: 'UX Manager',
          ratePerHour: 16,
          currency: 'GBP',
        },
      ],
      isQuoteShow: true,
      status: 'On Hold',
      clientName: 'Client',
      clientEmail: 'user@mailinator.com',
    },
    message: 'Success',
  };

  const projectDataWithError = {
    status: 0,
    message: 'Error',
  };

  test('Testing if loadAgencyProjectDetails', () => {
    const loadAgencyProjectDetails = jest.spyOn(getInstance(), 'loadAgencyProjectDetails');
    loadAgencyProjectDetails();
    expect(loadAgencyProjectDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyProjectDetails with status 0', () => {
    const setAgencyProjectDetails = jest.spyOn(getInstance(), 'setAgencyProjectDetails');
    const response = projectDataWithError;
    setAgencyProjectDetails(response);
    expect(setAgencyProjectDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyProjectDetails with status 1', () => {
    const setAgencyProjectDetails = jest.spyOn(getInstance(), 'setAgencyProjectDetails');
    const response = projectData;
    setAgencyProjectDetails(response);
    expect(setAgencyProjectDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if cardBody with status 1', () => {
    const cardBody = jest.spyOn(getInstance(), 'cardBody');
    const textDescription = 'Lorem Ipsum has been the industry';
    cardBody(projectData, textDescription);
    expect(cardBody).toHaveBeenCalledTimes(1);
  });
  test('Testing if cardHeader with status 1', () => {
    const cardHeader = jest.spyOn(getInstance(), 'cardHeader');
    cardHeader(projectData);
    expect(cardHeader).toHaveBeenCalledTimes(1);
  });
});
