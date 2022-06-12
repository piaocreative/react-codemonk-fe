import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      educationDetails: [],
      certificateDetails: [],
      certificateId: '',
      collegeName: '',
      country: '',
      dateObtained: '',
      degreeLevel: '',
      degreeTitle: '',
      endYear: '',
      issuedBy: '',
      name: '',
      startYear: '',
    },
    config,
  );
describe('educationDetailsReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_EDUCATION_DETAILS', () => {
    const data = [
      {
        degreeLevel: 'Master’s or Higher',
        degreeTitle: 'Master in Computer Application',
        collegeName: 'IETE, New Delhi',
        country: 'India',
        startDate: '14/06/2019',
        endDate: '14/06/2020',
      },
    ];
    expect(
      reducer(initialState, {
        type: types.CHANGE_EDUCATION_DETAILS,
        payload: data,
      }),
    ).toEqual(getFormJsStateInstance({ educationDetails: data }));
  });

  it('should handle CHANGE_CERTIFICATE_DETAILS', () => {
    const data = [
      {
        name: 'AWS Solution Architect',
        dateObtained: '30/08/2019',
        issuedBy: 'Amazon',
        certificateId: 'ABC123',
      },
    ];
    expect(
      reducer(initialState, {
        type: types.CHANGE_CERTIFICATE_DETAILS,
        payload: data,
      }),
    ).toEqual(getFormJsStateInstance({ certificateDetails: data }));
  });

  it('should handle CHANGE_COLLEGE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COLLEGE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ collegeName: '' }));
  });
  it('should handle CHANGE_COUNTRY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COUNTRY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ country: '' }));
  });
  it('should handle CHANGE_START_YEAR', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_START_YEAR,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ startYear: '' }));
  });
  it('should handle CHANGE_END_YEAR', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_END_YEAR,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ endYear: '' }));
  });
  it('should handle CHANGE_DEGREE_TITLE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_DEGREE_TITLE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ degreeTitle: '' }));
  });
  it('should handle CHANGE_DEGREE_LEVEL', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_DEGREE_LEVEL,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ degreeLevel: '' }));
  });
  it('should handle CHANGE_CERTIFICATE_NAME', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_CERTIFICATE_NAME,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ name: '' }));
  });
  it('should handle CHANGE_ORGANISATION', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_ORGANISATION,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ issuedBy: '' }));
  });
  it('should handle CHANGE_DATE_OBTAINED', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_DATE_OBTAINED,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ dateObtained: '' }));
  });
  it('should handle CHANGE_CERTIFICATE_URL', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_CERTIFICATE_URL,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ certificateId: '' }));
  });
});
