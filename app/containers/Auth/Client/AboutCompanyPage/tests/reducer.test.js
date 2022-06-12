import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      name: '',
      brand: '',
      registeredNumber: '',
      vatNumber: '',
      industry: [],
      companyType: [],
      cultures: [],
      linkedInUrl: '',
      gitHubUrl: '',
      stackOverFlowUrl: '',
      dribbbleUrl: '',
      behanceUrl: '',
      portfolioUrl: '',
    },
    config,
  );
describe('Experiences reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_NAME', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_NAME,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ name: '' }));
  });
  it('should handle CHANGE_BRAND', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_BRAND,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ brand: '' }));
  });
  it('should handle CHANGE_REGISTER_NUMBER', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_REGISTER_NUMBER,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ registeredNumber: '' }));
  });
  it('should handle CHANGE_VAT_NUMBER', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_VAT_NUMBER,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ vatNumber: '' }));
  });
  it('should handle CHANGE_INDUSTRY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_INDUSTRY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ industry: '' }));
  });
  it('should handle CHANGE_COMPANY_TYPE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COMPANY_TYPE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ companyType: '' }));
  });
  it('should handle COMPANY_CULTURES', () => {
    expect(
      reducer(initialState, {
        type: types.COMPANY_CULTURES,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ cultures: '' }));
  });
  it('should handle CHANGE_LINKEDIN_PROFILE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_LINKEDIN_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ linkedInUrl: '' }));
  });
  it('should handle CHANGE_GITHUB_PROFILE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_GITHUB_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ gitHubUrl: '' }));
  });
  it('should handle CHANGE_STACKOVERFLOW_PROFILE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_STACKOVERFLOW_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ stackOverFlowUrl: '' }));
  });
  it('should handle CHANGE_DRIBBBLE_PROFILE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_DRIBBBLE_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ dribbbleUrl: '' }));
  });
  it('should handle CHANGE_BEHANCE_PROFILE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_BEHANCE_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ behanceUrl: '' }));
  });
  it('should handle CHANGE_PERSONAL_PROFILE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_PERSONAL_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ portfolioUrl: '' }));
  });
});
