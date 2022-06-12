import React from 'react';
import { render } from 'react-testing-library';

import Content from '../index';

describe('<Content />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const { container } = render(<Content id={id} />);
    expect(container.querySelector('div').id).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const { container, queryByText } = render(<Content>{children}</Content>);
    const { childNodes } = container.querySelector('div');
    expect(childNodes).toHaveLength(1);
    expect(queryByText(children)).not.toBeNull();
  });
});
