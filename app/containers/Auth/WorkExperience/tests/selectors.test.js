import {
  makeSelectExperiences,
  makeSelectJobTitle,
  makeSelectEmploymentType,
  makeSelectEmployer,
  makeSelectCountry,
  makeSelectStartDate,
  makeSelectEndDate,
  makeSelectShortDescription,
} from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectExperiences', () => {
    const mockState = {
      WorkExperienceForm: {
        experiences: [],
      },
    };
    const result = {
      experiences: [],
    };
    const sel = makeSelectExperiences(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectJobTitle', () => {
    const mockState = {
      WorkExperienceForm: {
        jobTitle: '',
      },
    };
    const result = {
      jobTitle: '',
    };
    const sel = makeSelectJobTitle(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectEmploymentType', () => {
    const mockState = {
      WorkExperienceForm: {
        employmentType: '',
      },
    };
    const result = {
      employmentType: '',
    };
    const sel = makeSelectEmploymentType(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectEmployer', () => {
    const mockState = {
      WorkExperienceForm: {
        employer: '',
      },
    };
    const result = {
      employer: '',
    };
    const sel = makeSelectEmployer(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCountry', () => {
    const mockState = {
      WorkExperienceForm: {
        country: '',
      },
    };
    const result = {
      country: '',
    };
    const sel = makeSelectCountry(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectStartDate', () => {
    const mockState = {
      WorkExperienceForm: {
        startDate: '',
      },
    };
    const result = {
      startDate: '',
    };
    const sel = makeSelectStartDate(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectEndDate', () => {
    const mockState = {
      WorkExperienceForm: {
        endDate: '',
      },
    };
    const result = {
      endDate: '',
    };
    const sel = makeSelectEndDate(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectShortDescription', () => {
    const mockState = {
      WorkExperienceForm: {
        shortDescription: '',
      },
    };
    const result = {
      shortDescription: '',
    };
    const sel = makeSelectShortDescription(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
