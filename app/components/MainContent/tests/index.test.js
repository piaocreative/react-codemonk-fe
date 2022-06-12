import React from 'react';
import { render } from 'react-testing-library';
import MainContent from '../index';

describe('<MainContent />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const { container } = render(<MainContent id={id} />);
    expect(container.querySelector('div').id).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const { container, queryByText } = render(<MainContent>{children}</MainContent>);
    const { childNodes } = container.querySelector('div');
    expect(childNodes).toHaveLength(1);
    expect(queryByText(children)).not.toBeNull();
  });
});
