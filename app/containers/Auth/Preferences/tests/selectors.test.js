import {
  makeSelectIndustry,
  makeSelectCompanyCultures,
  makeSelectCompanyType,
  makeSelectPreferredProject,
  makeUnavailablity,
  makeSelectTeamPreference,
  makeSelectAssignments,
  makeSelectWorkPreference,
  makeAvailablity,
} from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectIndustry', () => {
    const mockState = {
      preferenceDetails: {
        industries: [],
        companyCultures: [],
        companyType: [],
        preferredProjectDuration: [],
        teamPreference: [],
        assignments: [],
        workPreference: '',
        availability: true,
        unavailability: {},
      },
    };
    const result = {
      industries: [],
      companyCultures: [],
      companyType: [],
      preferredProjectDuration: [],
      teamPreference: [],
      assignments: [],
      workPreference: '',
      availability: true,
      unavailability: {},
    };
    const sel = makeSelectIndustry(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCompanyCultures', () => {
    const mockState = {
      preferenceDetails: {
        industries: [],
        companyCultures: [],
        companyType: [],
        preferredProjectDuration: [],
        teamPreference: [],
        assignments: [],
        workPreference: '',
        availability: true,
        unavailability: {},
      },
    };
    const result = {
      industries: [],
      companyCultures: [],
      companyType: [],
      preferredProjectDuration: [],
      teamPreference: [],
      assignments: [],
      workPreference: '',
      availability: true,
      unavailability: {},
    };
    const sel = makeSelectCompanyCultures(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCompanyType', () => {
    const mockState = {
      preferenceDetails: {
        industries: [],
        companyCultures: [],
        companyType: [],
        preferredProjectDuration: [],
        teamPreference: [],
        assignments: [],
        workPreference: '',
        availability: true,
        unavailability: {},
      },
    };
    const result = {
      industries: [],
      companyCultures: [],
      companyType: [],
      preferredProjectDuration: [],
      teamPreference: [],
      assignments: [],
      workPreference: '',
      availability: true,
      unavailability: {},
    };
    const sel = makeSelectCompanyType(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectPreferredProject', () => {
    const mockState = {
      preferenceDetails: {
        industries: [],
        companyCultures: [],
        companyType: [],
        preferredProjectDuration: [],
        teamPreference: [],
        assignments: [],
        workPreference: '',
        availability: true,
        unavailability: {},
      },
    };
    const result = {
      industries: [],
      companyCultures: [],
      companyType: [],
      preferredProjectDuration: [],
      teamPreference: [],
      assignments: [],
      workPreference: '',
      availability: true,
      unavailability: {},
    };
    const sel = makeSelectPreferredProject(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectTeamPreference', () => {
    const mockState = {
      preferenceDetails: {
        industries: [],
        companyCultures: [],
        companyType: [],
        preferredProjectDuration: [],
        teamPreference: [],
        assignments: [],
        workPreference: '',
        availability: true,
        unavailability: {},
      },
    };
    const result = {
      industries: [],
      companyCultures: [],
      companyType: [],
      preferredProjectDuration: [],
      teamPreference: [],
      assignments: [],
      workPreference: '',
      availability: true,
      unavailability: {},
    };
    const sel = makeSelectTeamPreference(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectAssignments', () => {
    const mockState = {
      preferenceDetails: {
        industries: [],
        companyCultures: [],
        companyType: [],
        preferredProjectDuration: [],
        teamPreference: [],
        assignments: [],
        workPreference: '',
        availability: true,
        unavailability: {},
      },
    };
    const result = {
      industries: [],
      companyCultures: [],
      companyType: [],
      preferredProjectDuration: [],
      teamPreference: [],
      assignments: [],
      workPreference: '',
      availability: true,
      unavailability: {},
    };
    const sel = makeSelectAssignments(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectWorkPreference', () => {
    const mockState = {
      preferenceDetails: {
        industries: [],
        companyCultures: [],
        companyType: [],
        preferredProjectDuration: [],
        teamPreference: [],
        assignments: [],
        workPreference: '',
        availability: true,
        unavailability: {},
      },
    };
    const result = {
      industries: [],
      companyCultures: [],
      companyType: [],
      preferredProjectDuration: [],
      teamPreference: [],
      assignments: [],
      workPreference: '',
      availability: true,
      unavailability: {},
    };
    const sel = makeSelectWorkPreference(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });

  it('Testing makeAvailablity', () => {
    const mockState = {
      preferenceDetails: {
        industries: [],
        companyCultures: [],
        companyType: [],
        preferredProjectDuration: [],
        teamPreference: [],
        assignments: [],
        workPreference: '',
        availability: {},
        unavailability: {},
      },
    };
    const result = {
      industries: [],
      companyCultures: [],
      companyType: [],
      preferredProjectDuration: [],
      teamPreference: [],
      assignments: [],
      workPreference: '',
      availability: {},
      unavailability: {},
    };
    const sel = makeAvailablity(mockState);
    const actual = sel.resultFunc(result);
    const expected = {};
    expect(actual).toEqual(expected);
  });

  it('Testing makeUnavailablity', () => {
    const mockState = {
      preferenceDetails: {
        industries: [],
        companyCultures: [],
        companyType: [],
        preferredProjectDuration: [],
        teamPreference: [],
        assignments: [],
        workPreference: '',
        availability: true,
        unavailability: {},
      },
    };
    const result = {
      industries: [],
      companyCultures: [],
      companyType: [],
      preferredProjectDuration: [],
      teamPreference: [],
      assignments: [],
      workPreference: '',
      availability: true,
      unavailability: {},
    };
    const sel = makeUnavailablity(mockState);
    const actual = sel.resultFunc(result);
    const expected = {};
    expect(actual).toEqual(expected);
  });
});
