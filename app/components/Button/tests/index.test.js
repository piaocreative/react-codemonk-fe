/**
 * Testing our Button component
 */

import React from 'react';
import { mount } from 'enzyme';
import { render, fireEvent } from 'react-testing-library';

import Button from '../index';

const handleRoute = () => {};
const href = 'http://mxstbr.com';
const children = <h1>Test</h1>;
const renderComponent = (props = {}) =>
  mount(
    <Button href={href} {...props}>
      {children}
    </Button>,
  );

describe('<Button />', () => {
  it('should render a <button> tag to change route if the handleRoute prop is specified', () => {
    const renderedComponent = renderComponent({ handleRoute });
    expect(renderedComponent.find('button').length).toEqual(1);
  });

  it('should have children', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should handle click events', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Check</Button>);
    fireEvent.click(getByText('Check'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should have a className attribute', () => {
    const { container } = render(<Button className="test">{children}</Button>);
    const element = container.firstElementChild;
    expect(element.hasAttribute('className')).toBeDefined();
  });

  it('should not adopt a type attribute when rendering an <a> tag', () => {
    const { container } = render(
      <a type href>
        abcd
      </a>,
    );
    const element = container.firstElementChild;
    expect(element.hasAttribute('type')).toBe(false);
  });
});
