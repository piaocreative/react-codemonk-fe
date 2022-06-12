/**
 * Test the TalentCardComponent
 */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { TalentCardComponent as MainForm } from '../TalentCardComponent';

jest.mock('utils/request');
const props = {
  talentData: {
    _id: '5f046da2550f5f00078d7c97',
    profilePicture: 'https://s3-eu-west-1.amazonaws.com/s3-codemonk-static-content/development-proflie-pictures/5f046da2550f5f00078d7c96',
    name: 'harshad parmar',
    teamPreference: ['x-large-team'],
    assignments: ['short-term-onsite'],
    skills: [
      {
        _id: '600ebadd3019e157a2224365',
        name: 'Amazon Redshift',
        rate: 8,
      },
    ],
    certificateDetails: [],
    workExperience: [
      {
        _id: '600ebb063019e157a2224366',
        jobTitle: 'Developer',
        employmentType: 'Contract',
        employer: 'Innovify',
        country: 'Andorra',
        startDate: '2021-01-21T00:00:00.000Z',
        endDate: '2021-01-25T00:00:00.000Z',
        isPresent: true,
        shortDescription: '<p>COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895</p>\n',
      },
    ],
    currency: 'USD',
    city: 'ahmedabad',
    country: 'Algeria',
    timeZone: 'Pacific/Midway',
    experienceOrder: '4',
    primaryRole: 'Product (UI) designer',
    professionalSummary:
      '<p>COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895COD-895</p>\n',
    availability: true,
    workPreference: ['fulltime'],
    firstName: 'harshad',
    lastName: '',
    yearsOfExperience: 'Principal ',
    ratePerHour: 130,
    formerEmployer: 'Innovify',
  },
};

describe('<TalentCardComponent />', () => {
  const renderer = new ShallowRenderer();
  it('should render and match the snapshot', () => {
    renderer.render(<MainForm {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
