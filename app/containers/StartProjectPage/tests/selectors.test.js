import {
  makeSelectProjectName,
  makeSelectProjectDescription,
  makeSelectWorkProgress,
  makeSelectProjectURL,
  makeSelectUXDesign,
  makeSelectSoftwareDevelopment,
  makeSelectDevelopmentTeam,
  makeSelectDataAiMi,
  makeSelectGrowthHacking,
  makeSelectAgileCoach,
  makeSelectOther,
  makeSelectBudget,
  makeSelectMessage,
  makeSelectProjectSpeed,
  makeSelectManageTeam,
} from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectProjectName', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectProjectName(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectProjectDescription', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectProjectDescription(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectWorkProgress', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectWorkProgress(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectProjectURL', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectProjectURL(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectUXDesign', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectUXDesign(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectSoftwareDevelopment', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectSoftwareDevelopment(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectDevelopmentTeam', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectDevelopmentTeam(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectDataAiMi', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectDataAiMi(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectGrowthHacking', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectGrowthHacking(mockState);
    const actual = sel.resultFunc(result);
    const expected = false;
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectAgileCoach', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectAgileCoach(mockState);
    const actual = sel.resultFunc(result);
    const expected = false;
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectOther', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectOther(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectBudget', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectBudget(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectMessage', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectMessage(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectProjectSpeed', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectProjectSpeed(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectManageTeam', () => {
    const mockState = {
      projectDetails: {
        name: '',
        description: '',
        buildStatus: '',
        projectUrl: '',
        lookingForDesign: [],
        lookingForSoftwareDevelopment: [],
        lookingForDevelopmentTeam: [],
        lookingForDataAiMl: [],
        lookingForGrowthHacking: false,
        lookingForAgileCoach: false,
        lookingForOther: '',
        budget: '',
        messageToPreSales: '',
        speed: '',
        teamManageType: '',
      },
    };
    const result = {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    };
    const sel = makeSelectManageTeam(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
