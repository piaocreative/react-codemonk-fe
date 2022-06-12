import {
  makeSelectEducationDetails,
  makeSelectCertificateDetails,
  makeSelectCollegeName,
  makeSelectCountry,
  makeSelectStartYear,
  makeSelectEndYear,
  makeSelectDegreeTitle,
  makeSelectDegreeLevel,
  makeSelectName,
  makeSelectIssuedBy,
  makeSelectDateObtained,
  makeSelectCertificateId,
} from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectEducationDetails', () => {
    const mockState = {
      EducationDetailsForm: {
        educationDetails: [],
      },
    };
    const result = {
      educationDetails: [],
    };
    const sel = makeSelectEducationDetails(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCertificateDetails', () => {
    const mockState = {
      EducationDetailsForm: {
        certificateDetails: [],
      },
    };
    const result = {
      certificateDetails: [],
    };
    const sel = makeSelectCertificateDetails(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCollegeName', () => {
    const mockState = {
      EducationDetailsForm: {
        collegeName: '',
      },
    };
    const result = {
      collegeName: '',
    };
    const sel = makeSelectCollegeName(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCountry', () => {
    const mockState = {
      EducationDetailsForm: {
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
  it('Testing makeSelectStartYear', () => {
    const mockState = {
      EducationDetailsForm: {
        startYear: '',
      },
    };
    const result = {
      startYear: '',
    };
    const sel = makeSelectStartYear(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectEndYear', () => {
    const mockState = {
      EducationDetailsForm: {
        endYear: '',
      },
    };
    const result = {
      endYear: '',
    };
    const sel = makeSelectEndYear(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectDegreeTitle', () => {
    const mockState = {
      EducationDetailsForm: {
        degreeTitle: '',
      },
    };
    const result = {
      degreeTitle: '',
    };
    const sel = makeSelectDegreeTitle(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectDegreeLevel', () => {
    const mockState = {
      EducationDetailsForm: {
        degreeLevel: '',
      },
    };
    const result = {
      degreeLevel: '',
    };
    const sel = makeSelectDegreeLevel(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectName', () => {
    const mockState = {
      EducationDetailsForm: {
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
  it('Testing makeSelectIssuedBy', () => {
    const mockState = {
      EducationDetailsForm: {
        issuedBy: '',
      },
    };
    const result = {
      issuedBy: '',
    };
    const sel = makeSelectIssuedBy(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectDateObtained', () => {
    const mockState = {
      EducationDetailsForm: {
        dateObtained: '',
      },
    };
    const result = {
      dateObtained: '',
    };
    const sel = makeSelectDateObtained(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCertificateId', () => {
    const mockState = {
      EducationDetailsForm: {
        certificateId: '',
      },
    };
    const result = {
      certificateId: '',
    };
    const sel = makeSelectCertificateId(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
