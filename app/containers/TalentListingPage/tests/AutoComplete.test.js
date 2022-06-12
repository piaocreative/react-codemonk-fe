import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { AutoComplete as MainForm } from '../AutoComplete';

jest.mock('utils/request');

const props = {
  valueChanged: jest.fn(),
  options: [],
};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('AutoComplete Component', () => {
  intializeSetup();
  getWrapper();

  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('test onChange', () => {
    const event = {
      currentTarget: {
        innerText: 'test',
      },
    };
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ activeOption: 0 });
    wrapper.instance().onChange(event);
    expect(wrapper.state().activeOption).toEqual(0);
  });
  test('test onClick', () => {
    const event = {
      currentTarget: {
        innerText: 'test',
      },
    };
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ activeOption: 0 });
    wrapper.instance().onClick(event);
    expect(wrapper.state().activeOption).toEqual(0);
  });
  test('test onKeyDown', () => {
    const event = {
      currentTarget: {
        keyCode: 13,
      },
    };
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ activeOption: 0 });
    wrapper.instance().onKeyDown(event);
    expect(wrapper.state().activeOption).toEqual(0);
  });
  test('test onKeyDown', () => {
    const event = {
      currentTarget: {
        keyCode: 38,
      },
    };
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ activeOption: 0 });
    wrapper.instance().onKeyDown(event);
    expect(wrapper.state().activeOption).toEqual(0);
  });
  test('test onKeyDown', () => {
    const event = {
      currentTarget: {
        keyCode: 40,
      },
    };
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ activeOption: 0 });
    wrapper.instance().onKeyDown(event);
    expect(wrapper.state().activeOption).toEqual(0);
  });
});
