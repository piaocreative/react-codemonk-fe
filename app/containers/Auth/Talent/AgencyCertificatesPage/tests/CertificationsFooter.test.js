import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CertificationsFooter from '../CertificationsFooter';

const props = {
  certificateDetails: [
    {
      name: 'AWS Solution Architect',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
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

  onChangeCertificateDetails: jest.fn(),
  onSaveForLater: jest.fn(),
  onSubmitEducationForm: jest.fn(),

  onAddCertificateForm: jest.fn(),
  onDeleteCertificateForm: jest.fn(),
};

describe('<CertificationsFooter />', () => {
  const renderer = new ShallowRenderer();
  it('should render and match the snapshot', () => {
    renderer.render(<CertificationsFooter {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
