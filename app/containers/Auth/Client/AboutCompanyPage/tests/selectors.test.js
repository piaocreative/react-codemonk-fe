import {
  makeSelectName,
  makeSelectBrand,
  makeSelectRegisteredNumber,
  makeSelectVatNumber,
  makeSelectIndustry,
  makeSelectCompanyType,
  makeSelectCompanyCultures,
  makeSelectLinkedInProfile,
  makeSelectGithubProfile,
  makeSelectStackoverflowProfile,
  makeSelectDribbleProfile,
  makeSelectBehanceProfile,
  makeSelectPersonalProfile,
} from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectName', () => {
    const mockState = {
      aboutCompanyForm: {
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

  it('Testing makeSelectBrand', () => {
    const mockState = {
      aboutCompanyForm: {
        brand: '',
      },
    };
    const result = {
      brand: '',
    };
    const sel = makeSelectBrand(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectRegisteredNumber', () => {
    const mockState = {
      aboutCompanyForm: {
        registeredNumber: '',
      },
    };
    const result = {
      registeredNumber: '',
    };
    const sel = makeSelectRegisteredNumber(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectVatNumber', () => {
    const mockState = {
      aboutCompanyForm: {
        vatNumber: '',
      },
    };
    const result = {
      vatNumber: '',
    };
    const sel = makeSelectVatNumber(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectIndustry', () => {
    const mockState = {
      aboutCompanyForm: {
        industry: [],
      },
    };
    const result = {
      industry: [],
    };
    const sel = makeSelectIndustry(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCompanyType', () => {
    const mockState = {
      aboutCompanyForm: {
        companyType: [],
      },
    };
    const result = {
      companyType: [],
    };
    const sel = makeSelectCompanyType(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCompanyCultures', () => {
    const mockState = {
      aboutCompanyForm: {
        cultures: [],
      },
    };
    const result = {
      cultures: [],
    };
    const sel = makeSelectCompanyCultures(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectLinkedInProfile', () => {
    const mockState = {
      aboutCompanyForm: {
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
      aboutCompanyForm: {
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
      aboutCompanyForm: {
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
      aboutCompanyForm: {
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
      aboutCompanyForm: {
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
      aboutCompanyForm: {
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
});
