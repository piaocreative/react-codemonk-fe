import * as types from '../constants';
import appReducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      loading: false,
      responseError: false,
      responseSuccess: false,
      currentUser: false,
      userData: {
        repositories: false,
      },
      popUpSaga: false,
      switchContainerStatus: false,
    },
    config,
  );

describe('appReducer', () => {
  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOAD_REPOS', () => {
    expect(
      appReducer(initialState, {
        type: types.LOAD_REPOS,
      }),
    ).toEqual(
      getFormJsStateInstance({
        loading: true,
        responseSuccess: false,
        responseError: false,
        userData: { repositories: false },
      }),
    );
  });
  it('should handle LOAD_REPOS_SUCCESS', () => {
    expect(
      appReducer(initialState, {
        type: types.LOAD_REPOS_SUCCESS,
        repos: 'test',
        username: 'test',
      }),
    ).toEqual(
      getFormJsStateInstance({
        loading: false,
        responseSuccess: true,
        responseError: false,
        userData: { repositories: 'test' },
        currentUser: 'test',
      }),
    );
  });
  it('should handle LOAD_REPOS_ERROR', () => {
    expect(
      appReducer(initialState, {
        type: types.LOAD_REPOS_ERROR,
        error: 'test',
      }),
    ).toEqual(
      getFormJsStateInstance({
        loading: false,
        responseSuccess: false,
        responseError: true,
        error: 'test',
      }),
    );
  });

  it('should handle VERIFY', () => {
    expect(
      appReducer(initialState, {
        type: types.VERIFY,
      }),
    ).toEqual(getFormJsStateInstance({ loading: true, error: false }));
  });
  it('should handle LOADING', () => {
    expect(
      appReducer(initialState, {
        type: types.LOADING,
        payload: 'test',
      }),
    ).toEqual(getFormJsStateInstance({ loading: 'test' }));
  });
  it('should handle RESET', () => {
    expect(
      appReducer(initialState, {
        type: types.RESET,
      }),
    ).toEqual(getFormJsStateInstance({}));
  });
});
