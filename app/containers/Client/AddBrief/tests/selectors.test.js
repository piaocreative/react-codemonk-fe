import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      ADD_BRIEF: {
        values: {
          briefProjectName: '',
          briefProjectDescription: '',
          briefTitle: '',
          briefRole: '',
          briefDescription: '',
          briefExpertiseLevel: '',
          briefDuration: '',
          briefClientName: '',
        },
      },
    },
  };

  it('should return briefProjectName value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefProjectName;
    expect(selectors.briefProjectName(state)).toEqual(expectedResult);
  });
  it('should return briefProjectDescription value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefProjectDescription;
    expect(selectors.briefProjectDescription(state)).toEqual(expectedResult);
  });
  it('should return briefTitle value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefTitle;
    expect(selectors.briefTitle(state)).toEqual(expectedResult);
  });
  it('should return briefRole value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefRole;
    expect(selectors.briefRole(state)).toEqual(expectedResult);
  });
  it('should return briefDescription value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefDescription;
    expect(selectors.briefDescription(state)).toEqual(expectedResult);
  });
  it('should return briefExpertiseLevel value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefExpertiseLevel;
    expect(selectors.briefExpertiseLevel(state)).toEqual(expectedResult);
  });
  it('should return briefDuration value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefDuration;
    expect(selectors.briefDuration(state)).toEqual(expectedResult);
  });
  it('should return briefClientName value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefClientName;
    expect(selectors.briefClientName(state)).toEqual(expectedResult);
  });

  it('should return briefHardSkills value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefHardSkills;
    expect(selectors.briefHardSkills(state)).toEqual(expectedResult);
  });
  it('should return briefSoftSkills value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefSoftSkills;
    expect(selectors.briefSoftSkills(state)).toEqual(expectedResult);
  });
  it('should return briefCertifications value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefCertifications;
    expect(selectors.briefCertifications(state)).toEqual(expectedResult);
  });
  it('should return briefIndustry value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefIndustry;
    expect(selectors.briefIndustry(state)).toEqual(expectedResult);
  });
  it('should return briefTeamWorking value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefTeamWorking;
    expect(selectors.briefTeamWorking(state)).toEqual(expectedResult);
  });
  it('should return briefDiscProfile value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefDiscProfile;
    expect(selectors.briefDiscProfile(state)).toEqual(expectedResult);
  });
  it('should return briefTimeZone value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefTimeZone;
    expect(selectors.briefTimeZone(state)).toEqual(expectedResult);
  });
  it('should return briefRatePerHour value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefRatePerHour;
    expect(selectors.briefRatePerHour(state)).toEqual(expectedResult);
  });
  it('should return briefAnnualRate value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefAnnualRate;
    expect(selectors.briefAnnualRate(state)).toEqual(expectedResult);
  });
  it('should return briefCurrency value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefCurrency;
    expect(selectors.briefCurrency(state)).toEqual(expectedResult);
  });
  it('should return briefLanguages value', () => {
    const expectedResult = state.form.ADD_BRIEF.values.briefLanguages;
    expect(selectors.briefLanguages(state)).toEqual(expectedResult);
  });
});
