import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import WorkExperienceFooter from '../workExperienceFooter';

const props = {
  experiences: [
    {
      id: '9533ace6-1f78-4564-b162-bee97877953a',
      jobTitle: 'Developer',
      employmentType: 'Contract',
      employer: 'Google',
      country: { label: 'Albania', value: 'Albania' },
      startDate: '10/10/2019',
      endDate: '10/10/2020',
      shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
  ],
  dispatch: jest.fn(),
  handleDateChange: jest.fn(),
  onAddExperience: jest.fn(),
  onDeleteForm: jest.fn(),
  handleSaveForLater: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitExperienceForm: jest.fn(),
  onChangeExperience: jest.fn(),
  invalid: '',
  loading: false,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn(), replace: jest.fn() },
  location: { redirection: jest.fn() },

  onSaveForLater: jest.fn(),

  onChangeBrief: jest.fn(),
};

describe('<WorkExperienceFooter />', () => {
  const renderer = new ShallowRenderer();
  it('should render and match the snapshot', () => {
    renderer.render(<WorkExperienceFooter {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
