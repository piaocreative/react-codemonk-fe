import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { EditorState } from 'draft-js';
import { Step5 as MainForm } from '../Step5';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  onChangeMessage: jest.fn(),
  messageToPreSales: '',
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Step5 Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if onEditorStateChange ', () => {
    const onEditorStateChange = jest.spyOn(getInstance(), 'onEditorStateChange');
    onEditorStateChange(EditorState.createEmpty(), 0);
    expect(onEditorStateChange).toHaveBeenCalledTimes(1);
  });
});
