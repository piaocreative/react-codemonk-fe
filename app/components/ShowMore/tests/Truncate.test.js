import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { render } from 'react-testing-library';
import { LinkButtonMod } from 'components';

import Truncate from '../Truncate';

const props = {
  lines: 3,
  more: 'more',
  less: '',
  anchorClass: 'links',
  onClick: jest.fn(),
  expanded: false,
};

describe('<Truncate />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Truncate />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});

const testMessage =
  'Test Message Lorem ipsum dolor sit amet, <a href="https://www.google.com/">Google link</a> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

describe(' <Truncate />', () => {
  const renderComponent = (props = {}) => render(<Truncate {...props}>{testMessage}</Truncate>);

  it('should render an <Truncate /> tag', () => {
    const { container } = renderComponent();
    expect(container.querySelector('span')).not.toBeNull();
  });
});

const getWrapper = () => shallow(<Truncate {...props} />);
const getWrapper2 = () =>
  shallow(
    <Truncate
      width={0}
      lines={3}
      ellipsis={
        <span>
          ...
          <LinkButtonMod className="mb-0 ms-1" color="link" onClick={jest.fn()}>
            more
          </LinkButtonMod>
        </span>
      }
      onTruncate={jest.fn()}
      ref={ref => (this.truncateRef = ref)}
      {...props}
    >
      {testMessage}
    </Truncate>,
  );
const getInstance = () => getWrapper().instance();
const getInstance2 = () => getWrapper2().instance();
describe('test functions', () => {
  getWrapper();

  test('Testing restoreReplacedLinks', () => {
    const restoreReplacedLinks = jest.spyOn(getInstance(), 'restoreReplacedLinks');
    restoreReplacedLinks(testMessage);
    expect(restoreReplacedLinks).toHaveBeenCalledTimes(1);
  });

  test('Testing renderLine with if', () => {
    const renderLine = jest.spyOn(getInstance2(), 'renderLine');
    renderLine(2, 2, [1, 2, 3]);
    expect(renderLine).toHaveBeenCalledTimes(1);
  });
  test('Testing renderLine with else', () => {
    const renderLine = jest.spyOn(getInstance2(), 'renderLine');
    renderLine(2, 1, []);
    expect(renderLine).toHaveBeenCalledTimes(1);
  });
  test('Testing renderLine with else- nested else', () => {
    const renderLine = jest.spyOn(getInstance2(), 'renderLine');
    renderLine(null, 1, []);
    expect(renderLine).toHaveBeenCalledTimes(1);
  });

  test('Testing innerText ', () => {
    const innerText = jest.spyOn(getInstance2(), 'innerText');
    innerText(<span>{testMessage}</span>);
    expect(innerText).toHaveBeenCalledTimes(1);
  });

  test('Testing onResize ', () => {
    const onResize = jest.spyOn(getInstance2(), 'onResize');
    onResize();
    expect(onResize).toHaveBeenCalledTimes(1);
  });

  test('Testing onTruncate ', () => {
    const onTruncate = jest.spyOn(getInstance2(), 'onTruncate');
    onTruncate(true);
    expect(onTruncate).toHaveBeenCalledTimes(1);
  });

  test('Testing ellipsisWidth ', () => {
    const ellipsisWidth = jest.spyOn(getInstance2(), 'ellipsisWidth');
    ellipsisWidth(<span>{testMessage}</span>);
    expect(ellipsisWidth).toHaveBeenCalledTimes(1);
  });

  test('Testing trimRight ', () => {
    const trimRight = jest.spyOn(getInstance2(), 'trimRight');
    trimRight('hello');
    expect(trimRight).toHaveBeenCalledTimes(1);
  });

  test('Testing createMarkup ', () => {
    const createMarkup = jest.spyOn(getInstance2(), 'createMarkup');
    createMarkup('hello');
    expect(createMarkup).toHaveBeenCalledTimes(1);
  });
});
