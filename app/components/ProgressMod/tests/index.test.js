import React from 'react';
import { render } from 'react-testing-library';

import Card from '../index';

describe('<Card />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const { container } = render(<Card id={id} />);
    expect(container.querySelector('div').id).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const { container, queryByText } = render(<Card>{children}</Card>);
    const { childNodes } = container.querySelector('div');
    expect(childNodes).toHaveLength(1);
    expect(queryByText(children)).not.toBeNull();
  });
});
