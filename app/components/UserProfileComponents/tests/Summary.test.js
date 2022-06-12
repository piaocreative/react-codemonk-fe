import React from 'react';
import { shallow } from 'enzyme';
import { EditorState } from 'draft-js';
import request from 'utils/request';
import { SummaryComponents as MainForm } from '../Summary';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  onChangeBrief: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('SummaryComponents Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing onEditorStateChange ', () => {
    const editorState = EditorState.createEmpty();
    const onEditorStateChange = jest.spyOn(getInstance(), 'onEditorStateChange');
    onEditorStateChange(editorState);
    expect(onEditorStateChange).toHaveBeenCalledTimes(1);
  });
});
