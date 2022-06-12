import {
  makeSelectLanguageCount,
  makeSelectLanguageRating,
  makeSelectLinkedInProfile,
  makeSelectGithubProfile,
  makeSelectStackoverflowProfile,
  makeSelectDribbleProfile,
  makeSelectBehanceProfile,
  makeSelectPersonalProfile,
} from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectLanguageCount', () => {
    const mockState = {
      professionalForm: {
        firstName: '',
        lastName: '',
        countryCode: '',
        phoneNumber: '',
        dob: null,
        gender: 'Male',
        postcode: '',
        addressLineOne: '',
        addressLineTwo: '',
        city: '',
        country: '',
        timeZone: '',
        language: 'test',
        languageCount: 'test',
      },
    };
    const result = {
      firstName: '',
      lastName: '',
      countryCode: '',
      phoneNumber: '',
      dob: null,
      gender: 'Male',
      postcode: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      country: '',
      timeZone: '',
      language: 'test',
      languageCount: 'test',
    };
    const sel = makeSelectLanguageCount(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'test';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectLanguageRating', () => {
    const mockState = {
      professionalForm: {
        firstName: '',
        lastName: '',
        countryCode: '',
        phoneNumber: '',
        dob: null,
        gender: 'Male',
        postcode: '',
        addressLineOne: '',
        addressLineTwo: '',
        city: '',
        country: '',
        timeZone: '',
        language: 'test',
        languageRating: 'test',
      },
    };
    const result = {
      firstName: '',
      lastName: '',
      countryCode: '',
      phoneNumber: '',
      dob: null,
      gender: 'Male',
      postcode: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      country: '',
      timeZone: '',
      language: 'test',
      languageRating: 'test',
    };
    const sel = makeSelectLanguageRating(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'test';
    expect(actual).toEqual(expected);
  });
});

it('Testing makeSelectLinkedInProfile', () => {
  const mockState = {
    personalDetailsForm: {
      linkedInUrl: '',
    },
  };
  const result = {
    linkedInUrl: '',
  };
  const sel = makeSelectLinkedInProfile(mockState);
  const actual = sel.resultFunc(result);
  const expected = '';
  expect(actual).toEqual(expected);
});
it('Testing makeSelectGithubProfile', () => {
  const mockState = {
    personalDetailsForm: {
      gitHubUrl: '',
    },
  };
  const result = {
    gitHubUrl: '',
  };
  const sel = makeSelectGithubProfile(mockState);
  const actual = sel.resultFunc(result);
  const expected = '';
  expect(actual).toEqual(expected);
});
it('Testing makeSelectStackoverflowProfile', () => {
  const mockState = {
    personalDetailsForm: {
      stackOverFlowUrl: '',
    },
  };
  const result = {
    stackOverFlowUrl: '',
  };
  const sel = makeSelectStackoverflowProfile(mockState);
  const actual = sel.resultFunc(result);
  const expected = '';
  expect(actual).toEqual(expected);
});
it('Testing makeSelectDribbleProfile', () => {
  const mockState = {
    personalDetailsForm: {
      dribbbleUrl: '',
    },
  };
  const result = {
    dribbbleUrl: '',
  };
  const sel = makeSelectDribbleProfile(mockState);
  const actual = sel.resultFunc(result);
  const expected = '';
  expect(actual).toEqual(expected);
});
it('Testing makeSelectBehanceProfile', () => {
  const mockState = {
    personalDetailsForm: {
      behanceUrl: '',
    },
  };
  const result = {
    behanceUrl: '',
  };
  const sel = makeSelectBehanceProfile(mockState);
  const actual = sel.resultFunc(result);
  const expected = '';
  expect(actual).toEqual(expected);
});
it('Testing makeSelectPersonalProfile', () => {
  const mockState = {
    personalDetailsForm: {
      portfolioUrl: '',
    },
  };
  const result = {
    portfolioUrl: '',
  };
  const sel = makeSelectPersonalProfile(mockState);
  const actual = sel.resultFunc(result);
  const expected = '';
  expect(actual).toEqual(expected);
});
