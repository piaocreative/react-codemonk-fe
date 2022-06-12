import * as functions from '../utils';
jest.mock('utils/request');

describe('test functions', () => {
  test('Testing if renderRoleYears ', () => {
    const renderRoleYears = jest.spyOn(functions, 'renderRoleYears');
    renderRoleYears('0-1 years');
    expect(renderRoleYears).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleBackButton ', () => {
    const handleBackButton = jest.spyOn(functions, 'handleBackButton');
    const event = { preventDefault: jest.fn() };
    const history = { push: jest.fn() };
    handleBackButton(event, history);
    expect(handleBackButton).toHaveBeenCalledTimes(1);
  });

  const fields = {
    linkedInProfile: '',
    githubProfile: '',
    stackoverflowProfile: '',
    primaryRole: '',
    yearsOfExperience: '',
    newBrief: '',
  };

  test('Testing if setChange ', () => {
    const setChange = jest.spyOn(functions, 'setChange');
    setChange(jest.fn(), jest.fn(), fields);
    expect(setChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if setInitialValues ', () => {
    const setInitialValues = jest.spyOn(functions, 'setInitialValues');

    setInitialValues(jest.fn(), fields);
    expect(setInitialValues).toHaveBeenCalledTimes(1);
  });
});
