import React from 'react';
import { shallow } from 'enzyme';
import { render } from 'react-testing-library';

import ShowMoreText from '../ShowMoreText';

/* global expect */
const testMessage =
  'Test Message Lorem ipsum dolor sit amet, <a href="https://www.google.com/">Google link</a> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const plainText =
  'Test Message Lorem ipsum dolor sit amet, https://www.google.com/ consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const props = {
  lines: 5,
  more: 'more',
  less: '',
  anchorClass: 'links',
  onClick: jest.fn(),
  expanded: false,
  plainText,
};

const renderComponent = (props = {}) => render(<ShowMoreText {...props}>{testMessage}</ShowMoreText>);

describe(' <ShowMoreText />', () => {
  it('should render an <ShowMoreText /> tag', () => {
    const { container } = renderComponent();
    expect(container.querySelector('div')).not.toBeNull();
  });
});

const getWrapper = () => shallow(<ShowMoreText {...props} />);
const getInstance = () => getWrapper().instance();

describe('test functions', () => {
  getWrapper();

  test('Testing handleTruncate', () => {
    const handleTruncate = jest.spyOn(getInstance(), 'handleTruncate');
    handleTruncate(false);
    expect(handleTruncate).toHaveBeenCalledTimes(1);
  });

  test('Testing toggleLines', () => {
    const toggleLines = jest.spyOn(getInstance(), 'toggleLines');
    toggleLines({ preventDefault: jest.fn() });
    expect(toggleLines).toHaveBeenCalledTimes(1);
  });
});
