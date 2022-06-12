import {
  makeSelectProjects,
  makeSelectName,
  makeSelectUrl,
  makeSelectDescription,
  makeSelectRole,
  makeSelectEmployer,
  makeSelectIndustry,
  makeSelectEmploymentType,
  makeSelectSkills,
  makeSelectSkillsCount,
  makeSelectSkillsRating,
} from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectProjects', () => {
    const mockState = {
      keyProjectForm: {
        projects: [],
      },
    };
    const result = {
      projects: [],
    };
    const sel = makeSelectProjects(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectName', () => {
    const mockState = {
      keyProjectForm: {
        name: '',
      },
    };
    const result = {
      name: '',
    };
    const sel = makeSelectName(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectUrl', () => {
    const mockState = {
      keyProjectForm: {
        url: '',
      },
    };
    const result = {
      url: '',
    };
    const sel = makeSelectUrl(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectDescription', () => {
    const mockState = {
      keyProjectForm: {
        description: '',
      },
    };
    const result = {
      description: '',
    };
    const sel = makeSelectDescription(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectRole', () => {
    const mockState = {
      keyProjectForm: {
        role: '',
      },
    };
    const result = {
      role: '',
    };
    const sel = makeSelectRole(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectEmployer', () => {
    const mockState = {
      keyProjectForm: {
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
  it('Testing makeSelectIndustry', () => {
    const mockState = {
      keyProjectForm: {
        industry: '',
      },
    };
    const result = {
      industry: '',
    };
    const sel = makeSelectIndustry(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectEmploymentType', () => {
    const mockState = {
      keyProjectForm: {
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
  it('Testing makeSelectSkills', () => {
    const mockState = {
      keyProjectForm: {
        skills: '',
      },
    };
    const result = {
      skills: '',
    };
    const sel = makeSelectSkills(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectSkillsCount', () => {
    const mockState = {
      keyProjectForm: {
        skills: '',
      },
    };
    const result = {
      skills: '',
    };
    const sel = makeSelectSkillsCount(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectSkillsRating', () => {
    const mockState = {
      keyProjectForm: {
        skills: '',
      },
    };
    const result = {
      skills: '',
    };
    const sel = makeSelectSkillsRating(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
