import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EducationFooter from '../EducationFooter';

const props = {
  educationDetails: [
    {
      degreeLevel: 'Master’s or Higher',
      degreeTitle: 'Master in Computer Application',
      collegeName: 'IETE, New Delhi',
      country: 'India',
      startDate: '14/06/2019',
      endDate: '14/06/2020',
    },
  ],
  certificateDetails: [
    {
      name: 'AWS Solution Architect',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
      certificateId: 'ABC123',
    },
  ],
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),

  invalid: false,
  loading: false,
  responseSuccess: false,
  responseError: false,
  onReset: jest.fn(),
  history: { push: jest.fn(), replace: jest.fn() },

  onChangeEducationDetails: jest.fn(),
  onChangeCertificateDetails: jest.fn(),
  onSaveForLater: jest.fn(),
  onSubmitEducationForm: jest.fn(),

  onAddEducationForm: jest.fn(),
  onAddCertificateForm: jest.fn(),
  onDeleteEducationForm: jest.fn(),
  onDeleteCertificateForm: jest.fn(),
};

describe('<EducationFooter />', () => {
  const renderer = new ShallowRenderer();
  it('should render and match the snapshot', () => {
    renderer.render(<EducationFooter {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
