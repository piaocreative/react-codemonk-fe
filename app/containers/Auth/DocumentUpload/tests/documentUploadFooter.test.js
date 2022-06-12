import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DocumentUploadFooter from '../documentUploadFooter';

const props = {
  dispatch: jest.fn(),
  invalid: '',
  loading: false,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn(), replace: jest.fn() },
  location: { redirection: jest.fn() },

  onSaveForLater: jest.fn(),

  onChangeBrief: jest.fn(),
};

describe('<DocumentUploadFooter />', () => {
  const renderer = new ShallowRenderer();
  it('should render and match the snapshot', () => {
    renderer.render(<DocumentUploadFooter {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
