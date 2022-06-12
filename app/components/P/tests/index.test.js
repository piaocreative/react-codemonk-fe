import React from 'react';
import { render } from 'react-testing-library';

import P from '../index';

describe('<P />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const { container } = render(<P id={id} />);
    expect(container.querySelector('p').id).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const { container, queryByText } = render(<P>{children}</P>);
    const { childNodes } = container.querySelector('p');
    expect(childNodes).toHaveLength(1);
    expect(queryByText(children)).not.toBeNull();
  });
});
